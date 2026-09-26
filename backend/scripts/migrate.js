import "dotenv/config";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import pg from "pg";

const { Client } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsDir = path.join(
    __dirname,
    "../src/database/schema"
);

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

const runMigrations = async () => {
    try {
        await client.connect();

        console.log("Connected to PostgreSQL");

        await client.query(`
            CREATE TABLE IF NOT EXISTS migrations (
                id SERIAL PRIMARY KEY,
                filename VARCHAR(255) UNIQUE NOT NULL,
                executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);

        const files = fs
            .readdirSync(migrationsDir)
            .filter((file) => file.endsWith(".sql"))
            .sort();

        for (const file of files) {
            const existing = await client.query(
                `
                SELECT id
                FROM migrations
                WHERE filename = $1
                `,
                [file]
            );

            if (existing.rowCount > 0) {
                console.log(`Skipping ${file}`);
                continue;
            }

            const filePath = path.join(
                migrationsDir,
                file
            );

            const sql = fs.readFileSync(
                filePath,
                "utf8"
            );

            console.log(`Running ${file}`);

            await client.query("BEGIN");

            try {
                await client.query(sql);

                await client.query(
                    `
                    INSERT INTO migrations (filename)
                    VALUES ($1)
                    `,
                    [file]
                );

                await client.query("COMMIT");

                console.log(`Completed ${file}`);

            } catch (error) {
                await client.query("ROLLBACK");

                throw error;
            }
        }

        console.log("All migrations completed");

    } catch (error) {
        console.error(
            "Migration failed:",
            error
        );

        process.exitCode = 1;

    } finally {
        await client.end();
    }
};

runMigrations();