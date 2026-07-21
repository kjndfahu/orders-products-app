"use client";

import type { OrderProduct } from "@/types/order";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

type DeleteProductModalProps = {
  product: OrderProduct;
  onCancel: () => void;
  onConfirm: () => void;
};

export const DeleteProductModal = ({
  product,
  onCancel,
  onConfirm,
}: DeleteProductModalProps) => (
  <DeleteConfirmModal
    title="Вы уверены, что хотите удалить этот товар?"
    titleId={`delete-product-title-${product.id}`}
    products={[product]}
    onCancel={onCancel}
    onConfirm={onConfirm}
  />
);
