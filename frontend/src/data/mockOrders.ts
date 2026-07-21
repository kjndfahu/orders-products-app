import type { Order } from "@/types/order";

const createProducts = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    id: `product-${index + 1}`,
    name: "Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3",
    serialNumber: `SN-12.${String(3456789 + index).padStart(7, "0")}`,
    status: "free" as const,
  }));

export const MOCK_ORDERS: Order[] = [
  {
    id: "order-1",
    title: "Длинное предлинное длиннющее название прихода",
    productCount: 23,
    date: new Date(2017, 3, 6),
    secondaryDateLabel: "04 / 12",
    amountUsd: 2500,
    amountUah: 250000.5,
    products: createProducts(5),
  },
  {
    id: "order-2",
    title: "Приход комплектующих — март 2017",
    productCount: 15,
    date: new Date(2017, 2, 14),
    secondaryDateLabel: "03 / 10",
    amountUsd: 1800,
    amountUah: 180000,
    products: createProducts(3),
  },
  {
    id: "order-3",
    title: "Длинное предлинное длиннющее длиннющее название прихода",
    productCount: 23,
    date: new Date(2017, 9, 6),
    secondaryDateLabel: "10 / 12",
    amountUsd: 3200,
    amountUah: 320000.75,
    products: createProducts(6),
  },
  {
    id: "order-4",
    title: "Поставка мониторов Dell",
    productCount: 8,
    date: new Date(2017, 1, 22),
    secondaryDateLabel: "02 / 18",
    amountUsd: 960,
    amountUah: 96000,
    products: createProducts(2),
  },
  {
    id: "order-5",
    title: "Серверное оборудование HP",
    productCount: 4,
    date: new Date(2017, 4, 3),
    secondaryDateLabel: "05 / 01",
    amountUsd: 5400,
    amountUah: 540000,
    products: createProducts(4),
  },
  {
    id: "order-6",
    title: "Офисная техника — квартал 2",
    productCount: 31,
    date: new Date(2017, 5, 18),
    secondaryDateLabel: "06 / 15",
    amountUsd: 4100,
    amountUah: 410000.25,
    products: createProducts(4),
  },
];
