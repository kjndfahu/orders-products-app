"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useI18n } from "@/contexts/I18nContext";
import {
  deleteOrder as deleteOrderAction,
  deleteProduct,
  fetchOrders,
  selectOrders,
  selectOrdersError,
  selectOrdersStatus,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { deleteOrderItem } from "@/services/ordersApi";
import { DeleteOrderModal } from "./DeleteOrderModal";
import { OrderCard } from "./OrderCard";
import { OrderDetailPanel } from "./OrderDetailPanel";
import { OrdersHeader } from "./OrdersHeader";
import { OrdersSkeleton } from "./OrdersSkeleton";
import styles from "./Orders.module.scss";

export const OrdersView = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const status = useAppSelector(selectOrdersStatus);
  const error = useAppSelector(selectOrdersError);
  const { t } = useI18n();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [deleteOrderId, setDeleteOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrders());
    }
  }, [dispatch, status]);

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
      } catch (error) {
        console.error("Failed to delete order item", error);
        return;
      }

      dispatch(deleteProduct({ orderId, productId }));
    },
    [dispatch, orders],
  );

  return (
    <div className={styles.orders}>
      <OrdersHeader count={orders.length} />

      {status === "loading" && <OrdersSkeleton />}

      {status === "failed" && error && (
        <p className={styles["orders__empty-state"]}>{t('orders.error')}: {error}</p>
      )}

      <div className={styles["orders__layout"]}>
        <ul
          className={`${styles["orders__list"]} ${selectedOrder ? styles["orders__list--with-panel"] : ""}`}
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
