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
    <header className={styles.header}>
      <button
        type="button"
        className={styles.addButton}
        aria-label="Добавить приход"
      >
        <Plus size={14} strokeWidth={2} />
      </button>

      <PageTitle title={t('orders.title')} count={count} className={styles.title} />
    </header>
  );
};
