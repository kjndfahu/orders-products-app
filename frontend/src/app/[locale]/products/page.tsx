import dynamic from "next/dynamic";

const ProductsView = dynamic(
  () =>
    import("@/components/Products/ProductsView").then(
      (mod) => mod.ProductsView,
    ),
  {
    loading: () => <p>Загрузка...</p>,
  },
);

export default function ProductsPage() {
  return <ProductsView />;
}
