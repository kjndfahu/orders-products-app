"use client";

import { Settings, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/contexts/I18nContext";
import { useMobileMenu } from "@/contexts/MobileMenuContext";
import { NAV_ITEMS } from "@/config";
import { DISABLED_NAV_KEYS } from "./NavigationMenu.constants";
import type { NavKey } from "./NavigationMenu.types";
import styles from "./NavigationMenu.module.scss";

export const NavigationMenu = () => {
  const pathname = usePathname() ?? "";
  const { t, locale } = useI18n();
  const { isMobileMenuOpen, closeMobileMenu } = useMobileMenu();

  const getLocalizedHref = (href: string) => {
    return href.replace('/ru', `/${locale}`);
  };

  return (
    <aside
      className={`${styles["navigation-menu"]} ${isMobileMenuOpen ? styles["navigation-menu--open"] : ""}`}
      aria-label="Основная навигация"
    >
        <button
          type="button"
          className={styles["navigation-menu__mobile-close"]}
          aria-label="Закрыть меню"
          onClick={closeMobileMenu}
        >
          <X size={24} strokeWidth={1.75} />
        </button>

        <div className={styles["navigation-menu__profile"]}>
          <div className={styles["navigation-menu__avatar-wrapper"]}>
            <div className={styles["navigation-menu__avatar"]} aria-hidden="true">
              <span className={styles["navigation-menu__avatar-initials"]}>АП</span>
            </div>
            <button
              type="button"
              className={styles["navigation-menu__profile-settings"]}
              aria-label="Настройки профиля"
              aria-disabled="true"
            >
              <Settings size={14} strokeWidth={1.75} />
            </button>
          </div>
        </div>

      <nav className={styles["navigation-menu__nav"]}>
        <ul className={styles["navigation-menu__nav-list"]} role="list">
          {NAV_ITEMS.map(({ href, key }) => {
            const navKey = key as NavKey;
            const isDisabled = DISABLED_NAV_KEYS.has(navKey);
            const localizedHref = getLocalizedHref(href);
            const isActive =
              pathname === localizedHref || pathname.startsWith(`${localizedHref}/`);

            return (
              <li key={href} className={styles["navigation-menu__nav-item"]}>
                {isDisabled ? (
                  <span
                    className={`${styles["navigation-menu__nav-link"]} ${styles["navigation-menu__nav-link--disabled"]}`}
                    aria-disabled="true"
                  >
                    {t(`nav.${navKey}`)}
                  </span>
                ) : (
                  <Link
                    href={localizedHref}
                    className={`${styles["navigation-menu__nav-link"]} ${isActive ? styles["navigation-menu__nav-link--active"] : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={closeMobileMenu}
                  >
                    {t(`nav.${navKey}`)}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
