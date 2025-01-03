"use client";

import React from "react";
import NextImg from "next/image";
import CountingIcon from "@/components/common/counting-icon";
import ProductCompareModal from "@/components/common/modal/product-compare-modal";
import { ProductCompareDto } from "@/types/product-compare/product-compare.model";
import ProductCompareService from "@/services/modules/product-compare.service";

const ProductDetailComparisonItem = ({ data }: { data: ProductCompareDto }) => {
  const modal = ProductCompareModal();

  async function onIconClick(id: number) {
  }

  async function onClick() {
    const productCompareService = new ProductCompareService();
    const response = await productCompareService.getProductCompareById(data.id);
    modal.open(response.body.data);
  }

  return (
    <div className="bg-gray-100 rounded-xl p-4 flex flex-col gap-4 relative">
      <NextImg
        src={data?.product?.thumbnail}
        alt={data?.product?.name}
        quality={100}
        width={200}
        height={200}
        className="md:w-20 md:h-20 object-cover rounded-xl  cursor-pointer self-center"
      />
      <h4
        className="text-sm font-medium text-center cursor-pointer hover:underline"
        onClick={onClick}
      >
        {data?.product?.name}
      </h4>
      <div className="absolute top-4 right-4">
        <CountingIcon
          icon={"vote"}
          counting={data.totalVotes}
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
