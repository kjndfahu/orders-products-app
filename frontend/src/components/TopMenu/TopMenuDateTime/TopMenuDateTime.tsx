"use client";

import { Clock3 } from "lucide-react";
import { useActiveSessions, useCurrentDateTime } from "@/hooks";
import { formatHeaderDate } from "@/utils/formatHeaderDate";
import { formatHeaderTime } from "@/utils/formatHeaderTime";
import { useI18n } from "@/contexts/I18nContext";
import styles from "./TopMenuDateTime.module.scss";

export const TopMenuDateTime = () => {
  const now = useCurrentDateTime();
  const activeSessions = useActiveSessions();
  const { t, locale } = useI18n();
  const isoDateTime = now.toISOString();

  return (
    <div className={styles["top-menu-date-time"]} aria-live="polite">
      <span className={styles["top-menu-date-time__label"]}>{t('common.today')}</span>
      <div className={styles["top-menu-date-time__row"]}>
        <time
          className={styles["top-menu-date-time__date"]}
          dateTime={isoDateTime}
          suppressHydrationWarning
        >
          {formatHeaderDate(now, locale)}
        </time>

        <span
          className={styles["top-menu-date-time__sessions-wrap"]}
          aria-label={
            activeSessions !== null
              ? `${t("common.activeSessionsAria")}: ${activeSessions}`
              : t("common.activeSessionsAria")
          }
        >
          <span className={styles["top-menu-date-time__sessions-label"]}>
            {t("common.activeSessions")}
          </span>
          <span className={styles["top-menu-date-time__sessions"]} aria-hidden="true">
            {activeSessions ?? "…"}
          </span>
        </span>

        <span className={styles["top-menu-date-time__clock"]} aria-hidden="true">
          <Clock3 className={styles["top-menu-date-time__clock-icon"]} size={16} strokeWidth={1.9} />
        </span>
        <time
          className={styles["top-menu-date-time__time"]}
          dateTime={isoDateTime}
          suppressHydrationWarning
        >
          {formatHeaderTime(now, locale)}
        </time>
      </div>
    </div>
  );
};
