"use client";

import { Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/config";
import styles from "./NavigationMenu.module.scss";

const DISABLED_NAV_LABELS = new Set(["ГРУППЫ", "ПОЛЬЗОВАТЕЛИ", "НАСТРОЙКИ"]);

export const NavigationMenu = () => {
  const pathname = usePathname() ?? "";

  return (
    <aside className={styles.navigationMenu} aria-label="Основная навигация">
      <div className={styles.profile}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar} aria-hidden="true">
            <span className={styles.avatarInitials}>АП</span>
          </div>
          <button
            type="button"
            className={styles.profileSettings}
            aria-label="Настройки профиля"
            aria-disabled="true"
          >
            <Settings size={14} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList} role="list">
          {NAV_ITEMS.map(({ href, label }) => {
            const isDisabled = DISABLED_NAV_LABELS.has(label);
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <li key={href} className={styles.navItem}>
                {isDisabled ? (
                  <span
                    className={`${styles.navLink} ${styles.navLinkDisabled}`}
                    aria-disabled="true"
                  >
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
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
