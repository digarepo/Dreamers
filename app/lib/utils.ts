// app/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using clsx and tailwind-merge
 * @param inputs Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string to a human-readable format
 * @param dateString Date string or timestamp
 * @returns Formatted date string (e.g., "January 1, 2023")
 */
export function formatDate(dateString: string | number | Date): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formats a currency value
 * @param amount Currency amount
 * @param currency ISO currency code (default: "USD")
 * @returns Formatted currency string (e.g., "$1,000.00")
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a phone number to Ethiopian format
 * @param phone Phone number string
 * @returns Formatted phone number (e.g., "+251 91 123 4567")
 */
export function formatEthiopianPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(251)?(\d{2})(\d{3})(\d{4})$/);

  if (match) {
    return `+251 ${match[2]} ${match[3]} ${match[4]}`;
  }
  return phone;
}

/**
 * Truncates text to a specified length
 * @param text Input text
 * @param length Maximum length (default: 50)
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, length: number = 50): string {
  return text.length > length ? `${text.substring(0, length)}...` : text;
}

/**
 * Converts a string to title case
 * @param str Input string
 * @returns Title-cased string
 */
export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
}

/**
 * Generates a random unique ID
 * @returns Random UUID string
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Debounces a function
 * @param func Function to debounce
 * @param wait Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
