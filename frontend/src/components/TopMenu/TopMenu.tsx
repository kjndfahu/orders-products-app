import { Shield } from "lucide-react";
import Link from "next/link";
import { TopMenuDateTime } from "./TopMenuDateTime";
import { TopMenuSearch } from "./TopMenuSearch";
import styles from "./TopMenu.module.scss";

export const TopMenu = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="INVENTORY — на главную">
          <Shield className={styles.brandIcon} size={22} strokeWidth={1.9} />
          <span className={styles.brandText}>INVENTORY</span>
        </Link>

        <div className={styles.searchSlot}>
          <TopMenuSearch />
        </div>

        <div className={styles.dateTimeSlot}>
          <TopMenuDateTime />
        </div>
      </div>
    </header>
  );
};
