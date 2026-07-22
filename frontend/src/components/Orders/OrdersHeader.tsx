"use client";

import { Plus } from "lucide-react";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import styles from "./Orders.module.scss";

type OrdersHeaderProps = {
  count: number;
};

export const OrdersHeader = ({ count }: OrdersHeaderProps) => (
  <header className={styles.header}>
    <button
      type="button"
      className={styles.addButton}
      aria-label="Добавить приход"
    >
      <Plus size={14} strokeWidth={2} />
    </button>

    <PageTitle title="Приходы" count={count} className={styles.title} />
  </header>
);
