const usdFormatter = new Intl.NumberFormat("ru-RU", {
  maximumFractionDigits: 0,
});

const uahFormatter = new Intl.NumberFormat("ru-RU", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatUsd = (amount: number): string =>
  `${usdFormatter.format(amount)} $`;

export const formatUah = (amount: number): string =>
  `${uahFormatter.format(amount)} UAH`;
