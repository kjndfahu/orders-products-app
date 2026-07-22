import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";
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

const seedDatabase = async () => {
  const connection = await connectWithRetry({
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "rootpassword",
    database: process.env.DB_NAME ?? "orders_products_db",
    multipleStatements: true,
  });

  try {
    const seedSql = fs.readFileSync(seedPath, "utf8");
    await connection.query(seedSql);
    console.log("Database seeded successfully");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error seeding database:", message);
    process.exit(1);
  } finally {
    await connection.end();
  }
};

void seedDatabase();
