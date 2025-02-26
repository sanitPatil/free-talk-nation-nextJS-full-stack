import crypto from "node:crypto";

const algorithm = process.env.ENC_DENC_ALGORITHM || "aes-256-cbc";

// Validate & parse secret key
if (!process.env.ENC_DENC_SECRET_KEY) {
  throw new Error("Missing ENC_DENC_SECRET_KEY in environment variables");
}

// Ensure the secret key is 32 bytes (AES-256)
let secretKey = process.env.ENC_DENC_SECRET_KEY;
if (secretKey.length !== 64) {
  throw new Error(
    "Invalid secret key length. It must be a 64-character hex string (32 bytes)."
  );
}
const keyBuffer = Buffer.from(secretKey, "hex");

export function encrypt(text: string) {
  const iv = crypto.randomBytes(16); // AES requires a 16-byte IV
  const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  // Store IV with encrypted data
  return `${iv.toString("hex")}:${encrypted}`;
}

export function decrypt(encryptedString: string) {
  const [ivHex, encryptedData] = encryptedString.split(":");
  if (!ivHex || !encryptedData) {
    throw new Error("Invalid encrypted data format");
  }

  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
