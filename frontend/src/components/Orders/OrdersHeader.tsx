"use client";

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

    <h1 className={styles.title}>Приходы / {count}</h1>
  </header>
);
