import type { Order, OrderProduct, ProductCondition } from "@/types/order";

export type NavItem = {
  href: string;
  key: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/ru/orders", key: "orders" },
  { href: "/ru/groups", key: "groups" },
  { href: "/ru/products", key: "products" },
  { href: "/ru/users", key: "users" },
  { href: "/ru/settings", key: "settings" },
];

export const ALL = "all";
export const NO_TYPE = "no_type";

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
  free: {
    dot: "dotFree",
    text: "statusFree",
  },

  repair: {
    dot: "dotRepair",
    text: "statusRepair",

  },

} as const;

export const CONDITION_LABEL = {
  new: "new",
  used: "used",
} as const;

export type { Order };


