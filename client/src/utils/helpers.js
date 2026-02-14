export function formatPrice(price) {
  if (price === null || price === undefined) return "₹ 0";

  const num = Number(price);

  if (Number.isNaN(num)) return "₹ 0";

  return `₹ ${num.toFixed(2)}`;
}

export function truncateText(text, maxLength = 60) {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength - 3) + "...";
}
