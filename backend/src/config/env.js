import "dotenv/config";

export const env = {
    port: parseInt(process.env.PORT, 10) || 5000,
    databaseUrl: process.env.DATABASE_URL,
    databaseUrlPooled: process.env.DATABASE_URL_POOLED || process.env.DATABASE_URL,
    DATABASE_URL_POOLED: process.env.DATABASE_URL_POOLED || process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
};