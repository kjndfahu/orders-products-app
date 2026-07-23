"use client";

import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

const SOCKET_PATH = "/api/socket";

let socketSingleton: Socket | null = null;

export const useActiveSessions = (): number | null => {
  const [activeSessions, setActiveSessions] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    const handleActiveSessions = (count: number) => {
      if (isMounted) {
        setActiveSessions(count);
      }
    };

    try {
      if (!socketSingleton) {
        socketSingleton = io({
          path: SOCKET_PATH,
          transports: ["websocket"],
        });
      }

      socketSingleton.on("activeSessions", handleActiveSessions);
      socketSingleton.on("connect", () => {
        socketSingleton?.emit("requestActiveSessions");
      });

      if (socketSingleton.connected) {
        socketSingleton.emit("requestActiveSessions");
      }
    } catch {
      // If socket server is unavailable, keep counter hidden.
    }

    return () => {
      isMounted = false;
      if (socketSingleton) {
        socketSingleton.off("activeSessions", handleActiveSessions);
        socketSingleton.off("connect");
      }
    };
  }, []);

  return activeSessions;
};
