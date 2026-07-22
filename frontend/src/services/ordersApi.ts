import type { Order, OrderProduct } from "@/types/order";
import { z } from "zod";
import { apiFetch } from "./apiClient";

const backendOrderItemSchema = z.object({
  id: z.number(),
  product_id: z.number(),
  product_name: z.string(),
  product_price: z.union([z.string(), z.number()]),
  quantity: z.number(),
  subtotal: z.union([z.string(), z.number()]),
  sku: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  warranty_from: z.string().nullable().optional(),
  warranty_to: z.string().nullable().optional(),
  product_condition: z.enum(["new", "used"]).nullable().optional(),
});

const backendOrderSchema = z.object({
  id: z.number(),
  order_number: z.string(),
  customer_name: z.string(),
  total_amount: z.union([z.string(), z.number()]),
  created_at: z.string(),
  items: z.array(backendOrderItemSchema),
});

const backendOrdersResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(backendOrderSchema),
  count: z.number().optional(),
});

type BackendOrderItem = z.infer<typeof backendOrderItemSchema>;
type BackendOrder = z.infer<typeof backendOrderSchema>;

const USD_TO_UAH = 40;

const normalizeDate = (value?: string | null) =>
  value ? value.split("T")[0] : undefined;

const mapOrderProduct = (
  order: BackendOrder,
  item: BackendOrderItem,
): OrderProduct => {
  const priceUsd = Number(item.product_price);

  return {
    id: `${order.order_number}-${item.id}`,
    orderItemId: item.id,
    name: item.product_name,
    serialNumber: item.sku ?? `SKU-${item.product_id}`,
    status: "free",
    imageUrl: item.image_url ?? undefined,
    condition: item.product_condition ?? "new",
    groupName: item.category ?? undefined,
    warrantyFrom: normalizeDate(item.warranty_from),
    warrantyTo: normalizeDate(item.warranty_to),
    priceUsd,
    priceUah: priceUsd * USD_TO_UAH,
  };
};

export const deleteOrderItem = async (
  orderNumber: string,
  itemId: number,
): Promise<void> => {
  await apiFetch<void>(`/orders/${orderNumber}/items/${itemId}`, {
    method: "DELETE",
  });
};

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await apiFetch<unknown>("/orders");
  const parsed = backendOrdersResponseSchema.safeParse(response);

  if (!parsed.success) {
    throw new Error("Invalid orders response from API");
  }

  const orders = parsed.data.data ?? [];

  return orders.map((order) => {
    const totalUsd = Number(order.total_amount);
    const title = `${order.order_number} — ${order.customer_name}`;

    return {
      id: order.order_number,
      title,
      productCount: order.items?.length ?? 0,
      date: new Date(order.created_at),
      amountUsd: totalUsd,
      amountUah: totalUsd * USD_TO_UAH,
      products: (order.items ?? []).map((item) => mapOrderProduct(order, item)),
    } satisfies Order;
  });
};
