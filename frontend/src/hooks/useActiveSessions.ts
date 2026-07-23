"use client";

import { useEffect, useState } from "react";
import {
  getLastActiveSessionsCount,
  subscribeActiveSessions,
} from "@/lib/activeSessionsSocket";

export const useActiveSessions = (): number | null => {
  const [activeSessions, setActiveSessions] = useState<number | null>(() =>
    getLastActiveSessionsCount(),
  );

  useEffect(() => subscribeActiveSessions(setActiveSessions), []);

  return activeSessions;
};
