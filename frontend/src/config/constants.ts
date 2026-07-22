import type { Order, OrderProduct, ProductCondition } from "@/types/order";

export type NavItem = {
  href: string;
  label: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/orders", label: "ПРИХОД" },
  { href: "/groups", label: "ГРУППЫ" },
  { href: "/products", label: "ПРОДУКТЫ" },
  { href: "/users", label: "ПОЛЬЗОВАТЕЛИ" },
  { href: "/settings", label: "НАСТРОЙКИ" },
];

export const ALL = "Все";
export const NO_TYPE = "Без типа";

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
  orderItemId?: number;
};

export const STATUS_VARIANTS = {
  свободен: {
    dot: "dotFree",
    text: "statusFree",
  },

  "в ремонте": {
    dot: "dotRepair",
    text: "statusRepair",

  },

} as const;

export const CONDITION_LABEL = {
  new: "новый",
  used: "Б/У",
} as const;

export type { Order };


