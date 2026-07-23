"use client";

import { useI18n } from "@/contexts/I18nContext";
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
}: DeleteProductModalProps) => {
  const { t } = useI18n();

  return (
    <DeleteConfirmModal
      title={t('products.deleteConfirmMessage')}
      titleId={`delete-product-title-${product.id}`}
      products={[product]}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};
