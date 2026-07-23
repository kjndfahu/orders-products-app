import type { Request, Response } from "express";
import { z } from "zod";
import { orderService } from "../config/services";
import { handleError, handleValidationError } from "../utils/errorHandler";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { status, payment_status, customer_email } = req.query;

    const orders = await orderService.getOrders({
      status: status ? String(status) as any : undefined,
      payment_status: payment_status ? String(payment_status) as any : undefined,
      customer_email: customer_email ? String(customer_email) : undefined,
    });

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    handleError(error, res, "fetching orders");
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await orderService.getOrderByIdOrNumber(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    handleError(error, res, "fetching order");
  }
};

const createOrderSchema = z.object({
  customer_name: z.string().min(1),
  customer_email: z.string().email(),
  customer_phone: z.string().optional(),
  shipping_address: z.string().min(1),
  billing_address: z.string().optional(),
  payment_method: z.string().optional(),
  notes: z.string().optional(),
  items: z
    .array(
      z.object({
        product_id: z.number().int().positive(),
        product_name: z.string().min(1),
        product_price: z.number().positive(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
});

export const createOrder = async (req: Request, res: Response) => {
  try {
    const parseResult = createOrderSchema.safeParse(req.body);

    if (!parseResult.success) {
      handleValidationError(res, "order payload", parseResult.error);
      return;
    }

    const result = await orderService.createOrder(parseResult.data);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error) {
    handleError(error, res, "creating order");
  }
};

const deleteOrderItemSchema = z.object({
  orderNumber: z.string().min(1),
  itemId: z.coerce.number().int().positive(),
});

export const deleteOrderItem = async (req: Request, res: Response) => {
  try {
    const parseResult = deleteOrderItemSchema.safeParse(req.params);

    if (!parseResult.success) {
      handleValidationError(res, "request params", parseResult.error);
      return;
    }

    const { orderNumber, itemId } = parseResult.data;

    const result = await orderService.deleteOrderItem(orderNumber, itemId);

    if (!result.found) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!result.deleted) {
      return res.status(404).json({
        success: false,
        message: "Order item not found",
      });
    }

    res.json({
      success: true,
      message: "Order item deleted successfully",
    });
  } catch (error) {
    handleError(error, res, "deleting order item");
  }
};

const orderStatusSchema = z.object({
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]).optional(),
  payment_status: z.enum(["pending", "paid", "failed", "refunded"]).optional(),
});

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const parseResult = orderStatusSchema.safeParse(req.body);

    if (!parseResult.success) {
      handleValidationError(res, "status payload", parseResult.error);
      return;
    }

    const { status, payment_status } = parseResult.data;

    if (!status && !payment_status) {
      return res.status(400).json({
        success: false,
        message: "No updates provided",
      });
    }

    const result = await orderService.updateOrderStatus(
      req.params.id,
      status,
      payment_status,
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found or no updates",
      });
    }

    res.json({
      success: true,
      message: "Order updated successfully",
    });
  } catch (error) {
    handleError(error, res, "updating order");
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderNumber } = req.params;

    if (!orderNumber) {
      return res.status(400).json({
        success: false,
        message: "Order number is required",
      });
    }

    const result = await orderService.deleteOrder(orderNumber);

    if (!result.found) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    handleError(error, res, "deleting order");
  }
};
