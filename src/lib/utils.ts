import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAmount = (amount: number) => {
  if (Math.abs(amount) < 1e3) return amount.toFixed(2);
  if (Math.abs(amount) >= 1e3 && Math.abs(amount) < 1e6)
    return `$${(amount / 1e3).toFixed(1)}K`;
  if (Math.abs(amount) >= 1e6 && Math.abs(amount) < 1e9)
    return `$${(amount / 1e6).toFixed(1)}M`;
  if (Math.abs(amount) >= 1e9 && Math.abs(amount) < 1e12)
    return `$${(amount / 1e9).toFixed(1)}B`;
  if (Math.abs(amount) >= 1e12) return `$${(amount / 1e12).toFixed(1)}T`;
};
