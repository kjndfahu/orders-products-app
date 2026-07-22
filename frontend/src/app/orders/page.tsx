import dynamic from "next/dynamic";

const OrdersView = dynamic(
  () => import("@/components/Orders").then((mod) => mod.OrdersView),
  {
    loading: () => <p>Загрузка...</p>,
  },
);

export default function OrdersPage() {
  return <OrdersView />;
}
