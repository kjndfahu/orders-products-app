import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";

type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: HttpServer & {
      io?: SocketIOServer;
    };
  };
};

declare global {
  // eslint-disable-next-line no-var
  var __inventorySocketIo: SocketIOServer | undefined;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const getSessionCount = (io: SocketIOServer): number =>
  io.sockets.sockets.size;

const broadcastActiveSessions = (io: SocketIOServer) => {
  setImmediate(() => {
    const count = getSessionCount(io);
    io.emit("activeSessions", count);
  });
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponseWithSocket,
) {
  const httpServer = res.socket.server;

  if (!global.__inventorySocketIo) {
    const io = new SocketIOServer(httpServer, {
      path: "/api/socket",
      addTrailingSlash: false,
      transports: ["polling", "websocket"],
      pingTimeout: 20000,
      pingInterval: 25000,
    });

    io.on("connection", (socket) => {
      broadcastActiveSessions(io);

      socket.on("requestActiveSessions", () => {
        setImmediate(() => {
          socket.emit("activeSessions", getSessionCount(io));
        });
      });

      socket.on("disconnect", () => {
        broadcastActiveSessions(io);
      });
    });

    global.__inventorySocketIo = io;
  }

  httpServer.io = global.__inventorySocketIo;
  res.status(200).end();
}
