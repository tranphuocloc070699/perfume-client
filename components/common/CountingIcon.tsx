import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface ICoutingIconProps {
  icon: string;
  counting: number;
  onClick: (id: number) => void;
}

const CountingIcon = ({ data }: { data: ICoutingIconProps }) => {
  return (
    <span className="flex items-center gap-2">
      <Icon
        icon={data.icon}
        className="text-slate-600 w-5 h-5 object-cover cursor-pointer"
        onClick={() => data.onClick(5)}
      />
      {data.counting > 0 ? (
        <span className={"text-base font-light"}>{data.counting}</span>
      ) : (
        <></>
      )}
    </span>
  );
};

export default CountingIcon;
