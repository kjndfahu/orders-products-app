"use client";

import { useEffect, useRef } from "react";
import type { OrderProduct } from "@/types/order";
import { CloseIcon, MonitorIcon, TrashIcon } from "./OrdersIcons";
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
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.modalCloseButton}
          aria-label="Закрыть"
          onClick={onCancel}
        >
          <CloseIcon />
        </button>

        <div className={styles.modalBody}>
          <h2 id={titleId} className={styles.modalTitle}>
            {title}
          </h2>

          {products.length > 0 && (
            <ul className={styles.modalProductList}>
              {products.map((product) => (
                <li key={product.id} className={styles.modalProductPreview}>
                  <span className={styles.statusDot} aria-hidden="true" />

                  <div className={styles.productImage}>
                    <MonitorIcon />
                  </div>

                  <div className={styles.productInfo}>
                    <p className={styles.productName}>{product.name}</p>
                    <p className={styles.productSerial}>
                      {product.serialNumber}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.modalFooter}>
          <button
            ref={cancelButtonRef}
            type="button"
            className={styles.modalCancelButton}
            onClick={onCancel}
          >
            ОТМЕНИТЬ
          </button>

          <button
            type="button"
            className={styles.modalDeleteButton}
            onClick={onConfirm}
          >
            <TrashIcon />
            УДАЛИТЬ
          </button>
        </div>
      </div>
    </div>
  );
};
