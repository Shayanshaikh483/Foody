/**
 * Formats a numerical amount into Pakistani Rupees (PKR) standard presentation.
 * Example: 850 -> "Rs. 850", 1250 -> "Rs. 1,250", 2000 -> "Rs. 2,000"
 */
export function formatPKR(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return 'Rs. 0';
  return `Rs. ${Math.round(Number(amount)).toLocaleString('en-US')}`;
}

export default formatPKR;
