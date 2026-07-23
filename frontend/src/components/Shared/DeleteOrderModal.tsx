"use client";

import { useI18n } from "@/contexts/I18nContext";
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
}: DeleteOrderModalProps) => {
  const { t } = useI18n();

  return (
    <DeleteConfirmModal
      title={t("orders.deleteConfirm")}
      titleId={`delete-order-title-${order.id}`}
      products={order.products}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};
