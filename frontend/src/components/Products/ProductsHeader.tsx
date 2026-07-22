"use client";

import { PageTitle } from "@/components/PageTitle/PageTitle";
import { ChevronDownIcon } from "./ProductsIcons";
import styles from "./Products.module.scss";

type ProductsHeaderProps = {
  count: number;
  typeOptions: string[];
  selectedType: string;
  onTypeChange: (value: string) => void;
};

export const ProductsHeader = ({
  count,
  typeOptions,
  selectedType,
  onTypeChange,
}: ProductsHeaderProps) => (
  <div className={styles.header}>
    <PageTitle
      title="Продукты"
      count={count}
      className={styles.title}
      countClassName={styles.titleCount}
    />

    <label className={styles.filter}>
      <span className={styles.filterLabel}>Тип продукта:</span>
      <span className={styles.filterSelectWrap}>
        <select
          className={styles.filterSelect}
          value={selectedType}
          onChange={(event) => onTypeChange(event.target.value)}
        >
          {typeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDownIcon />
      </span>
    </label>
  </div>
);
