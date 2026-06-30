import "server-only";

import crypto from "node:crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "skyworth_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

function getRequiredEnv(name: "ADMIN_PASSWORD" | "ADMIN_SESSION_SECRET") {
  const value = process.env[name]?.trim();
  return value || null;
}

export function isAdminAuthConfigured() {
  return Boolean(getRequiredEnv("ADMIN_PASSWORD") && getRequiredEnv("ADMIN_SESSION_SECRET"));
}

function getAdminPassword() {
  return getRequiredEnv("ADMIN_PASSWORD");
}

function getSessionSecret() {
  return getRequiredEnv("ADMIN_SESSION_SECRET");
}

function sign(value: string) {
  const secret = getSessionSecret();

  if (!secret) {
    return null;
  }

  return crypto
    .createHmac("sha256", secret) 
    .update(value)
    .digest("hex");
}

function encodeSession(expiresAt: number) {
  const payload = `admin:${expiresAt}`;
  const signature = sign(payload);

  if (!signature) {
    return null;
  }

  return `${payload}.${signature}`;
}

function decodeSession(token: string) {
  const lastDotIndex = token.lastIndexOf(".");

  if (lastDotIndex === -1) {
    return null;
  }

  const payload = token.slice(0, lastDotIndex);
  const signature = token.slice(lastDotIndex + 1);
  const expectedSignature = sign(payload);

  if (!expectedSignature) {
    return null;
  }

  const expected = Buffer.from(expectedSignature);
  const actual = Buffer.from(signature);

  if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) {
    return null;
  }

  const [role, expiresAtRaw] = payload.split(":");
  const expiresAt = Number(expiresAtRaw);

  if (role !== "admin" || !Number.isFinite(expiresAt) || Date.now() > expiresAt) {
    return null;
  }

  return { role, expiresAt };
}

export function getAdminCookieName() {
  return ADMIN_COOKIE_NAME;
}

export function validateAdminPassword(password: string) {
  const configuredPassword = getAdminPassword();

  if (!configuredPassword) {
    return false;
  }

  const expected = Buffer.from(configuredPassword);
  const actual = Buffer.from(password);

  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

export function createAdminSessionToken() {
  return encodeSession(Date.now() + SESSION_TTL_MS);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    return false;
  }

  return Boolean(decodeSession(token));
}

export function isAdminRequestAuthenticated(request: Request) {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader) {
    return false;
  }

  const token = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_COOKIE_NAME}=`))
    ?.slice(`${ADMIN_COOKIE_NAME}=`.length);

  if (!token) {
    return false;
  }

  return Boolean(decodeSession(token));
}
