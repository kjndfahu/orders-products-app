import { type ResultSetHeader, type RowDataPacket } from "mysql2/promise";
import { pool } from "../config/database";

export type ProductInput = {
  name: string;
  description?: string;
  price: number;
  stock_quantity?: number;
  category?: string;
  image_url?: string;
  sku?: string;
  is_active?: boolean;
  warranty_from?: string | null;
  warranty_to?: string | null;
  product_condition?: "new" | "used";
};

export const getProducts = async (filters: {
  category?: string;
  is_active?: boolean;
  search?: string;
}) => {
  let sql = "SELECT * FROM products WHERE 1=1";
  const params: Array<string | number> = [];

  if (filters.category) {
    sql += " AND category = ?";
    params.push(filters.category);
  }

  if (filters.is_active !== undefined) {
    sql += " AND is_active = ?";
    params.push(filters.is_active ? 1 : 0);
  }

  if (filters.search) {
    sql += " AND (name LIKE ? OR description LIKE ? OR sku LIKE ?)";
    const searchTerm = `%${filters.search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  sql += " ORDER BY created_at DESC";

  const [rows] = await pool.query<RowDataPacket[]>(sql, params);
  return rows;
};

export const getProductById = async (id: string) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM products WHERE id = ?",
    [id],
  );

  return rows[0] ?? null;
};

export const createProduct = async (payload: ProductInput) => {
  const [result] = await pool.execute<ResultSetHeader>(
    `
      INSERT INTO products 
      (name, description, price, stock_quantity, category, image_url, sku, is_active, warranty_from, warranty_to, product_condition)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      payload.name,
      payload.description ?? null,
      payload.price,
      payload.stock_quantity ?? 0,
      payload.category ?? null,
      payload.image_url ?? null,
      payload.sku ?? null,
      payload.is_active ?? true,
      payload.warranty_from ?? null,
      payload.warranty_to ?? null,
      payload.product_condition ?? "new",
    ],
  );

  return result;
};

export const updateProduct = async (id: string, payload: ProductInput) => {
  const [result] = await pool.execute<ResultSetHeader>(
    `
      UPDATE products 
      SET name = ?, description = ?, price = ?, stock_quantity = ?, 
          category = ?, image_url = ?, sku = ?, is_active = ?, warranty_from = ?, warranty_to = ?, product_condition = ?
      WHERE id = ?
    `,
    [
      payload.name,
      payload.description ?? null,
      payload.price,
      payload.stock_quantity ?? 0,
      payload.category ?? null,
      payload.image_url ?? null,
      payload.sku ?? null,
      payload.is_active ?? true,
      payload.warranty_from ?? null,
      payload.warranty_to ?? null,
      payload.product_condition ?? "new",
      id,
    ],
  );

  return result;
};

export const deleteProduct = async (id: string) => {
  const [result] = await pool.execute<ResultSetHeader>(
    "DELETE FROM products WHERE id = ?",
    [id],
  );

  return result;
};

export const getCategories = async () => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT DISTINCT category FROM products WHERE category IS NOT NULL ORDER BY category",
  );

  return rows.map((row) => row.category);
};
