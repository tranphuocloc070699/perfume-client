import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const CompareVote = () => {
  return (
    <div className="w-[120px] border border-gray-200 h-10 flex items-center justify-around bg-white rounded-full text-sm font-medium">
      <span className="hover:underline cursor-default">12</span>
      <Icon icon={"ph:heart-light"} className="text-xl" />
      <span className="hover:underline cursor-default">24</span>
    </div>
  );
};

export default CompareVote;
