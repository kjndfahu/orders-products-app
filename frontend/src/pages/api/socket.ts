import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";

type WithSocketServer = NextApiResponse & {
  socket: {
    server: {
      io?: SocketIOServer;
      activeSocketIds?: Set<string>;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(_req: NextApiRequest, res: WithSocketServer) {
  const server = res.socket.server;

  if (!server.io) {
    const io = new SocketIOServer(server as unknown as HttpServer, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    server.io = io;
    server.activeSocketIds = new Set<string>();

    io.on("connection", (socket) => {
      server.activeSocketIds?.add(socket.id);
      io.emit("activeSessions", server.activeSocketIds?.size ?? 0);

      socket.on("requestActiveSessions", () => {
        socket.emit("activeSessions", server.activeSocketIds?.size ?? 0);
      });

      socket.on("disconnect", () => {
        server.activeSocketIds?.delete(socket.id);
        io.emit("activeSessions", server.activeSocketIds?.size ?? 0);
      });
    });
  }

  res.end();
}
