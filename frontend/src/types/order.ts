export type ProductStatus = "free" | "reserved" | "sold";

export type OrderProduct = {
  id: string;
  name: string;
  serialNumber: string;
  status: ProductStatus;
  imageUrl?: string;
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
};
