import React from "react";
import {
  IProductCardValue,
  IProductDetailInfo,
} from "@/types/product/product.interface";
import Link from "next/link";
import ProductCardBlock from "@/components/common/ProductCardBlock";
import ProductCardLine from "@/components/common/ProductCardLine";
const ProductDetailInfo = () => {
  const initData: IProductDetailInfo[] = [
    {
      label: "Năm sản xuất",
      value: {
        title: "2017",
        href: "/nuoc-hoa/2017",
        type: "info",
      },
    },
    {
      label: "Người pha chế",
      value: {
        title: "Uzumaki Naruto",
        href: "/nuoc-hoa/tac-gia/uzimaki-naruto",
        type: "info",
      },
    },
    {
      label: "Thương hiệu",
      value: {
        title: "Dior",
        href: "/nuoc-hoa/thuong-hieu/dior",
        type: "info",
      },
    },

    {
      label: "Quốc gia",
      value: {
        title: "Italia",
        href: "/nuoc-hoa/quoc-gia/italia",
        type: "info",
      },
    },
  ];

  const valueTransformer = (value: IProductCardValue) => {
    return {
      title: value.title,
      href: value.href,
      alt: value.alt,
      type: "info",
    };
  };

  return (
    <>
      <ProductCardBlock title="Thông tin">
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

export default ProductDetailInfo;
