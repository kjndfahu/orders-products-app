"use client";

import type { Order } from "@/types/order";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

type DeleteOrderModalProps = {
  order: Order;
  onCancel: () => void;
  onConfirm: () => void;
};

export const DeleteOrderModal = ({
  order,
  onCancel,
  onConfirm,
}: DeleteOrderModalProps) => (
  <DeleteConfirmModal
    title="Вы уверены, что хотите удалить этот приход?"
    titleId={`delete-order-title-${order.id}`}
    products={order.products}
    onCancel={onCancel}
    onConfirm={onConfirm}
  />
);
