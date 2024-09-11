import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const WriteComment = () => {
  return (
    <div className="flex items-start gap-6">
      <Textarea placeholder="Nhập bình luận..." />
      <Button>Gửi</Button>
    </div>
  );
};

export default WriteComment;
