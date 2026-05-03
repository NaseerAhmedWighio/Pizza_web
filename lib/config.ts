// Configuration file for environment variables
// This allows fallback to hardcoded values if env vars are not set

export const config = {
  database: {
    url: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_aFI0ZtubDQ3C@ep-billowing-butterfly-am7d8djv-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require"
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || "AIzaSyBXz-XSNY8kdbXb2LAtYDkZ2yTZLwTOG6w"
  }
};
