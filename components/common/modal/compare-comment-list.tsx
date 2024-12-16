import React from "react";
import CompareCommentItem from "./compare-comment-item";
import { CommentDto } from "@/types/comment/comment.model";

interface CompareCommentList {
  comments: CommentDto[];
}

const CompareCommentList = (props: CompareCommentList) => {
  return (
    <div className="flex flex-col gap-4  overflow-y-auto">
      {props?.comments?.map((comment, index) => (
        <CompareCommentItem key={index} data={comment} />
      ))}
    </div>
  );
};

export default CompareCommentList;
