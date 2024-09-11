import React from "react";
import ProductDetailComparisonItem from "./ProductDetailComparisonItem";
import { fakeProductData } from "@/types/product/product.data";
import { useModalStore } from "@/store/modal.store";
const ProductDetailComparisonList = () => {
  return (
    <div className="grid 2xl:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductDetailComparisonItem key={index} data={fakeProductData} />
      ))}
    </div>
  );
};

export default ProductDetailComparisonList;
