import React, { useMemo } from "react";
import {
  IProductCardValue,
  IProductDetailInfo,
  IProductDetailPrice
} from "@/types/product/product.interface";
import Link from "next/link";
import ProductCardBlock from "@/components/common/product-card-block";
import ProductCardLine from "@/components/common/product-card-line";
import { ProductPriceDto } from "@/types/product-price/product-price.model";
import { convertNumToPrice } from "@/lib/utils";

interface ProductDetailPriceProps {
  prices: ProductPriceDto[];
}

const ProductDetailPrice = (props: ProductDetailPriceProps) => {
  const labelMapper = (price: ProductPriceDto) => {
    const labelDefining = {
      LISTED: "Giá hãng",
      VIETNAM_MARKET: "Giá thị trường Việt Nam"
    };

    return labelDefining[price.labelType];
  };
  return (
    <>
      <ProductCardBlock title="Giá sản phẩm">
        {props.prices &&
          props.prices.map((item) => (
            <ProductCardLine
              key={item.id}
              label={labelMapper(item)}
              value={convertNumToPrice(Number(item.value), item.priceType)}
              link={item.link}
            />
          ))}
      </ProductCardBlock>
    </>
  );
};

export default ProductDetailPrice;
