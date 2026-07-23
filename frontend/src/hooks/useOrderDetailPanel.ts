"use client";

import { useCallback, useMemo, useState } from "react";
import type { OrderProduct } from "@/types/order";
import { PANEL_MODAL_BREAKPOINT } from "@/constants/orders";

type UseOrderDetailPanelProps = {
  products: OrderProduct[];
  onClose: () => void;
  onDeleteProduct: (productId: string) => void;
};

export const useOrderDetailPanel = ({
  products,
  onClose,
  onDeleteProduct,
}: UseOrderDetailPanelProps) => {
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  const productToDelete = useMemo(
    () => products.find((p) => p.id === deleteProductId) ?? null,
    [products, deleteProductId],
  );

  const confirmDeleteProduct = useCallback((productId: string) => {
    setDeleteProductId(productId);
  }, []);

  const handleDeleteCancel = useCallback(() => {
    setDeleteProductId(null);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (!deleteProductId) return;
    onDeleteProduct(deleteProductId);
    setDeleteProductId(null);
  }, [deleteProductId, onDeleteProduct]);

  const handleWrapperClick = useCallback(() => {
    if (window.innerWidth <= PANEL_MODAL_BREAKPOINT) {
      onClose();
    }
  }, [onClose]);

  return {
    productToDelete,
    confirmDeleteProduct,
    handleDeleteCancel,
    handleDeleteConfirm,
    handleWrapperClick,
  };
};
