import type { NavItem, NavKey } from "@/types/nav";

export const NAV_ITEMS: NavItem[] = [
  { href: "/ru/orders", key: "orders" },
  { href: "/ru/groups", key: "groups" },
  { href: "/ru/products", key: "products" },
  { href: "/ru/users", key: "users" },
  { href: "/ru/settings", key: "settings" },
];

export const DISABLED_NAV_KEYS = new Set<NavKey>(["groups", "users", "settings"]);
