import {
  type ResultSetHeader,
  type RowDataPacket,
} from "mysql2/promise";
import { pool } from "../config/database";

export type OrderFilters = {
  status?: string;
  payment_status?: string;
  customer_email?: string;
};

export type OrderItem = {
  id: number;
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  subtotal: number;
  sku?: string | null;
  image_url?: string | null;
  category?: string | null;
  warranty_from?: string | null;
  warranty_to?: string | null;
  product_condition?: "new" | "used" | null;
};

export type OrderWithItems = {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string | null;
  shipping_address: string;
  billing_address?: string | null;
  total_amount: number;
  status: string;
  payment_status: string;
  payment_method?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
};

type OrderJoinedRow = RowDataPacket & {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string;
  billing_address: string | null;
  total_amount: number;
  status: string;
  payment_status: string;
  payment_method: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  order_item_id: number | null;
  product_id: number | null;
  product_name: string | null;
  product_price: number | null;
  quantity: number | null;
  subtotal: number | null;
  sku: string | null;
  image_url: string | null;
  category: string | null;
  warranty_from: string | null;
  warranty_to: string | null;
  product_condition: "new" | "used" | null;
};

export const getOrders = async (filters: OrderFilters): Promise<OrderWithItems[]> => {
  let sql = `
    SELECT
      o.*, 
      oi.id as order_item_id,
      oi.product_id,
      oi.product_name,
      oi.product_price,
      oi.quantity,
      oi.subtotal,
      p.sku,
      p.image_url,
      p.category,
      p.warranty_from,
      p.warranty_to,
      p.product_condition
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.id
    LEFT JOIN products p ON p.id = oi.product_id
    WHERE 1=1
  `;

  const params: Array<string> = [];

  if (filters.status) {
    sql += " AND o.status = ?";
    params.push(filters.status);
  }

  if (filters.payment_status) {
    sql += " AND o.payment_status = ?";
    params.push(filters.payment_status);
  }

  if (filters.customer_email) {
    sql += " AND o.customer_email LIKE ?";
    params.push(`%${filters.customer_email}%`);
  }

  sql += " ORDER BY o.created_at DESC, oi.id ASC";

  const [rows] = await pool.query<OrderJoinedRow[]>(sql, params);

  const ordersMap = new Map<number, OrderWithItems>();

  for (const row of rows) {
    if (!ordersMap.has(row.id)) {
      ordersMap.set(row.id, {
        id: row.id,
        order_number: row.order_number,
        customer_name: row.customer_name,
        customer_email: row.customer_email,
        customer_phone: row.customer_phone,
        shipping_address: row.shipping_address,
        billing_address: row.billing_address,
        total_amount: Number(row.total_amount),
        status: row.status,
        payment_status: row.payment_status,
        payment_method: row.payment_method,
        notes: row.notes,
        created_at: row.created_at,
        updated_at: row.updated_at,
        items: [],
      });
    }

    if (row.order_item_id) {
      ordersMap.get(row.id)?.items.push({
        id: row.order_item_id,
        product_id: row.product_id ?? 0,
        product_name: row.product_name ?? "",
        product_price: Number(row.product_price ?? 0),
        quantity: Number(row.quantity ?? 0),
        subtotal: Number(row.subtotal ?? 0),
        sku: row.sku,
        image_url: row.image_url,
        category: row.category,
        warranty_from: row.warranty_from,
        warranty_to: row.warranty_to,
        product_condition: row.product_condition,
      });
    }
  }

  return Array.from(ordersMap.values());
};

export const getOrderByIdOrNumber = async (
  idOrNumber: string,
): Promise<OrderWithItems | null> => {
  const [orders] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM orders WHERE order_number = ? OR id = ?",
    [idOrNumber, idOrNumber],
  );

  if (!orders.length) {
    return null;
  }

  const rawOrder = orders[0] as RowDataPacket & OrderWithItems;

  const [items] = await pool.query<RowDataPacket[]>(
    `
      SELECT oi.*, p.sku, p.image_url, p.category, p.warranty_from, p.warranty_to, p.product_condition
      FROM order_items oi
      INNER JOIN products p ON p.id = oi.product_id
      WHERE oi.order_id = ?
    `,
    [rawOrder.id],
  );

  return {
    ...rawOrder,
    total_amount: Number(rawOrder.total_amount),
    items: items as OrderItem[],
  };
};

export type CreateOrderItem = {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
};

export type CreateOrderInput = {
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address: string;
  billing_address?: string;
  payment_method?: string;
  items: CreateOrderItem[];
  notes?: string;
};

export const createOrder = async (payload: CreateOrderInput) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const orderNumber = `ORD-${new Date().getFullYear()}-${Date.now()}`;

    const totalAmount = payload.items.reduce(
      (sum, item) => sum + item.product_price * item.quantity,
      0,
    );

    const [orderResult] = await connection.execute<ResultSetHeader>(
      `
        INSERT INTO orders 
        (order_number, customer_name, customer_email, customer_phone, 
         shipping_address, billing_address, total_amount, payment_method, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        orderNumber,
        payload.customer_name,
        payload.customer_email,
        payload.customer_phone ?? null,
        payload.shipping_address,
        payload.billing_address ?? payload.shipping_address,
        totalAmount,
        payload.payment_method ?? null,
        payload.notes ?? null,
      ],
    );

    const orderId = orderResult.insertId;

    for (const item of payload.items) {
      const subtotal = item.product_price * item.quantity;

      await connection.execute<ResultSetHeader>(
        `
          INSERT INTO order_items 
          (order_id, product_id, product_name, product_price, quantity, subtotal)
          VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          orderId,
          item.product_id,
          item.product_name,
          item.product_price,
          item.quantity,
          subtotal,
        ],
      );

      await connection.execute<ResultSetHeader>(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?",
        [item.quantity, item.product_id],
      );
    }

    await connection.commit();

    return {
      id: orderId,
      order_number: orderNumber,
      total_amount: totalAmount,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const updateOrderStatus = async (
  id: string,
  status?: string,
  paymentStatus?: string,
) => {
  let sql = "UPDATE orders SET ";
  const params: string[] = [];
  const updates: string[] = [];

  if (status) {
    updates.push("status = ?");
    params.push(status);
  }

  if (paymentStatus) {
    updates.push("payment_status = ?");
    params.push(paymentStatus);
  }

  if (updates.length === 0) {
    return { affectedRows: 0 };
  }

  sql += updates.join(", ") + " WHERE id = ?";
  params.push(id);

  const [result] = await pool.execute<ResultSetHeader>(sql, params);
  return result;
};

export const deleteOrderItem = async (orderNumber: string, itemId: number) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [orders] = await connection.query<RowDataPacket[]>(
      "SELECT id FROM orders WHERE order_number = ? OR id = ?",
      [orderNumber, orderNumber],
    );

    if (!orders.length) {
      return { found: false, deleted: false };
    }

    const orderId = (orders[0] as RowDataPacket & { id: number }).id;

    const [items] = await connection.query<RowDataPacket[]>(
      "SELECT product_id, quantity, subtotal FROM order_items WHERE id = ? AND order_id = ?",
      [itemId, orderId],
    );

    if (!items.length) {
      return { found: true, deleted: false };
    }

    const item = items[0] as RowDataPacket & {
      product_id: number;
      quantity: number;
      subtotal: number;
    };

    const [deleteResult] = await connection.execute<ResultSetHeader>(
      "DELETE FROM order_items WHERE id = ? AND order_id = ?",
      [itemId, orderId],
    );

    await connection.execute<ResultSetHeader>(
      "UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?",
      [item.quantity, item.product_id],
    );

    await connection.execute<ResultSetHeader>(
      "UPDATE orders SET total_amount = total_amount - ? WHERE id = ?",
      [item.subtotal, orderId],
    );

    await connection.commit();

    return { found: true, deleted: deleteResult.affectedRows > 0 };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
