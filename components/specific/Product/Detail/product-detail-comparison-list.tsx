import React from "react";
import ProductDetailComparisonItem from "./product-detail-comparison-item";
import { ProductCompareDto } from "@/types/product-compare/product-compare.model";

interface ProductDetailComparisonListProps {
  productCompares: ProductCompareDto[];
}

const ProductDetailComparisonList = (
  props: ProductDetailComparisonListProps
) => {
  return (
    <div className="mt-4 grid 2xl:grid-cols-6 md:grid-cols-6 grid-cols-2 gap-4">
      {props.productCompares.map((productCompare, index) => (
        <ProductDetailComparisonItem
          key={productCompare.id}
          data={productCompare}
        />
      ))}
    </div>
  );
};

export default ProductDetailComparisonList;
