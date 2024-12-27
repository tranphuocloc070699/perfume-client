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

export function convertToSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .trim();
}

export function formatDate(timestamp: string, type: "Ngày DD-MM-YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD"): string {
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  switch (type) {
    case "Ngày DD-MM-YYYY":
      return `Ngày ${day}-${month}-${year}`;
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    default:
      return "";
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
