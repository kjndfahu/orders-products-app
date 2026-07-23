import type { Dispatch, SetStateAction } from "react";
import type { Order } from "@/types/order";

export type DeleteOrderResult = {
  orders: Order[];
  shouldCloseSelection: boolean;
};

export const confirmDeleteOrder = (
  orders: Order[],
  orderId: string,
): DeleteOrderResult => ({
  orders: orders.filter((order) => order.id !== orderId),
  shouldCloseSelection: true,
});

export const confirmDeleteProduct = (
  orders: Order[],
  orderId: string,
  productId: string,
): Order[] =>
  orders.map((order) => {
    if (order.id !== orderId) {
      return order;
    }

    const products = order.products.filter((product) => product.id !== productId);

    return {
      ...order,
      products,
      productCount: products.length,
    };
  });

type OrderDeleteStateSetters = {
  setOrders: Dispatch<SetStateAction<Order[]>>;
  setSelectedOrderId: Dispatch<SetStateAction<string | null>>;
  setDeleteOrderId: Dispatch<SetStateAction<string | null>>;
};

export const handleDeleteConfirm = ({
  setOrders,
  setSelectedOrderId,
  setDeleteOrderId,
}: OrderDeleteStateSetters) => {
  setDeleteOrderId((currentDeleteOrderId) => {
    if (!currentDeleteOrderId) {
      return null;
    }

    setOrders((currentOrders) =>
      confirmDeleteOrder(currentOrders, currentDeleteOrderId).orders,
    );
    setSelectedOrderId((current) =>
      current === currentDeleteOrderId ? null : current,
    );

    return null;
  });
};
