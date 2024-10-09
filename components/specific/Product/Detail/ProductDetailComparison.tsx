"use client";

import ProductCardBlock from "@/components/common/ProductCardBlock";
import React from "react";
import ProductDetailComparisonSearching from "./ProductDetailComparisonSearching";
import { Button } from "@/components/ui/button";
import ProductDetailComparisonList from "./ProductDetailComparisonList";
import { ProductCompareDto } from "@/types/product-compare/product-compare.model";

interface ProductDetailComparisonProps {
  productCompares: ProductCompareDto[];
}
const ProductDetailComparison = (props: ProductDetailComparisonProps) => {
  return (
    <>
      <ProductCardBlock title="Bảng so sánh">
        <div className="flex items-center space-x-2 absolute top-0 right-0 space-y-1.5 p-6">
          <Button>Tạo so sánh mới</Button>
        </div>
        <ProductDetailComparisonSearching />
        <ProductDetailComparisonList productCompares={props.productCompares} />
      </ProductCardBlock>
    </>
  );
};

export default ProductDetailComparison;
