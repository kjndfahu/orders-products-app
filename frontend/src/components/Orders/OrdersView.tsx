"use client";

import { useCallback, useMemo, useState } from "react";
import {
  deleteOrder as deleteOrderAction,
  deleteProduct,
  selectOrders,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { DeleteOrderModal } from "./DeleteOrderModal";
import { OrderCard } from "./OrderCard";
import { OrderDetailPanel } from "./OrderDetailPanel";
import { OrdersHeader } from "./OrdersHeader";
import styles from "./Orders.module.scss";

export const OrdersView = () => {
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
    (orderId: string, productId: string) => {
      dispatch(deleteProduct({ orderId, productId }));
    },
    [dispatch],
  );

  return (
    <div className={styles.orders}>
      <OrdersHeader count={orders.length} />

      <div className={styles.layout}>
        <ul
          className={`${styles.list} ${selectedOrder ? styles.listWithPanel : ""}`}
          aria-label="Список приходов"
        >
          {orders.map((order) => (
            <li key={order.id}>
              <OrderCard
                order={order}
                isActive={order.id === selectedOrderId}
                isCompact={Boolean(selectedOrder)}
                onOpenDetails={handleOpenDetails}
                onDelete={handleDeleteRequest}
              />
            </li>
          ))}
        </ul>

        {selectedOrder && (
          <OrderDetailPanel
            order={selectedOrder}
            onClose={handleCloseDetails}
            onDeleteProduct={(productId) =>
              handleDeleteProduct(selectedOrder.id, productId)
            }
          />
        )}
      </div>

      {orderToDelete && (
        <DeleteOrderModal
          order={orderToDelete}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};
