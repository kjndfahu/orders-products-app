"use client";

import { useEffect, useState } from "react";

const DEFAULT_TICK_MS = 1_000;

export const useCurrentDateTime = (tickMs = DEFAULT_TICK_MS): Date => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, tickMs);

    return () => window.clearInterval(timer);
  }, [tickMs]);

  return now;
};
