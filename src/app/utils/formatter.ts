export function formatDate(date: Date, locale: string = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
}

export function formatCurrency(
  amount: number,
  currencyCode: string,
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits:
      currencyCode === "JPY" || currencyCode === "KRW" ? 0 : 2,
  }).format(amount);
}

export function formatTime(date: Date, locale: string = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: locale !== "de-DE" && locale !== "fr-FR", // Some locales prefer 24-hour time
  }).format(date);
}
