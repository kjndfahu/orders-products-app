export const pluralizeProducts = (count: number): string => {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return "Продуктов";
  }

  if (mod10 === 1) {
    return "Продукт";
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return "Продукта";
  }

  return "Продуктов";
};
