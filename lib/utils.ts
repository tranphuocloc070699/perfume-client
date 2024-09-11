import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertNumToPrice(price: number, country: string) {
  let priceTransform = "";
  const formattedNumber = price.toLocaleString("vi-VN");
  if (country === "VN") {
    priceTransform = formattedNumber + " VND";
  } else {
    priceTransform = "$" + formattedNumber;
  }

  return priceTransform;
}
