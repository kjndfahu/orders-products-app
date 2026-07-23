"use client";

import { Monitor, Trash2 } from "lucide-react";
import type { OrderProduct } from "@/types/order";
import { PRODUCT_STATUS_LABELS } from "@/types/order";
import styles from "./Orders.module.scss";

type OrderProductRowProps = {
  product: OrderProduct;
  onDelete?: (productId: string) => void;
};

export const OrderProductRow = ({ product, onDelete }: OrderProductRowProps) => (
  <li className={styles["orders__product-row"]}>
    <div className={styles["orders__product-info-main"]}>
      <span className={styles["orders__status-dot"]} aria-hidden="true" />

      <div className={styles["orders__product-image"]}>
        <Monitor size={40} strokeWidth={1.5} />
      </div>

      <div className={styles["orders__product-info"]}>
        <p className={styles["orders__product-name"]}>{product.name}</p>
        <p className={styles["orders__product-serial"]}>{product.serialNumber}</p>
      </div>
    </div>

    <span className={styles["orders__product-status"]}>
      {PRODUCT_STATUS_LABELS[product.status]}
    </span>

    <button
      type="button"
      className={styles["orders__product-delete"]}
      aria-label={`Удалить ${product.name}`}
      onClick={() => onDelete?.(product.id)}
    >
      <Trash2 size={16} strokeWidth={1.75} />
    </button>
  </li>
);
