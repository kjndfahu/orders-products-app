"use client";

import { useCallback, useMemo, useState } from "react";
import { MOCK_ORDERS } from "@/data/mockOrders";
import type { Order } from "@/types/order";
import { DeleteOrderModal } from "./DeleteOrderModal";
import { OrderCard } from "./OrderCard";
import { OrderDetailPanel } from "./OrderDetailPanel";
import { OrdersHeader } from "./OrdersHeader";
import {
  confirmDeleteProduct,
  handleDeleteConfirm as confirmOrderDelete,
} from "./orderDeleteActions";
import styles from "./Orders.module.scss";

export const OrdersView = () => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [deleteOrderId, setDeleteOrderId] = useState<string | null>(null);

  const selectedOrder = useMemo(
    () => orders.find((order) => order.id === selectedOrderId) ?? null,
    [orders, selectedOrderId],
  );

  const deleteOrder = useMemo(
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
    confirmOrderDelete({ setOrders, setSelectedOrderId, setDeleteOrderId });
  }, []);

  const handleDeleteProduct = useCallback(
    (orderId: string, productId: string) => {
      setOrders((current) => confirmDeleteProduct(current, orderId, productId));
    },
    [],
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

      {deleteOrder && (
        <DeleteOrderModal
          order={deleteOrder}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};
