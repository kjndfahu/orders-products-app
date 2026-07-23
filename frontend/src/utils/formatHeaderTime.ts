export const formatHeaderTime = (date: Date, locale: string = 'ru'): string =>
  date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
