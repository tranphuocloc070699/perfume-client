"use client";

import React from "react";
import NextImg from "next/image";
import ProductCardLine from "@/components/common/ProductCardLine";
import {
  IProductCardValue,
  IProductDetailInfo,
} from "@/types/product/product.interface";
import CountingIcon from "@/components/common/CountingIcon";
import ProductCompareModal from "@/components/common/modal/ProductCompareModal";
import { useModalStore } from "@/store/modal.store";
import { ProductCompareDto } from "@/types/product-compare/product-compare.model";

const ProductDetailComparisonItem = ({ data }: { data: ProductCompareDto }) => {
  const modal = ProductCompareModal();
  function onIconClick(id: number) {
    console.log("on click trigger with id: " + id);
  }
  function onClick() {
    modal.open();
  }

  return (
    <div className="bg-gray-100 rounded-xl p-4 flex flex-col gap-4 relative">
      <NextImg
        src={data.product.thumbnail}
        alt={data.product.name}
        quality={100}
        width={200}
        height={200}
        className="md:w-20 md:h-20 object-cover rounded-xl  cursor-pointer self-center"
      />
      <h4
        className="text-sm font-medium text-center cursor-pointer hover:underline"
        onClick={onClick}
      >
        {data.product.name}
      </h4>
      <div className="absolute top-4 right-4">
        <CountingIcon
          data={{
            icon: "material-symbols-light:how-to-vote-outline",
            counting: 10,
            onClick: onIconClick,
          }}
        />
      </div>

      {/* 
      Define modal
      */}

      {modal.content}
    </div>
  );
};

export default ProductDetailComparisonItem;

/* 

const productDetailInfo: IProductDetailInfo = {
    label: "Quốc gia",
    value: {
      title: "Italia",
      href: "/nuoc-hoa/2017",
      type: "info",
    },
  };
  const valueTransformer = (value: IProductCardValue) => {
    return {
      title: value.title,
      href: value.href,
      alt: value.alt,
      type: "info",
    };
  };

*/
