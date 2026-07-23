"use client";

import { useCallback, useMemo, useState } from "react";
import {
  deleteOrder as deleteOrderAction,
  deleteProduct,
  selectOrders,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { deleteOrderItem } from "@/services/ordersApi";

export const useOrdersView = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [deleteOrderId, setDeleteOrderId] = useState<string | null>(null);

  const selectedOrder = useMemo(
    () => orders.find((order) => order.id === selectedOrderId) ?? null,
    [orders, selectedOrderId],
  );

  const orderToDelete = useMemo(
    () => orders.find((order) => order.id === deleteOrderId) ?? null,
    [orders, deleteOrderId],
  );

  const handleOpenDetails = useCallback((orderId: string) => {
    setSelectedOrderId((current) => (current === orderId ? null : orderId));
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedOrderId(null);
  }, []);

  const handleDeleteRequest = useCallback((orderId: string) => {
    setDeleteOrderId(orderId);
  }, []);

  const handleDeleteCancel = useCallback(() => {
    setDeleteOrderId(null);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    setDeleteOrderId((currentDeleteOrderId) => {
      if (!currentDeleteOrderId) {
        return null;
      }

      dispatch(deleteOrderAction(currentDeleteOrderId));
      setSelectedOrderId((current) =>
        current === currentDeleteOrderId ? null : current,
      );

      return null;
    });
  }, [dispatch]);

  const handleDeleteProduct = useCallback(
    async (orderId: string, productId: string) => {
      const order = orders.find((item) => item.id === orderId);
      const product = order?.products.find((item) => item.id === productId);

      try {
        if (product?.orderItemId) {
          await deleteOrderItem(orderId, product.orderItemId);
        }
      } catch (err) {
        console.error("Failed to delete order item", err);
        return;
      }

      dispatch(deleteProduct({ orderId, productId }));
    },
    [dispatch, orders],
  );

  return {
    orders,
    selectedOrderId,
    selectedOrder,
    orderToDelete,
    handleOpenDetails,
    handleCloseDetails,
    handleDeleteRequest,
    handleDeleteCancel,
    handleDeleteConfirm,
    handleDeleteProduct,
  };
};
