import { io, type Socket } from "socket.io-client";

const SOCKET_PATH = "/api/socket";

type ActiveSessionsSocketGlobal = typeof globalThis & {
  __inventorySocket?: Socket;
  __inventorySocketReady?: boolean;
  __inventorySocketLastCount?: number | null;
  __inventorySocketListeners?: Set<(count: number) => void>;
};

const g = globalThis as ActiveSessionsSocketGlobal;

const listeners = (): Set<(count: number) => void> => {
  if (!g.__inventorySocketListeners) {
    g.__inventorySocketListeners = new Set();
  }
  return g.__inventorySocketListeners;
};

const notify = (count: number) => {
  g.__inventorySocketLastCount = count;
  listeners().forEach((fn) => fn(count));
};

const attachHandlers = (socket: Socket) => {
  socket.on("activeSessions", notify);

  socket.on("connect", () => {
    socket.emit("requestActiveSessions");
  });

  socket.on("disconnect", () => {
    g.__inventorySocketReady = false;
  });
};

const startActiveSessionsSocket = (): Promise<void> => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Socket is client-only"));
  }

  if (g.__inventorySocket?.connected) {
    return Promise.resolve();
  }

  if (g.__inventorySocketReady) {
    return Promise.resolve();
  }

  g.__inventorySocketReady = true;

  try {
    if (!g.__inventorySocket) {
      const socket = io({
        path: SOCKET_PATH,
        addTrailingSlash: false,
        transports: ["polling", "websocket"],
        autoConnect: false,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 10000,
        randomizationFactor: 0.5,
      });
      attachHandlers(socket);
      g.__inventorySocket = socket;
    }

    const socket = g.__inventorySocket!;
    if (!socket.connected) {
      socket.connect();
    }
    
    return Promise.resolve();
  } catch (err) {
    g.__inventorySocketReady = false;
    throw err;
  }
};

export const subscribeActiveSessions = (
  onCount: (count: number) => void,
): (() => void) => {
  listeners().add(onCount);

  if (g.__inventorySocketLastCount != null) {
    onCount(g.__inventorySocketLastCount);
  }

  void startActiveSessionsSocket().catch(() => {
  });

  return () => {
    listeners().delete(onCount);
  };
};

export const getLastActiveSessionsCount = (): number | null =>
  g.__inventorySocketLastCount ?? null;
