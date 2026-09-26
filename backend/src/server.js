import "dotenv/config";
import app from "./app.js";
import { pool } from "./config/database.js";
import { env } from "./config/env.js";

const PORT = env.port || 5000;

const startServer = async () => {
    try {
        await pool.query("SELECT NOW()");

        console.log("PostgreSQL connection verified");

        app.listen(PORT, () => {
            console.log(`StockSense API running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

startServer();