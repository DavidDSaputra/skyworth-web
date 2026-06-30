import "server-only";

import crypto from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const allowedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
  "image/avif",
]);

const allowedDatasheetTypes = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function slugifyFilename(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildStorageConfig(kind: "image" | "datasheet", mimeType: string) {
  if (kind === "image") {
    if (!allowedImageTypes.has(mimeType)) {
      throw new Error("Unsupported image type.");
    }

    return {
      directory: path.join(process.cwd(), "public", "uploads", "images"),
      publicPath: "/uploads/images",
    };
  }

  if (!allowedDatasheetTypes.has(mimeType)) {
    throw new Error("Unsupported datasheet file type.");
  }

  return {
    directory: path.join(process.cwd(), "public", "uploads", "datasheets"),
    publicPath: "/uploads/datasheets",
  };
}

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
  const folder =
    process.env.CLOUDINARY_FOLDER?.trim() || "skyworth-web/products";

  if (!cloudName) {
    return null;
  }

  if (apiKey && apiSecret) {
    return {
      mode: "signed" as const,
      cloudName,
      apiKey,
      apiSecret,
      folder,
    };
  }

  if (uploadPreset) {
    return {
      mode: "unsigned" as const,
      cloudName,
      uploadPreset,
      folder,
    };
  }

  return null;
}

function buildCloudinaryFilename(file: File) {
  const extension = path.extname(file.name);
  const basename = slugifyFilename(path.basename(file.name, extension)) || "upload";

  return {
    extension,
    publicId: `${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${basename}`,
  };
}

async function uploadToCloudinary(
  file: File,
  kind: "image" | "datasheet",
  mimeType: string,
) {
  const config = getCloudinaryConfig();

  if (!config) {
    return null;
  }

  const resourceType = kind === "image" ? "image" : "raw";
  const { extension, publicId } = buildCloudinaryFilename(file);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const endpoint = `https://api.cloudinary.com/v1_1/${config.cloudName}/${resourceType}/upload`;
  const formData = new FormData();

  formData.append("file", file);

  if (config.mode === "unsigned") {
    formData.append("upload_preset", config.uploadPreset);
    formData.append("folder", config.folder);
  } else {
    formData.append("folder", config.folder);
    formData.append("public_id", publicId);
    formData.append("api_key", config.apiKey);
    formData.append("timestamp", timestamp);

    const signatureBase = `folder=${config.folder}&public_id=${publicId}&timestamp=${timestamp}${config.apiSecret}`;
    const signature = crypto
      .createHash("sha1")
      .update(signatureBase)
      .digest("hex");

    formData.append("signature", signature);
  }

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  const result = (await response.json().catch(() => null)) as
    | {
        asset_id?: string;
        bytes?: number;
        secure_url?: string;
        original_filename?: string;
        public_id?: string;
        format?: string;
        error?: {
          message?: string;
        };
      }
    | null;

  if (!response.ok || !result?.secure_url || !result.asset_id) {
    throw new Error(result?.error?.message ?? "Cloudinary upload failed.");
  }

  const uploadedExtension = result.format
    ? `.${result.format}`
    : extension || path.extname(file.name);
  const originalFilename = file.name;
  const fallbackFilename = `${publicId}${uploadedExtension}`;

  return {
    id: result.asset_id,
    filename:
      result.public_id?.split("/").pop()?.concat(uploadedExtension) ?? fallbackFilename,
    originalFilename,
    size: result.bytes ?? file.size,
    type: mimeType,
    url: result.secure_url,
    provider: "cloudinary",
  };
}

export async function storeAdminUpload(
  file: File,
  kind: "image" | "datasheet",
) {
  const config = buildStorageConfig(kind, file.type);
  const cloudinaryUpload = await uploadToCloudinary(file, kind, file.type);

  if (cloudinaryUpload) {
    return cloudinaryUpload;
  }

  await fs.mkdir(config.directory, { recursive: true });

  const extension =
    path.extname(file.name) ||
    (file.type === "image/svg+xml" ? ".svg" : file.type === "application/pdf" ? ".pdf" : "");
  const filename = slugifyFilename(path.basename(file.name, extension)) || "upload";
  const finalName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${filename}${extension}`;
  const filePath = path.join(config.directory, finalName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await fs.writeFile(filePath, buffer);

  return {
    id: crypto.randomUUID(),
    filename: finalName,
    originalFilename: file.name,
    size: file.size,
    type: file.type,
    url: `${config.publicPath}/${finalName}`,
    provider: "local-file",
  };
}
