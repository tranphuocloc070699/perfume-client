import CompareCommentList from "@/components/common/modal/compare-comment-list";
import CommentWriter from "@/components/common/modal/comment-writer";
import { CommentDto } from "@/types/comment/comment.model";
import React from "react";
import Typography from "@/components/ui/typography";

interface ProductDetailCommentProps {
  comments: CommentDto[];
  productName: string;
}

const ProductDetailComment = (props: ProductDetailCommentProps) => {
  return (
    <div className={"border-t border-gray-300 pt-4"}>
      <Typography.H4>Đánh giá về {props.productName}</Typography.H4>
      <CommentWriter />
      <div className="mt-8">
        <CompareCommentList comments={props.comments} />
      </div>
    </div>
  );
};

export default ProductDetailComment;
