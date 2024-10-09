import React from "react";
import {
  IProductCardValue,
  IProductDetailInfo,
} from "@/types/product/product.interface";
import Link from "next/link";
import ProductCardBlock from "@/components/common/ProductCardBlock";
import ProductCardLine, {
  IProductCardLineProps,
} from "@/components/common/ProductCardLine";

interface ProductDetailInfoProps {
  data: IProductCardLineProps[];
}

const ProductDetailInfo = ({ data }: ProductDetailInfoProps) => {
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

  return (
    <>
      <ProductCardBlock title="Thông tin">
        {data.map((item) => (
          <ProductCardLine
            key={item.label}
            label={item.label}
            value={item.value}
            link={item.link}
          />
        ))}
      </ProductCardBlock>
    </>
  );
};

export default ProductDetailInfo;
