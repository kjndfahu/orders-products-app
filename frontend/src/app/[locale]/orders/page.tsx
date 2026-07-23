import dynamic from "next/dynamic";
import { OrdersSkeleton } from "@/components/Orders/OrdersSkeleton";

const OrdersView = dynamic(
  () => import("@/components/Orders").then((mod) => mod.OrdersView),
  {
    loading: () => <OrdersSkeleton />,
  },
);

export default function OrdersPage() {
  return <OrdersView />;
}
