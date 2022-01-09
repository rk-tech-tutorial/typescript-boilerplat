/**
 * Configuration File
 * This file contains all the global configuration required throughout the code.
 * Don't use process.env directly inside your code, rather, use it through config.
 */

export const configs = {
  frontendURL: process.env.FRONTEND_BASE_URL,
  apiURL: process.env.API_BASE_URL,
  auth: {
    JWT_SECRET: process.env.JWT_SECRET || ""
  },

  // Database config
  mongoDB: {
    host: process.env.MONGODB_HOST,
    user: process.env.MONGODB_USER,
    db: process.env.MONGODB_NAME,
    pass: process.env.MONGODB_PASS
  },

  // Crypto config
  crypto: {
    "aes-256-cbc-key": process.env.CRYPTO_AES_256_CBC_KEY,
    "hmac-sha-256-secret": process.env.CRYPTO_HMAC_SHA_256_SECRET
  }
};

// TODO: Create a service to report error if any env variable is missing
