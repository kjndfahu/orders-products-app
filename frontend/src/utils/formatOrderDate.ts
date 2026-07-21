const MONTHS_SHORT_RU = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
] as const;

export type FormattedOrderDate = {
  secondary: string;
  primary: string;
};

export const formatOrderDate = (date: Date): FormattedOrderDate => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const paddedDay = String(day).padStart(2, "0");
  const paddedMonth = String(month + 1).padStart(2, "0");

  return {
    secondary: `${paddedDay} / ${paddedMonth}`,
    primary: `${paddedDay} / ${MONTHS_SHORT_RU[month]} / ${year}`,
  };
};
