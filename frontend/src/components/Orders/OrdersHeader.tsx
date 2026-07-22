"use client";

import { PageTitle } from "@/components/PageTitle/PageTitle";
import { PlusIcon } from "./OrdersIcons";
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
      <PlusIcon />
    </button>

    <PageTitle title="Приходы" count={count} className={styles.title} />
  </header>
);
