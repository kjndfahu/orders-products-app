"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_PATH = "/api/socket";

let socketSingleton: ReturnType<typeof io> | null = null;
let hasInitialized = false;

export const useActiveSessions = (): number | null => {
  const [activeSessions, setActiveSessions] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

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

        socketSingleton.on("activeSessions", (count: number) => {
          if (isMounted) {
            setActiveSessions(count);
          }
        });
      } catch {
        // If socket server is unavailable, keep counter hidden.
      }
    };

    void connect();

    return () => {
      isMounted = false;
      if (socketSingleton) {
        socketSingleton.off("activeSessions");
      }
    };
  }, []);

  return activeSessions;
};

