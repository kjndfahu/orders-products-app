"use client";

import { Plus, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useI18n } from "@/contexts/I18nContext";
import type { Order } from "@/types/order";
import { DeleteProductModal } from "../Products/DeleteProductModal";
import { OrderProductRow } from "./OrderProductRow";
import { useOrderDetailPanel } from "@/utils/orderDetailPanelHandlers";
import { lockScroll } from "@/utils/scrollLock";
import styles from "./Orders.module.scss";

type OrderDetailPanelProps = {
  order: Order;
  onClose: () => void;
  onDeleteProduct: (productId: string) => void;
};

export const OrderDetailPanel = ({
  order,
  onClose,
  onDeleteProduct,
}: OrderDetailPanelProps) => {
  const { t } = useI18n();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const {
    productToDelete,
    confirmDeleteProduct,
    handleDeleteCancel,
    handleDeleteConfirm,
    handleWrapperClick,
  } = useOrderDetailPanel({
    products: order.products,
    onClose,
    onDeleteProduct,
  });

  useEffect(() => {
    closeButtonRef.current?.focus();

    const unlockScroll = lockScroll();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !productToDelete) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      unlockScroll();
    };
  }, [productToDelete, onClose]);

  return (
    <>
      <div
        className={styles["orders__panel-wrapper"]}
        onClick={handleWrapperClick}
      >
        <aside
          className={styles["orders__panel"]}
          role="dialog"
          aria-modal="false"
          aria-labelledby={`order-panel-title-${order.id}`}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className={styles["orders__panel-close-button"]}
            aria-label="Закрыть панель"
            onClick={onClose}
          >
            <X size={16} strokeWidth={1.75} />
          </button>

          <header className={styles["orders__panel-header"]}>
            <h2
              id={`order-panel-title-${order.id}`}
              className={styles["orders__panel-title"]}
            >
              {order.title}
            </h2>

            <button type="button" className={styles["orders__add-product-button"]}>
              <span className={styles["orders__add-product-icon"]}>
                <Plus size={14} strokeWidth={2} />
              </span>
              {t("orders.addProduct")}
            </button>
          </header>

          <ul className={styles["orders__product-list"]} role="list">
            {order.products.map((product) => (
              <OrderProductRow
                key={product.id}
                product={product}
                onDelete={confirmDeleteProduct}
              />
            ))}
          </ul>
        </aside>
      </div>

      {productToDelete && (
        <DeleteProductModal
          product={productToDelete}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
};
