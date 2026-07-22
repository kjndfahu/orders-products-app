"use client";

import { Clock3 } from "lucide-react";
import { useActiveSessions, useCurrentDateTime } from "@/hooks";
import { formatHeaderDate, formatHeaderTime } from "../utils";
import styles from "./TopMenuDateTime.module.scss";

export const TopMenuDateTime = () => {
  const now = useCurrentDateTime();
  const activeSessions = useActiveSessions();
  const isoDateTime = now.toISOString();

  return (
    <div className={styles.root} aria-live="polite">
      <span className={styles.label}>Сегодня</span>
      <div className={styles.row}>
        <time
          className={styles.date}
          dateTime={isoDateTime}
          suppressHydrationWarning
        >
          {formatHeaderDate(now)}
        </time>

        {activeSessions !== null && (
          <span className={styles.sessions} aria-label={`Активных сессий: ${activeSessions}`}>
            {activeSessions}
          </span>
        )}

        <span className={styles.clock} aria-hidden="true">
          <Clock3 className={styles.clockIcon} size={16} strokeWidth={1.9} />
        </span>
        <time
          className={styles.time}
          dateTime={isoDateTime}
          suppressHydrationWarning
        >
          {formatHeaderTime(now)}
        </time>
      </div>
    </div>
  );
};
