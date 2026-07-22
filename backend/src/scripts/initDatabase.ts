import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const schemaPath = path.join(__dirname, "../../database/schema.sql");

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const connectWithRetry = async (
  config: mysql.ConnectionOptions,
  retries = 15,
  delay = 2000,
) => {
  let lastError: unknown;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const connection = await mysql.createConnection(config);
      return connection;
    } catch (error) {
      lastError = error;
      console.log(`Database not ready (attempt ${attempt}/${retries})...`);
      await sleep(delay);
    }
  }
  throw lastError;
};

const initDatabase = async () => {
  const connection = await connectWithRetry({
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "rootpassword",
    multipleStatements: true,
  });

  try {
    const schemaSql = fs.readFileSync(schemaPath, "utf8");
    await connection.query(schemaSql);
    console.log("Database schema initialized successfully");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error initializing database schema:", message);
    process.exit(1);
  } finally {
    await connection.end();
  }
};

void initDatabase();
