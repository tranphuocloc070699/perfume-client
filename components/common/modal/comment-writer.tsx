import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const CommentWriter = () => {
  return (
    <div className="flex items-start gap-6 mt-4">
      <Textarea rows={5} placeholder="Chia sẻ trải nghiệm của tôi..." />
      <Button size={"icon"} icon={"send"} className={"bg-red-700"}></Button>
    </div>
  );
};

export default CommentWriter;
