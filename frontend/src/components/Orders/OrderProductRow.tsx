"use client";

import type { OrderProduct } from "@/types/order";
import { PRODUCT_STATUS_LABELS } from "@/types/order";
import { MonitorIcon, TrashIcon } from "./OrdersIcons";
import styles from "./Orders.module.scss";

type OrderProductRowProps = {
  product: OrderProduct;
  onDelete?: (productId: string) => void;
};

export const OrderProductRow = ({ product, onDelete }: OrderProductRowProps) => (
  <li className={styles.productRow}>
    <span className={styles.statusDot} aria-hidden="true" />

    <div className={styles.productImage}>
      <MonitorIcon />
    </div>

    <div className={styles.productInfo}>
      <p className={styles.productName}>{product.name}</p>
      <p className={styles.productSerial}>{product.serialNumber}</p>
    </div>

    <span className={styles.productStatus}>
      {PRODUCT_STATUS_LABELS[product.status]}
    </span>

    <button
      type="button"
      className={styles.productDelete}
      aria-label={`Удалить ${product.name}`}
      onClick={() => onDelete?.(product.id)}
    >
      <TrashIcon />
    </button>
  </li>
);
