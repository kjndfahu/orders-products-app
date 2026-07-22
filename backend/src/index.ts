import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";

import { testConnection } from "./config/database";
import orderRoutes from "./routes/orders";
import productRoutes from "./routes/products";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT ?? 5000);
const API_PREFIX = process.env.API_PREFIX ?? "/api/v1";

const allowedOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get(`${API_PREFIX}/health`, (_req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use(`${API_PREFIX}/orders`, orderRoutes);
app.use(`${API_PREFIX}/products`, productRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  },
);

app.listen(PORT, async () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  await testConnection();
});
