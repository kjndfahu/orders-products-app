"use client";

import { FormEvent, useId } from "react";
import styles from "./TopMenuSearch.module.scss";

export type TopMenuSearchProps = {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
};

export const TopMenuSearch = ({
  placeholder = "Поиск",
  onSearch,
  className,
}: TopMenuSearchProps) => {
  const inputId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("q") ?? "").trim();

    onSearch?.(query);
  };

  return (
    <form
      className={[styles["top-menu-search__form"], className].filter(Boolean).join(" ")}
      role="search"
      aria-label="Поиск"
      onSubmit={handleSubmit}
    >
      <label htmlFor={inputId} className={styles["top-menu-search__visually-hidden"]}>
        {placeholder}
      </label>
      <input
        id={inputId}
        type="search"
        name="q"
        className={styles["top-menu-search__input"]}
        placeholder={placeholder}
        autoComplete="off"
      />
    </form>
  );
};
