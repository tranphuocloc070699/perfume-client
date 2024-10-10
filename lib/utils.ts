import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertNumToPrice(price: number, country: "VND" | "USD") {
  if (!price) return 0;
  let priceTransform = "";
  const formattedNumber = price.toLocaleString("vi-VN");
  if (country === "VND") {
    priceTransform = formattedNumber + " VND";
  } else {
    priceTransform = "$" + formattedNumber;
  }

  return priceTransform;
}

export function extractIdFromUrl(url: string) {
  const partList = url.match(/-(\d+)$/);
  if (partList && partList.length >= 1) {
    return partList[1];
  } else {
    return -1;
  }
}

export function checkIsOnServer() {
  return typeof window === "undefined";
}

export function getClientOrServerUrl() {
  if (checkIsOnServer()) {
    return process.env.BACKEND_DOMAIN;
  } else {
    return "/api";
  }
}
