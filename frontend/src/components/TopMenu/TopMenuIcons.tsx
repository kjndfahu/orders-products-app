type IconProps = {
  className?: string;
};

export const ShieldLogoIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="28"
    height="32"
    viewBox="0 0 28 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M14 0L27 5.5V15.5C27 23.5 21.5 29.5 14 32C6.5 29.5 1 23.5 1 15.5V5.5L14 0Z"
      fill="currentColor"
    />
    <circle cx="14" cy="12" r="3.5" fill="white" />
    <path
      d="M9.5 20.5C9.5 17.5 11.5 16 14 16C16.5 16 18.5 17.5 18.5 20.5V22H9.5V20.5Z"
      fill="white"
    />
  </svg>
);

export const ClockIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M9 5V9L11.5 11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
