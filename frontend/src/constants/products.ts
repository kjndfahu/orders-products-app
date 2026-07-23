export const ALL = "all";
export const NO_TYPE = "no_type";

export const STATUS_VARIANTS = {
  free: {
    dot: "dotFree",
    text: "statusFree",
  },
  repair: {
    dot: "dotRepair",
    text: "statusRepair",
  },
} as const;

export const CONDITION_LABEL = {
  new: "new",
  used: "used",
} as const;
