"use client";

import { ChevronRight, Menu, Trash2 } from "lucide-react";
import type { Order } from "@/types/order";
import { formatOrderDate } from "@/utils/formatOrderDate";
import { formatUsd, formatUah } from "@/utils/formatCurrency";
import { pluralizeProducts } from "@/utils/pluralizeProducts";
import styles from "./Orders.module.scss";

type OrderCardProps = {
  order: Order;
  isActive: boolean;
  isCompact?: boolean;
  onOpenDetails: (orderId: string) => void;
  onDelete: (orderId: string) => void;
};

export const OrderCard = ({
  order,
  isActive,
  isCompact = false,
  onOpenDetails,
  onDelete,
}: OrderCardProps) => {
  const { secondary, primary } = formatOrderDate(order.date);

  return (
    <div className={styles.cardRow}>
      <article
        className={`${styles.card} ${isActive ? styles.cardActive : ""} ${isCompact ? styles.cardCompact : ""}`}
        aria-current={isActive ? "true" : undefined}
      >
        <h3 className={styles.cardTitle}>{order.title}</h3>

        <div className={styles.productMenu}>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={`Открыть детали прихода: ${order.title}`}
            aria-expanded={isActive}
            onClick={() => onOpenDetails(order.id)}
          >
            <Menu size={16} strokeWidth={1.75}/>
          </button>

          <div className={styles.productCount}>
            <span className={styles.productCountValue}>{order.productCount}</span>
            <span className={styles.productCountLabel}>
              {pluralizeProducts(order.productCount)}
            </span>
          </div>
        </div>

        <div className={styles.dateBlock}>
          <span className={styles.dateSecondary}>
            {order.secondaryDateLabel ?? secondary}
          </span>
          <span className={styles.datePrimary}>{primary}</span>
        </div>

        <div className={styles.priceBlock}>
          <span className={styles.priceUsd}>{formatUsd(order.amountUsd)}</span>
          <span className={styles.priceUah}>{formatUah(order.amountUah)}</span>
        </div>

        <button
          type="button"
          className={styles.deleteButton}
          aria-label={`Удалить приход: ${order.title}`}
          onClick={() => onDelete(order.id)}
        >
          <Trash2 size={16} strokeWidth={1.75} />
        </button>

        {isCompact && (
          <div
            className={`${styles.cardArrow} ${isActive ? "" : styles.cardArrowSpacer}`}
            aria-hidden="true"
          >
            {isActive && <ChevronRight size={16} strokeWidth={1.75} />}
          </div>
        )}
      </article>


    </div>
  );
};
