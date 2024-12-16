import React from "react";

const CompareTitle = ({ title }: { title: string }) => {
  return (
    <div className="bg-gray-200 text-xs font-normal px-2 py-[2px] rounded-full">
      <span>{title}</span>
    </div>
  );
};

export default CompareTitle;
