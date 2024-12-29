"use client";

import React from "react";
import ProductDetailComparisonSearching from "./product-detail-comparison-searching";
import { Button } from "@/components/ui/button";
import ProductDetailComparisonList from "./product-detail-comparison-list";
import { ProductCompareDto } from "@/types/product-compare/product-compare.model";
import Typography from "@/components/ui/typography";

interface ProductDetailComparisonProps {
  productCompares: ProductCompareDto[];
}

const ProductDetailComparison = (props: ProductDetailComparisonProps) => {
  return (
    <div className={"pt-4 border-t border-gray-300"}>
      <div className={"flex items-center justify-between gap-4"}>
        <div className={"flex items-center gap-4"}>
          <Typography.H4 className={"text-base"}>So sánh với</Typography.H4>
          <ProductDetailComparisonSearching />
        </div>
        <Button size={"icon"} icon={"plus"} className={"bg-red-700"}></Button>
      </div>
      <ProductDetailComparisonList productCompares={props.productCompares} />
    </div>
  );
};

export default ProductDetailComparison;
