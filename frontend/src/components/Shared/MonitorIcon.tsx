type MonitorIconProps = {
  className?: string;
};

export const MonitorIcon = ({ className }: MonitorIconProps) => (
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
