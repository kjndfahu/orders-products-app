"use client";

import { Monitor, Trash2 } from "lucide-react";
import { ProductListItem } from "@/config";
import { STATUS_VARIANTS, CONDITION_LABEL } from "../../config";
import { formatOrderDate } from "@/utils/formatOrderDate";
import { formatUsd, formatUah } from "@/utils/formatCurrency";
import { formatWarrantyRange } from "./formatWarrantyDate";
import styles from "./Products.module.scss";

type ProductListRowProps = {
  product: ProductListItem;
  statusLabel: string;
  onOpenOrder: (orderId: string) => void;
  onDelete: (productId: string) => void;
};

export const ProductListRow = ({
  product,
  statusLabel,
  onOpenOrder,
  onDelete,
}: ProductListRowProps) => {
  const { from, to } = formatWarrantyRange(
    product.warrantyFrom,
    product.warrantyTo,
  );

  const orderDate = formatOrderDate(product.orderDate);

  const status = STATUS_VARIANTS[
    statusLabel.toLowerCase() as keyof typeof STATUS_VARIANTS
  ];

  const statusStyle = status
    ? {
        dot: styles[status.dot],
        text: styles[status.text],
      }
    : {
        dot: styles.dotDefault,
        text: styles.statusDefault,
      };

  return (
    <li className={styles.row}>
      <span
        className={`${styles.statusDot} ${statusStyle.dot}`}
        aria-hidden="true"
      />

      <div className={styles.productImage}>
        <Monitor size={40} strokeWidth={1.5} />
      </div>

      <div className={styles.productInfo}>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productSerial}>{product.serialNumber}</p>
      </div>

      <span className={`${styles.status} ${statusStyle.text}`}>
        {statusLabel}
      </span>

      <div className={styles.warranty}>
        {from && (
          <span>
            с <b>{from.pretty}</b>{" "}
            <span className={styles.warrantySecondary}>({from.iso})</span>
          </span>
        )}

        {to && (
          <span>
            по <b>{to.pretty}</b>{" "}
            <span className={styles.warrantySecondary}>({to.iso})</span>
          </span>
        )}
      </div>

      <span className={styles.condition}>
        {CONDITION_LABEL[product.condition]}
      </span>

      <div className={styles.priceBlock}>
        <span className={styles.priceUsd}>
          {formatUsd(product.priceUsd)}
        </span>
        <span className={styles.priceUah}>
          {formatUah(product.priceUah)}
        </span>
      </div>

      <span className={styles.groupName}>
        {product.groupName ?? "Без типа"}
      </span>

      <span className={styles.ownerName}>
        {product.ownerName ?? "—"}
      </span>

      <button
        type="button"
        className={styles.orderLink}
        onClick={() => onOpenOrder(product.orderId)}
      >
        {product.orderTitle}
      </button>

      <div className={styles.orderDateBlock}>
        <span className={styles.orderDateSecondary}>
          {product.orderSecondaryDateLabel ?? orderDate.secondary}
        </span>

        <span className={styles.orderDatePrimary}>
          {orderDate.primary}
        </span>
      </div>

      <button
        type="button"
        className={styles.deleteButton}
        aria-label={`Удалить продукт: ${product.name}`}
        onClick={() => onDelete(product.id)}
      >
        <Trash2 size={18} strokeWidth={1.75} />
      </button>
    </li>
  );
};