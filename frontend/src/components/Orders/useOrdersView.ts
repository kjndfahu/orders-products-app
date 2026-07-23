"use client";

import { useCallback, useMemo, useState } from "react";
import {
  deleteOrder as deleteOrderAction,
  deleteProduct,
  selectOrders,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { deleteOrderItem, deleteOrder as deleteOrderApi } from "@/services/ordersApi";

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

  const handleDeleteConfirm = useCallback(async () => {
    const currentDeleteOrderId = deleteOrderId;
    
    if (!currentDeleteOrderId) {
      return;
    }

    // Сначала обновляем стейт (оптимистичное обновление)
    dispatch(deleteOrderAction(currentDeleteOrderId));
    setSelectedOrderId((current) =>
      current === currentDeleteOrderId ? null : current,
    );
    setDeleteOrderId(null);

    // Потом отправляем запрос на бекенд
    try {
      await deleteOrderApi(currentDeleteOrderId);
    } catch (error) {
      console.error("Failed to delete order", error);
      // Можно добавить откат изменений, если нужно
    }
  }, [dispatch, deleteOrderId]);

  const handleDeleteProduct = useCallback(
    async (orderId: string, productId: string) => {
      const order = orders.find((item) => item.id === orderId);
      const product = order?.products.find((item) => item.id === productId);

      // Сначала обновляем стейт (оптимистичное обновление)
      dispatch(deleteProduct({ orderId, productId }));

      // Потом отправляем запрос на бекенд
      try {
        if (product?.orderItemId) {
          await deleteOrderItem(orderId, product.orderItemId);
        }
      } catch (err) {
        console.error("Failed to delete order item", err);
        // Можно добавить откат изменений, если нужно
      }
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
