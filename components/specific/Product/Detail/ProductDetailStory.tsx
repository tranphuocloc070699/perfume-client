import ProductCardBlock from "@/components/common/ProductCardBlock";
import React from "react";

interface ProductDetailStoryProps {
  content: string;
}
const ProductDetailStory = (props: ProductDetailStoryProps) => {
  return (
    <>
      <ProductCardBlock title="Câu chuyện">{props.content}</ProductCardBlock>
    </>
  );
};

export default ProductDetailStory;
