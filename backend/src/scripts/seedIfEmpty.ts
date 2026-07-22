import fs from "fs";
import path from "path";
import mysql, { type RowDataPacket } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const seedPath = path.join(__dirname, "../../database/seed.sql");

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

const seedIfEmpty = async () => {
  const connection = await connectWithRetry({
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "rootpassword",
    database: process.env.DB_NAME ?? "orders_products_db",
    multipleStatements: true,
  });

  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT COUNT(*) as count FROM products",
    );
    const firstRow = rows[0] as RowDataPacket & { count?: number };
    const count = firstRow?.count ?? 0;

    if (count === 0) {
      const seedSql = fs.readFileSync(seedPath, "utf8");
      await connection.query(seedSql);
      console.log("Database was empty. Seeded successfully.");
    } else {
      console.log("Database already has data. Skipping seed.");
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error checking/seeding database:", message);
    process.exit(1);
  } finally {
    await connection.end();
  }
};

void seedIfEmpty();
