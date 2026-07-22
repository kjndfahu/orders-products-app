import type { Order, OrderProduct, ProductCondition } from "@/types/order";

/**
 * A product "flattened" out of its order, carrying just enough order
 * context to render the last two columns of the table (order name + date).
 */
export type ProductListItem = {
  id: string;
  name: string;
  serialNumber: string;
  status: OrderProduct["status"];
  warrantyFrom?: string;
  warrantyTo?: string;
  condition: ProductCondition;
  priceUsd: number;
  priceUah: number;
  groupName?: string;
  ownerName?: string;
  orderId: string;
  orderTitle: string;
  orderDate: Date;
  orderSecondaryDateLabel?: string;
};

export type { Order };
