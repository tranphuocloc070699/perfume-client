import React from "react";
import CompareComment from "./CompareComment";

const CompareCommentList = () => {
  return (
    <div className="flex flex-col gap-4  overflow-y-auto">
      {[...Array(10)].map((_, index) => (
        <CompareComment key={index} />
      ))}
    </div>
  );
};

export default CompareCommentList;
