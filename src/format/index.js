export const formatPrice = (price, currency = "SOL") => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  });
};
