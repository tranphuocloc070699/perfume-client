import ProductCardBlock from "@/components/common/ProductCardBlock";
import React from "react";

interface ProductDetailStoryProps {
  content: string;
}

const ProductDetailStory = (props: ProductDetailStoryProps) => {
  return (
    <>
      <ProductCardBlock title="Câu chuyện">
        <div dangerouslySetInnerHTML={{ __html: props.content }}>

        </div>
      </ProductCardBlock>
    </>
  );
};

export default ProductDetailStory;
