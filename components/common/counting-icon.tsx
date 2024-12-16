import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface ICoutingIconProps {
  icon: string;
  counting: number;
  onClick: (id: number) => void;
}

const CountingIcon = ({ data }: { data: ICoutingIconProps }) => {
  return (
    <span className="flex items-center gap-1">
      <Icon
        icon={data.icon}
        className="text-slate-600 w-4 h-4 object-cover cursor-pointer"
        onClick={() => data.onClick(5)}
      />
      {data.counting > 0 ? (
        <span className={"text-xs font-medium text-slate-700"}>
          {data.counting}
        </span>
      ) : (
        <></>
      )}
    </span>
  );
};

export default CountingIcon;
