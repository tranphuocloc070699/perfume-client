import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface ITextIconProps {
  icon: string;
  text: string;
}

const TextIcon = ({ data }: { data: ITextIconProps }) => {
  return (
    <span className="flex items-start gap-2">
      <Icon
        icon={data.icon}
        className="text-slate-600 w-5 h-5 object-cover cursor-pointer font-semibold"
      />
      <span className={"text-base font-normal"}>{data.text}</span>
    </span>
  );
};

export default TextIcon;
