import ProductCardBlock from "@/components/common/ProductCardBlock";
import CompareCommentList from "@/components/common/modal/CompareCommentList";
import WriteComment from "@/components/common/modal/WriteComment";
import { CommentDto } from "@/types/comment/comment.model";
import React from "react";

interface ProductDetailCommentProps {
  comments: CommentDto[];
}

const ProductDetailComment = (props: ProductDetailCommentProps) => {
  return (
    <>
      <ProductCardBlock title="Bình luận">
        <WriteComment />
        <div className="mt-8">
          <CompareCommentList comments={props.comments} />
        </div>
      </ProductCardBlock>
    </>
  );
};

export default ProductDetailComment;
