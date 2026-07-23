import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrderItem,
  deleteOrder,
} from "../controllers/orderController";

const router = Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.patch("/:id/status", updateOrderStatus);
router.delete("/:orderNumber/items/:itemId", deleteOrderItem);
router.delete("/:orderNumber", deleteOrder);

export default router;
