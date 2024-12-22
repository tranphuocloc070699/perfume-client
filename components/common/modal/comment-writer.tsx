import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const CommentWriter = () => {
  return (
    <div className="flex items-start gap-6">
      <Textarea placeholder="Nhập bình luận..." />
      <Button>Gửi</Button>
    </div>
  );
};

export default CommentWriter;
