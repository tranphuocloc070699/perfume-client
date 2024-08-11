import Link from "next/link";
import React from "react";

interface IProductCardLineProps {
  label: string;
  value: {
    title: string;
    href?: string;
    alt?: string;
    thumbnail?: string;
  };
}

const ProductCardLine = ({ label, value }: IProductCardLineProps) => {
  return (
    <div>
      {value.href ? (
        <Link
          href={value.href}
          className="font-medium  text-blue-700 hover:underline"
        >
          {productPrice(item.value.title, item.value.country)}
        </Link>
      ) : (
        <span className="font-medium">
          {productPrice(item.value.title, item.value.country)}
        </span>
      )}
    </div>
  );
};

export default ProductCardLine;
