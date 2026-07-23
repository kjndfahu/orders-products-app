"use client";

import { Clock3 } from "lucide-react";
import { useActiveSessions, useCurrentDateTime } from "@/hooks";
import { formatHeaderDate } from "@/utils/formatHeaderDate";
import { formatHeaderTime } from "@/utils/formatHeaderTime";
import styles from "./TopMenuDateTime.module.scss";

export const TopMenuDateTime = () => {
  const now = useCurrentDateTime();
  const activeSessions = useActiveSessions();
  const isoDateTime = now.toISOString();

  return (
    <div className={styles["top-menu-date-time"]} aria-live="polite">
      <span className={styles["top-menu-date-time__label"]}>Сегодня</span>
      <div className={styles["top-menu-date-time__row"]}>
        <time
          className={styles["top-menu-date-time__date"]}
          dateTime={isoDateTime}
          suppressHydrationWarning
        >
          {formatHeaderDate(now)}
        </time>

        {activeSessions !== null && (
          <span className={styles["top-menu-date-time__sessions"]} aria-label={`Активных сессий: ${activeSessions}`}>
            {activeSessions}
          </span>
        )}

        <span className={styles["top-menu-date-time__clock"]} aria-hidden="true">
          <Clock3 className={styles["top-menu-date-time__clock-icon"]} size={16} strokeWidth={1.9} />
        </span>
        <time
          className={styles["top-menu-date-time__time"]}
          dateTime={isoDateTime}
          suppressHydrationWarning
        >
          {formatHeaderTime(now)}
        </time>
      </div>
    </div>
  );
};
