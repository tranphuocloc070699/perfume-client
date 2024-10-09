import { convertNumToPrice } from "@/lib/utils";
import Link from "next/link";
import React, { useMemo } from "react";

export interface IProductCardLineProps {
  label: string;
  value: string | number;
  link?: string;
}

const ProductCardLine = ({ label, value, link }: IProductCardLineProps) => {
  return (
    <div className="flex items-start gap-3 text-base">
      <span className="font-light text-gray-600">{label}</span>
      <Link
        href={link || ""}
        className={`font-medium flex-1 text-slate-600 whitespace-nowrap ${
          !link ? "pointer-events-none" : "hover:underline"
        }`}
        aria-disabled={!link}
      >
        {value}
      </Link>
    </div>
  );
};

export default ProductCardLine;
