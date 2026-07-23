import type { Order } from "@/types/order";
import type { ProductListItem } from "@/config";

/**
 * Flattens every product out of every order into one list, for the
 * Products screen. Each item keeps a reference to the order it came from
 * (id, title, date) so the row can show "which order this product is in".
 *
 * Falls back sensibly for fields that don't exist on OrderProduct yet
 * (condition/group/owner/warranty/per-product price) — see product.types.ts.
 */
export const getAllProductsFromOrders = (orders: Order[]): ProductListItem[] =>
  orders.flatMap((order) =>
    order.products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        serialNumber: product.serialNumber,
        status: product.status,
        warrantyFrom: product.warrantyFrom,
        warrantyTo: product.warrantyTo,
        condition: product.condition ?? "new",
        priceUsd: product.priceUsd ?? order.amountUsd,
        priceUah: product.priceUah ?? order.amountUah,
        groupName: product.groupName,
        ownerName: product.ownerName,
        orderId: order.id,
        orderTitle: order.title,
        orderDate: order.date,
        orderSecondaryDateLabel: order.secondaryDateLabel,
        orderItemId: product.orderItemId,
      };
    }),
  );
