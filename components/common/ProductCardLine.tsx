import { convertNumToPrice } from "@/lib/utils";
import Link from "next/link";
import React, { useMemo } from "react";

interface IProductCardLineProps {
  label: string;
  value: {
    title: string;
    href?: string;
    alt?: string;
    thumbnail?: string;
    country?: string;
    type: string;
  };
}

const ProductCardLine = ({ label, value }: IProductCardLineProps) => {
  const title = useMemo(() => {
    switch (value.type) {
      case "info":
        return value.title;
      case "price":
        return convertNumToPrice(Number(value.title), value.country || "VN");
      default:
        break;
    }
  }, [value.title]);

  return (
    <div className="flex items-start gap-3 text-base">
      <span className="font-light text-gray-600">{label}</span>
      <Link
        href={value.href || ""}
        className={`font-medium flex-1 text-slate-600 whitespace-nowrap ${
          !value.href ? "pointer-events-none" : "hover:underline"
        }`}
        aria-disabled={!value.href}
      >
        {title}
      </Link>
    </div>
  );
};

export default ProductCardLine;
