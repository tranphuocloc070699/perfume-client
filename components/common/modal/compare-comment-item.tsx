import { CommentDto } from "@/types/comment/comment.model";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Typography from "@/components/ui/typography";

interface CompareCommentProps {
  data: CommentDto;
}

const CompareCommentItem = (props: CompareCommentProps) => {

  function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  }

  return (
    <div className="flex items-start gap-2 w-full">
      <Avatar>
        <AvatarFallback>{getInitials(props.data.user.name)}</AvatarFallback>
      </Avatar>

      <div className={"flex flex-col border border-gray-300 rounded"}>
        <Typography.Label
          className="font-semibold text-base bg-gray-100 rounded-t py-2  px-4">{props.data.user.name}</Typography.Label>
        <Typography.Paragraph className="p-4 text-gray-700 text-sm">{props.data.content}</Typography.Paragraph>
      </div>
    </div>
  );
};

export default CompareCommentItem;
