export type ProductStatus = "free" | "reserved" | "sold" | "repair";

export type ProductCondition = "new" | "used";

export type OrderProduct = {
  id: string;
  name: string;
  serialNumber: string;
  status: ProductStatus;
  imageUrl?: string;
  orderItemId?: number;

  warrantyFrom?: string;
  warrantyTo?: string;
  condition?: ProductCondition;
  groupName?: string;
  ownerName?: string;
  priceUsd?: number;
  priceUah?: number;
};

export type Order = {
  id: string;
  title: string;
  productCount: number;
  date: Date;
  secondaryDateLabel?: string;
  amountUsd: number;
  amountUah: number;
  products: OrderProduct[];
};

export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  free: "Свободен",
  reserved: "Зарезервирован",
  sold: "Продан",
  repair: "В ремонте",
};
