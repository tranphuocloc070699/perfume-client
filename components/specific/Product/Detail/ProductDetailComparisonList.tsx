import React from "react";
import ProductDetailComparisonItem from "./ProductDetailComparisonItem";
import { fakeProductData } from "@/types/product/product.data";
const ProductDetailComparisonList = () => {
  return (
    <div className="grid 2xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductDetailComparisonItem key={index} data={fakeProductData} />
      ))}
    </div>
  );
};

export default ProductDetailComparisonList;
