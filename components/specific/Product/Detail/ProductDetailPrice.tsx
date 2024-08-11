import React, { useMemo } from "react";
import {
  IProductDetailInfo,
  IProductDetailPrice,
} from "@/types/product/product.interface";
import Link from "next/link";
import ProductCardBlock from "@/components/common/ProductCardBlock";
const ProductDetailPrice = () => {
  const initData: IProductDetailPrice[] = [
    {
      label: "Giá hãng fullsize 100ml",
      value: {
        title: 2000000,
        href: "https://google.com",
        country: "US",
      },
    },
    {
      label: "Giá tại Fragrance X",
      value: {
        title: 1800000,
        href: "https://google.com",
        country: "US",
      },
    },
    {
      label: "Giá tại thị trường Việt Nam",
      value: {
        title: 1500000,
        href: "https://google.com",
        country: "VN",
      },
    },
  ];

  const productPrice = (price: number, country: "VN" | "US") => {
    let priceTransform = "";
    const formattedNumber = price.toLocaleString("vi-VN");
    if (country === "VN") {
      priceTransform = formattedNumber + " VND";
    } else {
      priceTransform = "$" + formattedNumber;
    }

    return priceTransform;
  };
  return (
    <>
      <ProductCardBlock title="Giá sản phẩm">
        {initData.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-base">
            <h4 className="font-normal">{item.label}:</h4>
            {item?.value?.href ? (
              <Link
                href={item.value.href}
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
        ))}
      </ProductCardBlock>
    </>
  );
};

export default ProductDetailPrice;
