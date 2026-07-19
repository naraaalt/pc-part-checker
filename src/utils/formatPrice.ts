/**
 * Format a number as a USD price string with two decimal places.
 * Used everywhere that displays a price to avoid divergent formatting.
 */
export const formatPrice = (n: number): string => "$" + n.toFixed(2);
