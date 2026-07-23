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

const MONTHS_SHORT_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export type FormattedOrderDate = {
  secondary: string;
  primary: string;
};

export const formatOrderDate = (date: Date, locale: string = 'ru'): FormattedOrderDate => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const paddedDay = String(day).padStart(2, "0");
  const paddedMonth = String(month + 1).padStart(2, "0");

  const monthsShort = locale === 'en' ? MONTHS_SHORT_EN : MONTHS_SHORT_RU;

  return {
    secondary: `${paddedDay} / ${paddedMonth}`,
    primary: `${paddedDay} / ${monthsShort[month]} / ${year}`,
  };
};
