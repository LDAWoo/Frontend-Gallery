export const formatPrice = (price, currency = "SQL") => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  });
};
