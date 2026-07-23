"use client";

import { Menu, Shield } from "lucide-react";
import Link from "next/link";
import { TopMenuDateTime } from "./TopMenuDateTime";
import { TopMenuSearch } from "./TopMenuSearch";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useI18n } from "@/contexts/I18nContext";
import styles from "./TopMenu.module.scss";

type TopMenuProps = {
  onMobileMenuToggle: () => void;
};

export const TopMenu = ({ onMobileMenuToggle }: TopMenuProps) => {
  const { locale } = useI18n();

  return (
    <header className={styles["top-menu"]}>
      <div className={styles["top-menu__inner"]}>
        <button
          type="button"
          className={styles["top-menu__burger"]}
          aria-label="Открыть меню"
          onClick={onMobileMenuToggle}
        >
          <Menu size={24} strokeWidth={1.75} />
        </button>

        <Link href={`/${locale}/orders`} className={styles["top-menu__brand"]} aria-label="INVENTORY — на главную">
          <Shield className={styles["top-menu__brand-icon"]} size={22} strokeWidth={1.9} />
          <span className={styles["top-menu__brand-text"]}>INVENTORY</span>
        </Link>

        <div className={styles["top-menu__search-slot"]}>
          <TopMenuSearch />
        </div>

        <div className={styles["top-menu__datetime-slot"]}>
          <TopMenuDateTime />
        </div>

        <div className={styles["top-menu__language-slot"]}>
          <LanguageSwitcher />
        </div>

        <div className={styles["top-menu__theme-slot"]}>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};
