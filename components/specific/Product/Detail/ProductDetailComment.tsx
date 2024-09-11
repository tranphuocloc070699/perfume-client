import ProductCardBlock from "@/components/common/ProductCardBlock";
import CompareCommentList from "@/components/common/modal/CompareCommentList";
import WriteComment from "@/components/common/modal/WriteComment";
import React from "react";

const ProductDetailComment = () => {
  return (
    <>
      <ProductCardBlock title="Bình luận">
        <WriteComment />
        <div className="mt-8">
          <CompareCommentList />
        </div>
      </ProductCardBlock>
    </>
  );
};

export default ProductDetailComment;
