"use client";

import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

const SOCKET_PATH = "/api/socket";

let socketSingleton: Socket | null = null;
let hasInitialized = false;

export const useActiveSessions = (): number | null => {
  const [activeSessions, setActiveSessions] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    const handleActiveSessions = (count: number) => {
      if (isMounted) {
        setActiveSessions(count);
      }
    };

    const connect = async () => {
      try {
        if (!hasInitialized) {
          // Initializes the Socket.io server in Next API route.
          await fetch(SOCKET_PATH);
          hasInitialized = true;
        }

        if (!socketSingleton) {
          socketSingleton = io({
            path: SOCKET_PATH,
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
    };

    void connect();

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
