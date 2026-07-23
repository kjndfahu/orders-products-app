"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/contexts/I18nContext";
import {
  fetchOrders,
  selectOrders,
  selectOrdersStatus,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { getAllProductsFromOrders } from "@/utils/getOrderProducts";
import { createProductDeleteHandlers } from "@/utils/productDeleteHandlers";
import { DeleteConfirmModal } from "@/components/Shared";
import { ProductListRow } from "./ProductListRow";
import { ProductsHeader } from "./ProductsHeader";
import { ProductsSkeleton } from "./ProductsSkeleton";
import styles from "./Products.module.scss";
import { ALL, NO_TYPE } from "../../config";

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
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const { handleDeleteRequest, handleDeleteCancel, handleDeleteConfirm } =
    createProductDeleteHandlers(
      { pendingDeleteId, setPendingDeleteId },
      dispatch,
      products,
    );

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

  const pendingDeleteProduct = useMemo(() => {
    if (!pendingDeleteId) return null;
    const p = products.find((item) => item.id === pendingDeleteId);
    if (!p) return null;
    return {
      id: p.id,
      name: p.name,
      serialNumber: p.serialNumber,
      status: p.status,
    };
  }, [pendingDeleteId, products]);

  const handleOpenOrder = useCallback(
    (orderId: string) => {
      router.push(`/orders?order=${orderId}`);
    },
    [router],
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
              statusLabel={t(`products.status.${product.status}`)}
              onOpenOrder={handleOpenOrder}
              onDelete={handleDeleteRequest}
            />
          ))}
        </ul>

        {status === "loading" && <ProductsSkeleton />}

        {status !== "loading" && filteredProducts.length === 0 && (
          <p className={styles["products__empty-state"]}>{t("products.empty")}</p>
        )}
      </div>

      {pendingDeleteProduct && (
        <DeleteConfirmModal
          title={t("products.deleteConfirmMessage")}
          titleId={`delete-product-title-${pendingDeleteProduct.id}`}
          products={[pendingDeleteProduct]}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};
