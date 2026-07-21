type IconProps = {
  className?: string;
};

export const PlusIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M7 1v12M1 7h12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const MenuLinesIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M1 1h14M1 6h14M1 11h14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const TrashIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="16"
    height="18"
    viewBox="0 0 16 18"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 4h12M5 4V2.5A1.5 1.5 0 0 1 6.5 1h3A1.5 1.5 0 0 1 11 2.5V4m2 0v12.5A1.5 1.5 0 0 1 11.5 18h-7A1.5 1.5 0 0 1 3 16.5V4h10Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 8v5M9.5 8v5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const CloseIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M1 1l10 10M11 1 1 11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const ChevronRightIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="8"
    height="14"
    viewBox="0 0 8 14"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M1 1l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MonitorIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="40"
    height="36"
    viewBox="0 0 40 36"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="2"
      y="3"
      width="36"
      height="24"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M14 31h12M20 27v4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <rect x="6" y="7" width="28" height="16" rx="1" fill="currentColor" opacity="0.15" />
  </svg>
);
