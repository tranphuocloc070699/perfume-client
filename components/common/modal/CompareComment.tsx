import { CommentDto } from "@/types/comment/comment.model";
import React from "react";

interface CompareCommentProps {
  data: CommentDto;
}

const CompareComment = (props: CompareCommentProps) => {
  return (
    <div className="bg-gray-100 rounded-2xl p-4 flex-col items-start gap-4">
      <h4 className="font-semibold text-base">{props.data.user.name}</h4>
      <span className="font-light leading-4">{props.data.content}</span>
    </div>
  );
};

export default CompareComment;
