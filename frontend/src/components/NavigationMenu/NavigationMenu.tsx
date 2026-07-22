"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/config";
import styles from "./NavigationMenu.module.scss";
import { GearIcon } from "./NavigationMenuIcons";

export const NavigationMenu = () => {
  const pathname = usePathname() ?? "";

  return (
    <aside className={styles.navigationMenu} aria-label="Основная навигация">
      <div className={styles.profile}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar} aria-hidden="true">
            <span className={styles.avatarInitials}>АП</span>
          </div>
          <Link
            href="/settings"
            className={styles.profileSettings}
            aria-label="Настройки профиля"
          >
            <GearIcon />
          </Link>
        </div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList} role="list">
          {NAV_ITEMS.map(({ href, label }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <li key={href} className={styles.navItem}>
                <Link
                  href={href}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
