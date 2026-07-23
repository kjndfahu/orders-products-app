const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day} / ${month} / ${year}`;
};

export type WarrantyDateFormats = {
  pretty: string;
  iso: string;
};

export const formatWarrantyRange = (from?: string, to?: string) => ({
  from: from ? ({ pretty: formatDate(from), iso: from } satisfies WarrantyDateFormats) : null,
  to: to ? ({ pretty: formatDate(to), iso: to } satisfies WarrantyDateFormats) : null,
});
