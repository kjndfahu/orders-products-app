"use client";

import { ChevronRight, Menu, Trash2 } from "lucide-react";
import type { Order } from "@/types/order";
import { formatOrderDate } from "@/utils/formatOrderDate";
import { formatUsd, formatUah } from "@/utils/formatCurrency";
import { pluralizeProducts } from "@/utils/pluralizeProducts";
import { useI18n } from "@/contexts/I18nContext";
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
  const { locale } = useI18n();
  const { secondary, primary } = formatOrderDate(order.date, locale);

  return (
    <div className={styles["orders__card-row"]}>
      <article
        className={`${styles["orders__card"]} ${isActive ? styles["orders__card--active"] : ""} ${isCompact ? styles["orders__card--compact"] : ""}`}
        aria-current={isActive ? "true" : undefined}
      >
        {!isCompact && <h3 className={styles["orders__card-title"]}>{order.id}</h3>}

        <div className={styles["orders__product-menu"]}>
          <button
            type="button"
            className={styles["orders__menu-button"]}
            aria-label={`Открыть детали прихода: ${order.title}`}
            aria-expanded={isActive}
            onClick={() => onOpenDetails(order.id)}
          >
            <Menu size={16} strokeWidth={1.75}/>
          </button>

          <div className={styles["orders__product-count"]}>
            <span className={styles["orders__product-count-value"]}>{order.productCount}</span>
            <span className={styles["orders__product-count-label"]}>
              {pluralizeProducts(order.productCount, locale)}
            </span>
          </div>
        </div>

        <div className={styles["orders__date-block"]}>
          <span className={styles["orders__date-secondary"]}>
            {order.secondaryDateLabel ?? secondary}
          </span>
          <span className={styles["orders__date-primary"]}>{primary}</span>
        </div>

        <div className={styles["orders__price-block"]}>
          <span className={styles["orders__price-usd"]}>{formatUsd(order.amountUsd)}</span>
          <span className={styles["orders__price-uah"]}>{formatUah(order.amountUah)}</span>
        </div>

        <button
          type="button"
          className={styles["orders__delete-button"]}
          aria-label={`Удалить приход: ${order.title}`}
          onClick={() => onDelete(order.id)}
        >
          <Trash2 size={16} strokeWidth={1.75} />
        </button>

        {isCompact && (
          <div
            className={`${styles["orders__card-arrow"]} ${isActive ? "" : styles["orders__card-arrow--spacer"]}`}
            aria-hidden="true"
          >
            {isActive && <ChevronRight size={16} strokeWidth={1.75} />}
          </div>
        )}
      </article>


    </div>
  );
};
