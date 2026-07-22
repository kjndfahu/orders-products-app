import mysql, { type PoolOptions } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig: PoolOptions = {
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "rootpassword",
  database: process.env.DB_NAME ?? "orders_products_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  multipleStatements: true,
};

const pool = mysql.createPool(dbConfig);

const testConnection = async (): Promise<boolean> => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully");
    connection.release();
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Database connection failed:", message);
    return false;
  }
};

const query = async <T = unknown>(
  sql: string,
  params?: (string | number | Buffer | Date | null)[],
): Promise<T> => {
  try {
    const [results] = await pool.execute(sql, params);
    return results as T;
  } catch (error) {
    console.error("Query error:", error);
    throw error;
  }
};

export { pool, query, testConnection, dbConfig };
