export function priceFormat(price) {
  return Intl.NumberFormat().format(price / 100);
}
