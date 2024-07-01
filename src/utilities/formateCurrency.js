export function formatCurrency(price, locale = "en-US", currency = "BDT") {
  return price?.toLocaleString(locale, {
    style: "currency",
    currency,
  });
}
