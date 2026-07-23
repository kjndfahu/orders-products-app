"use client";

import { Monitor, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { OrderProduct } from "@/types/order";
import styles from "./Orders.module.scss";

type DeleteConfirmModalProps = {
  title: string;
  titleId: string;
  products: OrderProduct[];
  onCancel: () => void;
  onConfirm: () => void;
};

export const DeleteConfirmModal = ({
  title,
  titleId,
  products,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div className={styles["orders__modal-overlay"]} onClick={onCancel}>
      <div
        className={styles["orders__modal"]}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles["orders__modal-close-button"]}
          aria-label="Закрыть"
          onClick={onCancel}
        >
          <X size={16} strokeWidth={1.75} />
        </button>

        <div className={styles["orders__modal-body"]}>
          <h2 id={titleId} className={styles["orders__modal-title"]}>
            {title}
          </h2>

          {products.length > 0 && (
            <ul className={styles["orders__modal-product-list"]}>
              {products.map((product) => (
                <li key={product.id} className={styles["orders__modal-product-preview"]}>
                  <span className={styles["orders__status-dot"]} aria-hidden="true" />

                  <div className={styles["orders__product-image"]}>
                    <Monitor size={40} strokeWidth={1.5} />
                  </div>

                  <div className={styles["orders__product-info"]}>
                    <p className={styles["orders__product-name"]}>{product.name}</p>
                    <p className={styles["orders__product-serial"]}>
                      {product.serialNumber}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles["orders__modal-footer"]}>
          <button
            ref={cancelButtonRef}
            type="button"
            className={styles["orders__modal-cancel-button"]}
            onClick={onCancel}
          >
            ОТМЕНИТЬ
          </button>

          <button
            type="button"
            className={styles["orders__modal-delete-button"]}
            onClick={onConfirm}
          >
            <Trash2 size={16} strokeWidth={1.75} />
            УДАЛИТЬ
          </button>
        </div>
      </div>
    </div>
  );
};
