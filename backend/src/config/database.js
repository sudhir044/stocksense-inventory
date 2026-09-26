import pg from "pg";
import { env } from "./env.js";

const { Pool } = pg;

export const pool = new Pool({
    connectionString: env.DATABASE_URL_POOLED,
});

pool.on("connect", () => {
    console.log("PostgreSQL connected successfully");
});

pool.on("error", (error) => {
    console.error("PostgreSQL connection error:", error);
});