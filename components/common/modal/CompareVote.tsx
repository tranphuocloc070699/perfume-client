import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface CompareVoteProps {
  originalVotes: number[];
  compareVotes: number[];
}

const CompareVote = (props: CompareVoteProps) => {
  return (
    <div className="w-[120px] border border-gray-200 h-10 flex items-center justify-around bg-white rounded-full text-sm font-medium">
      <span className="hover:underline cursor-default">
        {props?.originalVotes?.length}
      </span>
      <Icon icon={"ph:heart-light"} className="text-xl" />
      <span className="hover:underline cursor-default">
        {props?.compareVotes?.length}
      </span>
    </div>
  );
};

export default CompareVote;
