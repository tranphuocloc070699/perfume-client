import React from "react";
import {
  IProductCardValue,
  IProductDetailInfo
} from "@/types/product/product.interface";
import Link from "next/link";
import ProductCardBlock from "@/components/common/product-card-block";
import ProductCardLine, {
  IProductCardLineProps
} from "@/components/common/product-card-line";

interface ProductDetailInfoProps {
  data: IProductCardLineProps[];
}

const ProductDetailInfo = ({ data }: ProductDetailInfoProps) => {
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
