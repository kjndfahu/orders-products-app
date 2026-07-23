"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const OrdersSkeleton = () => {
  return (
    <div style={{ padding: "32px 24px 56px", margin: "-32px -24px -56px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
        <Skeleton width={36} height={36} circle baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
        <Skeleton width={200} height={22} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
      </div>

      <div style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(180px, 450px) auto auto auto auto",
              gap: "20px",
              padding: "10px 18px",
              borderRadius: "4px",
            }}
          >
            <Skeleton width="100%" height={20} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
            <Skeleton width={56} height={28} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
            <Skeleton width={94} height={30} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
            <Skeleton width={112} height={30} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
            <Skeleton width={24} height={24} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
          </div>
        ))}
      </div>
    </div>
  );
};
