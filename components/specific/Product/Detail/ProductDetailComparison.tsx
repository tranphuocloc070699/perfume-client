"use client";

import ProductCardBlock from "@/components/common/ProductCardBlock";
import React from "react";
import ProductDetailComparisonSearching from "./ProductDetailComparisonSearching";
import { Button } from "@/components/ui/button";
import ProductDetailComparisonList from "./ProductDetailComparisonList";
const ProductDetailComparison = () => {
  return (
    <>
      <ProductCardBlock title="Bảng so sánh">
        <div className="flex items-center space-x-2 absolute top-0 right-0 space-y-1.5 p-6">
          <Button>Tạo so sánh mới</Button>
        </div>
        <ProductDetailComparisonSearching />
        <ProductDetailComparisonList />
      </ProductCardBlock>
    </>
  );
};

export default ProductDetailComparison;
