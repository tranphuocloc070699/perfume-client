import React from "react";
import { twMerge } from "tailwind-merge";
import Typography from "@/components/ui/typography";

type Props = {
  className?: string;
  label: string;
  value: string;
}
const ProductDetailBadge = ({ className, label, value }: Props) => {
  return (
    <div className={twMerge(` ${className}`)} component-name="ProductDetailBadge">
      <div className={"flex items-center gap-1 bg-gray-100 rounded-full text-nowrap px-4 py-1 "}>
        <Typography.Text className={"text-gray-500 text-xs"}>{label}</Typography.Text>
        <Typography.Text className={"text-xs"}>{value}</Typography.Text>
      </div>
    </div>
  );
};

export default ProductDetailBadge;