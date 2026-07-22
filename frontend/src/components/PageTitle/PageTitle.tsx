import type { ReactNode } from "react";

type PageTitleProps = {
  title: ReactNode;
  count: number;
  className?: string;
  countClassName?: string;
};

export const PageTitle = ({
  title,
  count,
  className,
  countClassName,
}: PageTitleProps) => (
  <h1 className={className}>
    {title}{" "}
    <span className={countClassName}>
      / {count}
    </span>
  </h1>
);

