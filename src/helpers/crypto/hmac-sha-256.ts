import crypto from "crypto";
const algorithm = "sha256";

import { configs } from "@configs";
const secret: any = configs.crypto["hmac-sha-256-secret"];

// Create hash of the string
export const createHash = (text: string) => {
  const hmac = crypto.createHmac(algorithm, secret);
  hmac.update(text);
  const hash = hmac.digest("hex");
  return hash;
};
