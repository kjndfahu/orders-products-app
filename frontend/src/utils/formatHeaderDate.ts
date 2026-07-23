export const formatHeaderDate = (date: Date, locale: string = 'ru'): string =>
  new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
