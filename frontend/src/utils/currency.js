/**
 * Currency and Localization utility for BlueBells
 * Default display currency: Pakistani Rupees (PKR / Rs.)
 */

export const CURRENCY_CONFIG = {
  code: 'PKR',
  symbol: 'Rs.',
  locale: 'en-PK'
};

/**
 * Format a number as PKR currency
 * e.g. 495000 -> "Rs. 495,000"
 */
export function formatPrice(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return 'Rs. 0';
  }
  const numeric = Math.round(Number(amount));
  return `Rs. ${numeric.toLocaleString('en-US')}`;
}

export function formatPKR(amount) {
  return formatPrice(amount);
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
