import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Order } from "@/types/order";
import { fetchOrders as fetchOrdersApi } from "@/services/ordersApi";

export type OrdersState = {
  orders: Order[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: OrdersState = {
  orders: [],
  status: "idle",
  error: null,
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const orders = await fetchOrdersApi();
    return orders;
  },
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load orders";
      });
  },
});

export const { deleteOrder, deleteProduct, deleteProductGlobal } =
  ordersSlice.actions;

export const selectOrders = (state: { orders: OrdersState }) => state.orders.orders;
export const selectOrdersStatus = (state: { orders: OrdersState }) =>
  state.orders.status;
export const selectOrdersError = (state: { orders: OrdersState }) =>
  state.orders.error;

export default ordersSlice.reducer;
