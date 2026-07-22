"use client";

import { formatOrderDate } from "@/utils/formatOrderDate";
import { formatUsd, formatUah } from "@/utils/formatCurrency";
import { MonitorIcon, TrashIcon } from "./ProductsIcons";
import { formatWarrantyRange } from "./formatWarrantyDate";
import type { ProductListItem } from "./product.types";
import styles from "./Products.module.scss";

const STATUS_STYLE: Record<string, { dot: string; text: string }> = {
  свободен: { dot: styles.dotFree, text: styles.statusFree },
  "в ремонте": { dot: styles.dotRepair, text: styles.statusRepair },
};

const CONDITION_LABEL: Record<ProductListItem["condition"], string> = {
  new: "новый",
  used: "Б/У",
};

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
  const { from, to } = formatWarrantyRange(product.warrantyFrom, product.warrantyTo);
  const orderDate = formatOrderDate(product.orderDate);
  const statusStyle =
    STATUS_STYLE[statusLabel.toLowerCase()] ?? { dot: styles.dotDefault, text: styles.statusDefault };

  return (
    <li className={styles.row}>
      <span className={`${styles.statusDot} ${statusStyle.dot}`} aria-hidden="true" />

      <div className={styles.productImage}>
        <MonitorIcon />
      </div>

      <div className={styles.productInfo}>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productSerial}>{product.serialNumber}</p>
      </div>

      <span className={`${styles.status} ${statusStyle.text}`}>{statusLabel}</span>

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

      <span className={styles.condition}>{CONDITION_LABEL[product.condition]}</span>

      <div className={styles.priceBlock}>
        <span className={styles.priceUsd}>{formatUsd(product.priceUsd)}</span>
        <span className={styles.priceUah}>{formatUah(product.priceUah)}</span>
      </div>

      <span className={styles.groupName}>{product.groupName ?? "Без типа"}</span>

      <span className={styles.ownerName}>{product.ownerName ?? "—"}</span>

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
        <span className={styles.orderDatePrimary}>{orderDate.primary}</span>
      </div>

      <button
        type="button"
        className={styles.deleteButton}
        aria-label={`Удалить продукт: ${product.name}`}
        onClick={() => onDelete(product.id)}
      >
        <TrashIcon />
      </button>
    </li>
  );
};
