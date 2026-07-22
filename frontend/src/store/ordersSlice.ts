import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { MOCK_ORDERS } from "@/data/mockOrders";
import type { Order } from "@/types/order";

export type OrdersState = {
  orders: Order[];
};

const initialState: OrdersState = {
  orders: MOCK_ORDERS,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
    },
    deleteProduct: (
      state,
      action: PayloadAction<{ orderId: string; productId: string }>,
    ) => {
      const { orderId, productId } = action.payload;
      const order = state.orders.find((item) => item.id === orderId);

      if (!order) {
        return;
      }

      order.products = order.products.filter((product) => product.id !== productId);
      order.productCount = order.products.length;
    },
    deleteProductGlobal: (state, action: PayloadAction<string>) => {
      const productId = action.payload;

      state.orders.forEach((order) => {
        const nextProducts = order.products.filter(
          (product) => product.id !== productId,
        );

        if (nextProducts.length !== order.products.length) {
          order.products = nextProducts;
          order.productCount = order.products.length;
        }
      });
    },
  },
});

export const { deleteOrder, deleteProduct, deleteProductGlobal } =
  ordersSlice.actions;

export const selectOrders = (state: { orders: OrdersState }) => state.orders.orders;

export default ordersSlice.reducer;
