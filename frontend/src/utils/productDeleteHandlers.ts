import type { Dispatch, SetStateAction } from "react";
import { deleteOrderItem } from "@/services/ordersApi";
import type { AppDispatch } from "@/store";
import { deleteProductGlobal } from "@/store";

export type ProductDeleteState = {
  pendingDeleteId: string | null;
  setPendingDeleteId: Dispatch<SetStateAction<string | null>>;
};

export const createProductDeleteHandlers = (
  state: ProductDeleteState,
  dispatch: AppDispatch,
  products: Array<{ id: string; orderItemId?: string | number; orderId: string }>,
) => {
  const handleDeleteRequest = (productId: string) => {
    state.setPendingDeleteId(productId);
  };

  const handleDeleteCancel = () => {
    state.setPendingDeleteId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!state.pendingDeleteId) return;

    const product = products.find((p) => p.id === state.pendingDeleteId);
    const productIdToDelete = state.pendingDeleteId;
    
    state.setPendingDeleteId(null);

    if (!product?.orderItemId) {
      console.error("Product or orderItemId not found");
      return;
    }

    // Сначала обновляем стейт (оптимистичное обновление)
    dispatch(deleteProductGlobal(productIdToDelete));

    // Потом отправляем запрос на бекенд
    try {
      await deleteOrderItem(product.orderId, Number(product.orderItemId));
    } catch (error) {
      console.error("Failed to delete product", error);
      // Можно добавить откат изменений, если нужно
    }
  };

  return {
    handleDeleteRequest,
    handleDeleteCancel,
    handleDeleteConfirm,
  };
};
