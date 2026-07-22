"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PRODUCT_STATUS_LABELS } from "@/types/order";
import {
  deleteProductGlobal,
  selectOrders,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { getAllProductsFromOrders } from "./getOrderProducts";
import { ProductListRow } from "./ProductListRow";
import { ProductsHeader } from "./ProductsHeader";
import styles from "./Products.module.scss";

const ALL = "Все";
const NO_TYPE = "Без типа";

const getProductType = (product: { groupName?: string }) => product.groupName ?? NO_TYPE;

export const ProductsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);

  // Products page reads from the same orders data as the Orders screen —
  // every product shown here belongs to some order.
  const products = useMemo(() => getAllProductsFromOrders(orders), [orders]);

  const [selectedType, setSelectedType] = useState(ALL);

  const typeOptions = useMemo(
    () => [ALL, ...Array.from(new Set(products.map(getProductType)))],
    [products],
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        return selectedType === ALL || getProductType(product) === selectedType;
      }),
    [products, selectedType],
  );

  const handleOpenOrder = useCallback(
    (orderId: string) => {
      // Adjust this route to wherever the Orders screen lives in your app.
      router.push(`/orders?order=${orderId}`);
    },
    [router],
  );

  const handleDelete = useCallback((productId: string) => {
    dispatch(deleteProductGlobal(productId));
  }, [dispatch]);

  return (
    <div className={styles.products}>
      <ProductsHeader
        count={products.length}
        typeOptions={typeOptions}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />

      <div className={styles.tableScroll}>
        <ul className={styles.list} role="list" aria-label="Список продуктов">
          {filteredProducts.map((product) => (
            <ProductListRow
              key={product.id}
              product={product}
              statusLabel={PRODUCT_STATUS_LABELS[product.status]}
              onOpenOrder={handleOpenOrder}
              onDelete={handleDelete}
            />
          ))}
        </ul>

        {filteredProducts.length === 0 && (
          <p className={styles.emptyState}>Продукты не найдены</p>
        )}
      </div>
    </div>
  );
};
