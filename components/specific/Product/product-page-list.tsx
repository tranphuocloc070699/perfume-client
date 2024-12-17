import { ProductDto } from "@/types/product/product.model";
import React from "react";
import ProductCardItem from "./product-card-item";

interface ProductPageListProps {
  data: ProductDto[];
}

const ProductPageList = (props: ProductPageListProps) => {
  return (
    <div className="grid 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 gap-6 grid-col-2 ">
      {props.data.map((item) => (
        <ProductCardItem key={item.id} data={item} />
      ))}
    </div>
  );
};

export default ProductPageList;
