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
