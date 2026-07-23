const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const standaloneDir = path.join(root, ".next", "standalone");

if (!fs.existsSync(standaloneDir)) {
  console.error("No .next/standalone build found. Run `npm run build` first.");
  process.exit(1);
}

console.log("Copying public/ into standalone bundle...");
fs.cpSync(path.join(root, "public"), path.join(standaloneDir, "public"), {
  recursive: true,
});

console.log("Copying .next/static/ into standalone bundle...");
fs.cpSync(
  path.join(root, ".next", "static"),
  path.join(standaloneDir, ".next", "static"),
  { recursive: true },
);

const zipPath = path.join(root, "hostinger-deploy.zip");
if (fs.existsSync(zipPath)) {
  fs.rmSync(zipPath);
}

console.log("Zipping standalone bundle...");
// PowerShell's Compress-Archive writes backslash path separators inside the
// zip, which breaks extraction on Linux hosting. Windows' built-in tar.exe
// (bsdtar/libarchive) writes standard forward-slash paths instead.
execFileSync(
  "C:\\Windows\\System32\\tar.exe",
  ["-a", "-cf", zipPath, "-C", standaloneDir, "."],
);

console.log(`Done: ${zipPath}`);
