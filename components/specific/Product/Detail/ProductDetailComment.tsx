import ProductCardBlock from "@/components/common/product-card-block";
import CompareCommentList from "@/components/common/modal/compare-comment-list";
import CommentWriter from "@/components/common/modal/comment-writer";
import { CommentDto } from "@/types/comment/comment.model";
import React from "react";

interface ProductDetailCommentProps {
  comments: CommentDto[];
}

const ProductDetailComment = (props: ProductDetailCommentProps) => {
  return (
    <>
      <ProductCardBlock title="Bình luận">
        <CommentWriter />
        <div className="mt-8">
          <CompareCommentList comments={props.comments} />
        </div>
      </ProductCardBlock>
    </>
  );
};

export default ProductDetailComment;
