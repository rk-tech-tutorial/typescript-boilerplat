import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}` // development env by default
});

console.info(`USING ENVIRONMENT: ${process.env.NODE_ENV}`);
