"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/contexts/I18nContext";
import { PRODUCT_STATUS_LABELS } from "@/types/order";
import {
  deleteProductGlobal,
  fetchOrders,
  selectOrders,
  selectOrdersStatus,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { deleteOrderItem } from "@/services/ordersApi";
import { getAllProductsFromOrders } from "@/utils/getOrderProducts";
import { ProductListRow } from "./ProductListRow";
import { ProductsHeader } from "./ProductsHeader";
import { ProductsSkeleton } from "./ProductsSkeleton";
import styles from "./Products.module.scss";
import {ALL, NO_TYPE} from "../../config"

const getProductType = (product: { groupName?: string }) => product.groupName ?? NO_TYPE;

export const ProductsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const status = useAppSelector(selectOrdersStatus);
  const { t } = useI18n();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrders());
    }
  }, [dispatch, status]);

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
      router.push(`/orders?order=${orderId}`);
    },
    [router],
  );

  const handleDelete = useCallback(
    async (productId: string) => {
      const product = products.find((p) => p.id === productId);

      if (!product?.orderItemId) {
        console.error("Product or orderItemId not found");
        return;
      }

      try {
        await deleteOrderItem(product.orderId, product.orderItemId);
        dispatch(deleteProductGlobal(productId));
      } catch (error) {
        console.error("Failed to delete product", error);
      }
    },
    [dispatch, products],
  );

  return (
    <div className={styles["products"]}>
      <ProductsHeader
        count={products.length}
        typeOptions={typeOptions}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />

      <div className={styles["products__table-scroll"]}>
        <ul className={styles["products__list"]} role="list" aria-label="Список продуктов">
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

        {status === "loading" && <ProductsSkeleton />}

        {status !== "loading" && filteredProducts.length === 0 && (
          <p className={styles["products__empty-state"]}>{t('products.empty')}</p>
        )}
      </div>
    </div>
  );
};
