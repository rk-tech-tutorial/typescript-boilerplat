import crypto from "crypto";
const algorithm = "aes-256-cbc";

import { configs } from "@configs";
const key: any = configs.crypto["aes-256-cbc-key"];

// Encrypt a string
export const encrypt = (text: string) => {
  const iv = crypto.randomBytes(16);
  console.info(key, text);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, "hex"), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString("hex")}.${encrypted.toString("hex")}`;
};

// Decrypt a string
export const decrypt = (text: string) => {
  const iv = Buffer.from(text.split(".")[0], "hex");
  const encryptedText = Buffer.from(text.split(".")[1], "hex");
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, "hex"), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
