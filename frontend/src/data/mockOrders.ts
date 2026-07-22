import type { Order } from "@/types/order";

const BASE_PRODUCT_NAME =
  "Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3";

const makeProduct = (
  orderId: string,
  index: number,
  overrides: Partial<Order["products"][number]> = {},
) => ({
  id: `${orderId}-product-${index}`,
  name: BASE_PRODUCT_NAME,
  serialNumber: `SN-12.${String(3456789 + index).padStart(7, "0")}`,
  status: "free" as const,
  ...overrides,
});

export const MOCK_ORDERS: Order[] = [
  {
    id: "order-1",
    title: "Длинное предлинное длиннющее название прихода",
    date: new Date(2017, 3, 6),
    secondaryDateLabel: "04 / 12",
    amountUsd: 2500,
    amountUah: 250000.5,
    products: [
      makeProduct("order-1", 1, {
        warrantyFrom: "2017-04-06",
        warrantyTo: "2025-08-06",
        groupName: "Mon1",
        ownerName: "Александр",
      }),
      makeProduct("order-1", 2, {
        status: "repair",
        condition: "used",
        warrantyFrom: "2017-04-06",
        warrantyTo: "2025-08-06",
        groupName: "Mon1",
        ownerName: "Александр",
      }),
      makeProduct("order-1", 3, { status: "reserved", groupName: "Mon1" }),
      makeProduct("order-1", 4, { groupName: "Mon1" }),
      makeProduct("order-1", 5, { status: "sold", groupName: "Mon1" }),
    ],
    productCount: 5,
  },
  {
    id: "order-2",
    title: "Приход комплектующих — март 2017",
    date: new Date(2017, 2, 14),
    secondaryDateLabel: "03 / 10",
    amountUsd: 1800,
    amountUah: 180000,
    products: [
      makeProduct("order-2", 6, { name: "Монитор Dell U2412M", groupName: "Mon2" }),
      makeProduct("order-2", 7, { name: "Монитор Dell U2412M", groupName: "Mon2" }),
      makeProduct("order-2", 8, { name: "Монитор Dell U2412M", status: "repair", groupName: "Mon2" }),
      makeProduct("order-2", 9, { name: "Монитор Dell U2715H", groupName: "Mon2" }),
    ],
    productCount: 4,
  },
  {
    id: "order-3",
    title: "Длинное предлинное длиннющее длиннющее название прихода",
    date: new Date(2017, 9, 6),
    secondaryDateLabel: "10 / 12",
    amountUsd: 3200,
    amountUah: 320000.75,
    products: [
      makeProduct("order-3", 10, { groupName: "CPU" }),
      makeProduct("order-3", 11, { groupName: "CPU" }),
      makeProduct("order-3", 12, { groupName: "CPU" }),
      makeProduct("order-3", 13, { status: "repair", groupName: "CPU", ownerName: "Христорождественский Александр" }),
      makeProduct("order-3", 14, { status: "reserved", groupName: "CPU" }),
      makeProduct("order-3", 15, { status: "sold", groupName: "CPU" }),
    ],
    productCount: 6,
  },
  {
    id: "order-4",
    title: "Поставка мониторов Dell",
    date: new Date(2017, 1, 22),
    secondaryDateLabel: "02 / 18",
    amountUsd: 960,
    amountUah: 96000,
    products: [
      makeProduct("order-4", 16, { name: "MacBook Pro 13", groupName: "Laptop", ownerName: "Ирина" }),
      makeProduct("order-4", 17, { name: "MacBook Pro 13", groupName: "Laptop" }),
      makeProduct("order-4", 18, { name: "MacBook Air 13", status: "repair", groupName: "Laptop" }),
    ],
    productCount: 3,
  },
  {
    id: "order-5",
    title: "Серверное оборудование HP",
    date: new Date(2017, 4, 3),
    secondaryDateLabel: "05 / 01",
    amountUsd: 5400,
    amountUah: 540000,
    products: [
      makeProduct("order-5", 19, { name: "HP ProLiant DL360", groupName: "Server", ownerName: "Сергей" }),
      makeProduct("order-5", 20, { name: "HP ProLiant DL360", groupName: "Server" }),
      makeProduct("order-5", 21, { name: "HP ProLiant DL380", status: "reserved", groupName: "Server" }),
      makeProduct("order-5", 22, { name: "HP ProLiant DL380", status: "repair", groupName: "Server" }),
    ],
    productCount: 4,
  },
  {
    id: "order-6",
    title: "Офисная техника — квартал 2",
    date: new Date(2017, 5, 18),
    secondaryDateLabel: "06 / 15",
    amountUsd: 4100,
    amountUah: 410000.25,
    products: [
      makeProduct("order-6", 23, { name: "Клавиатура Logitech", groupName: "Office" }),
      makeProduct("order-6", 24, { name: "Мышь Logitech", groupName: "Office" }),
      makeProduct("order-6", 25, { name: "Принтер HP LaserJet", status: "repair", groupName: "Office" }),
    ],
    productCount: 3,
  },
];
