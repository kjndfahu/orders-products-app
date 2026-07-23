"use client";

import { Plus, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Order } from "@/types/order";
import { DeleteProductModal } from "./DeleteProductModal";
import { OrderProductRow } from "./OrderProductRow";
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  const deleteProduct = useMemo(
    () => order.products.find((product) => product.id === deleteProductId) ?? null,
    [order.products, deleteProductId],
  );

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !deleteProductId) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [deleteProductId, onClose]);

  const handleDeleteCancel = () => {
    setDeleteProductId(null);
  };

  const handleDeleteConfirm = () => {
    if (!deleteProductId) {
      return;
    }

    onDeleteProduct(deleteProductId);
    setDeleteProductId(null);
  };

  return (
    <>
      <div
        className={styles["orders__panel-wrapper"]}
        onClick={onClose}
      >
        <aside
          className={styles["orders__panel"]}
          role="dialog"
          aria-modal="true"
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
              Добавить продукт
            </button>
          </header>

          <ul className={styles["orders__product-list"]} role="list">
            {order.products.map((product) => (
              <OrderProductRow
                key={product.id}
                product={product}
                onDelete={setDeleteProductId}
              />
            ))}
          </ul>
        </aside>
      </div>

      {deleteProduct && (
        <DeleteProductModal
          product={deleteProduct}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
};
