"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ProductsSkeleton = () => {
  return (
    <div style={{ padding: "32px 24px 56px", margin: "-32px -24px -56px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "32px", marginBottom: "28px" }}>
        <Skeleton width={200} height={22} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
        <Skeleton width={160} height={36} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
      </div>

      <div
        style={{
          background: "var(--surface)",
          borderRadius: "4px",
          padding: "16px 24px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "12px 48px minmax(220px, 1.6fr) 90px 190px 70px 130px 100px 90px minmax(200px, 1.4fr) 110px 40px",
                gap: "20px",
                alignItems: "center",
                borderBottom: "1px solid var(--border)",
                paddingBottom: "16px",
              }}
            >
              <Skeleton width={8} height={8} circle baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
              <Skeleton width={40} height={40} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
              <Skeleton width="100%" height={20} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
              <Skeleton width={90} height={20} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
              <Skeleton width={190} height={20} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
              <Skeleton width={70} height={20} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
              <Skeleton width={130} height={20} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
              <Skeleton width={100} height={20} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
              <Skeleton width={90} height={20} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
              <Skeleton width={200} height={20} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
              <Skeleton width={110} height={20} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
              <Skeleton width={32} height={32} baseColor="var(--surface-muted)" highlightColor="var(--surface)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
