/**
 * Business and Cart Calculations
 */

export function calculateCartTotals(items, coupon = null, standardShippingFee = 1500, freeShippingThreshold = 50000) {
  const subtotal = items.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  // Shipping
  const isFreeShipping = subtotal >= freeShippingThreshold || items.length === 0;
  const shippingFee = isFreeShipping ? 0 : standardShippingFee;

  // Coupon discount
  let discountAmount = 0;
  if (coupon && coupon.status === 'active') {
    if (!coupon.minSpend || subtotal >= coupon.minSpend) {
      if (coupon.discountType === 'percentage') {
        discountAmount = Math.round((subtotal * coupon.value) / 100);
      } else if (coupon.discountType === 'fixed') {
        discountAmount = Math.min(coupon.value, subtotal);
      }
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return {
    subtotal,
    shippingFee,
    discountAmount,
    grandTotal,
    totalQuantity,
    isFreeShipping
  };
}

export function generateOrderId() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `BB-${new Date().getFullYear()}-${random}`;
}
