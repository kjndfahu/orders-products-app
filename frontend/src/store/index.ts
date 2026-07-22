export { store } from "./store";
export type { RootState, AppDispatch } from "./store";
export { useAppDispatch, useAppSelector } from "./hooks";
export {
  deleteOrder,
  deleteProduct,
  deleteProductGlobal,
  fetchOrders,
  selectOrders,
  selectOrdersError,
  selectOrdersStatus,
} from "./ordersSlice";

