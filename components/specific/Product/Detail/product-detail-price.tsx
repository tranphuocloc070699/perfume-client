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
import Typography from "@/components/ui/typography";

interface ProductDetailPriceProps {
  prices: ProductPriceDto[];
}

const ProductDetailPrice = (props: ProductDetailPriceProps) => {
  const labelMapper = (price: ProductPriceDto) => {
    const labelDefining = {
      LISTED: "Giá chính hãng",
      VIETNAM_MARKET: "Giá thị trường Việt Nam"
    };

    return labelDefining[price.labelType];
  };
  return (
    <div className={"flex items-center gap-6 mt-4"}>
      {props.prices &&
        props.prices.map((item) => (
          <div key={item.id}
               className={"flex-1 flex flex-col border border-gray-300 h-[120px]  rounded-t rounded-b-lg"}>
            <Typography.Label
              className={"bg-gray-100 text-sm  text-gray-700 font-semibold text-center py-2 px-4 rounded-t"}>{labelMapper(item)}</Typography.Label>
            <Typography.Paragraph
              className={"font-bold text-lg text-center mt-4"}>{convertNumToPrice(Number(item.value), item.priceType)}</Typography.Paragraph>
          </div>

          // <ProductCardLine
          //   key={item.id}
          //   label={labelMapper(item)}
          //   value={convertNumToPrice(Number(item.value), item.priceType)}
          //   link={item.link}
          // />
        ))}
    </div>
  );
};

export default ProductDetailPrice;
