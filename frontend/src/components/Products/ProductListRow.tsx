"use client";

import { Monitor, Trash2 } from "lucide-react";
import { ProductListItem } from "@/config";
import { STATUS_VARIANTS, CONDITION_LABEL } from "../../config";
import { formatOrderDate } from "@/utils/formatOrderDate";
import { formatUsd, formatUah } from "@/utils/formatCurrency";
import { formatWarrantyRange } from "@/utils/formatWarrantyDate";
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
        dot: styles[`products__status-dot--${status.dot.replace('dot', '')}`],
        text: styles[`products__status--${status.text.replace('status', '')}`],
      }
    : {
        dot: styles["products__status-dot--default"],
        text: styles["products__status--default"],
      };

  return (
    <li className={styles["products__row"]}>
      <span
        className={`${styles["products__status-dot"]} ${statusStyle.dot}`}
        aria-hidden="true"
      />

      <div className={styles["products__product-image"]}>
        <Monitor size={40} strokeWidth={1.5} />
      </div>

      <div className={styles["products__product-info"]}>
        <p className={styles["products__product-name"]}>{product.name}</p>
        <p className={styles["products__product-serial"]}>{product.serialNumber}</p>
      </div>

      <span className={`${styles["products__status"]} ${statusStyle.text}`}>
        {statusLabel}
      </span>

      <div className={styles["products__warranty"]}>
        {from && (
          <span>
            с <b>{from.pretty}</b>{" "}
            <span className={styles["products__warranty-secondary"]}>({from.iso})</span>
          </span>
        )}

        {to && (
          <span>
            по <b>{to.pretty}</b>{" "}
            <span className={styles["products__warranty-secondary"]}>({to.iso})</span>
          </span>
        )}
      </div>

      <span className={styles["products__condition"]}>
        {CONDITION_LABEL[product.condition]}
      </span>

      <div className={styles["products__price-block"]}>
        <span className={styles["products__price-usd"]}>
          {formatUsd(product.priceUsd)}
        </span>
        <span className={styles["products__price-uah"]}>
          {formatUah(product.priceUah)}
        </span>
      </div>

      <span className={styles["products__group-name"]}>
        {product.groupName ?? "Без типа"}
      </span>

      <span className={styles["products__owner-name"]}>
        {product.ownerName ?? "—"}
      </span>

      <button
        type="button"
        className={styles["products__order-link"]}
        onClick={() => onOpenOrder(product.orderId)}
      >
        {product.orderTitle}
      </button>

      <div className={styles["products__order-date-block"]}>
        <span className={styles["products__order-date-secondary"]}>
          {product.orderSecondaryDateLabel ?? orderDate.secondary}
        </span>

        <span className={styles["products__order-date-primary"]}>
          {orderDate.primary}
        </span>
      </div>

      <button
        type="button"
        className={styles["products__delete-button"]}
        aria-label={`Удалить продукт: ${product.name}`}
        onClick={() => onDelete(product.id)}
      >
        <Trash2 size={18} strokeWidth={1.75} />
      </button>
    </li>
  );
};