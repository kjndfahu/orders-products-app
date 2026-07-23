"use client";

import { Plus } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import styles from "./Orders.module.scss";

type OrdersHeaderProps = {
  count: number;
};

export const OrdersHeader = ({ count }: OrdersHeaderProps) => {
  const { t } = useI18n();

  return (
    <header className={styles["orders__header"]}>
      <button
        type="button"
        className={styles["orders__add-button"]}
        aria-label="Добавить приход"
      >
        <Plus size={14} strokeWidth={2} />
      </button>

      <PageTitle title={t('orders.title')} count={count} className={styles["orders__title"]} />
    </header>
  );
};
