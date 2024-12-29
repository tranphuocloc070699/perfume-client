import React from "react";
import CompareCommentItem from "./compare-comment-item";
import { CommentDto } from "@/types/comment/comment.model";

interface CompareCommentList {
  comments: CommentDto[];
}

const CompareCommentList = (props: CompareCommentList) => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
      {props?.comments?.map((comment, index) => (
        <CompareCommentItem key={index} data={comment} />
      ))}
    </div>
  );
};

export default CompareCommentList;
