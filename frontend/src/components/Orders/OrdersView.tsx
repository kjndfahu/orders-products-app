"use client";

import { useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";
import {
  fetchOrders,
  selectOrdersError,
  selectOrdersStatus,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { DeleteOrderModal } from "@/components/Shared";
import { OrderCard } from "./OrderCard";
import { OrderDetailPanel } from "./OrderDetailPanel";
import { OrdersHeader } from "./OrdersHeader";
import { OrdersSkeleton } from "./OrdersSkeleton";
import { useOrdersView } from "./useOrdersView";
import styles from "./Orders.module.scss";

export const OrdersView = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectOrdersStatus);
  const error = useAppSelector(selectOrdersError);
  const { t } = useI18n();

  const {
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
  } = useOrdersView();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrders());
    }
  }, [dispatch, status]);

  return (
    <div className={styles.orders}>
      <OrdersHeader count={orders.length} />

      {status === "loading" && <OrdersSkeleton />}

      {status === "failed" && error && (
        <p className={styles["orders__empty-state"]}>{t("orders.error")}: {error}</p>
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
