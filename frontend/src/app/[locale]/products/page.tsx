import dynamic from "next/dynamic";
import { ProductsSkeleton } from "@/components/Products/ProductsSkeleton";

const ProductsView = dynamic(
  () =>
    import("@/components/Products/ProductsView").then(
      (mod) => mod.ProductsView,
    ),
  {
    loading: () => <ProductsSkeleton />,
  },
);

export default function ProductsPage() {
  return <ProductsView />;
}
