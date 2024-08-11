import React, { useMemo } from "react";
import {
  IProductCardValue,
  IProductDetailInfo,
  IProductDetailPrice,
} from "@/types/product/product.interface";
import Link from "next/link";
import ProductCardBlock from "@/components/common/ProductCardBlock";
import ProductCardLine from "@/components/common/ProductCardLine";
const ProductDetailPrice = () => {
  const initData: IProductDetailPrice[] = [
    {
      label: "Giá hãng fullsize 100ml",
      value: {
        title: `${2000000}`,
        href: "https://google.com",
        country: "US",
        type: "price",
      },
    },
    {
      label: "Giá tại Fragrance X",
      value: {
        title: `${1800000}`,
        href: "https://google.com",
        country: "US",
        type: "price",
      },
    },
    {
      label: "Giá tại thị trường Việt Nam",
      value: {
        title: `${1500000}`,
        href: "https://google.com",
        country: "VN",
        type: "price",
      },
    },
  ];

  const valueTransformer = (value: IProductCardValue) => {
    return {
      title: value.title,
      href: value.href,
      alt: value.alt,
      type: "price",
      country: value.country,
    };
  };
  return (
    <>
      <ProductCardBlock title="Giá sản phẩm">
        {initData.map((item) => (
          <ProductCardLine
            key={item.label}
            label={item.label}
            value={valueTransformer(item.value)}
          />
        ))}
      </ProductCardBlock>
    </>
  );
};

export default ProductDetailPrice;
