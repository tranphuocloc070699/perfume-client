"use client";

import React from "react";
import Icon, { icons } from "@/components/ui/icon";
import Typography from "@/components/ui/typography";

interface ICoutingIconProps {
  icon: keyof typeof icons | string;
  counting?: number;
  onClick?: (id: number) => void;
}

const CountingIcon = ({ icon, counting, onClick }: ICoutingIconProps) => {
  return (
    <span className="flex items-center gap-1">
      <Icon
        name={icon}
        className="text-slate-600 w-4 h-4 object-cover cursor-pointer"
        onClick={() => onClick && onClick(5)}
      />
      {counting && counting > 0 ? (
        <Typography.Label className={"text-xs font-semibold text-gray-700 mb-0"}>
          {counting}
        </Typography.Label>
      ) : (
        <></>
      )}
    </span>
  );
};

export default CountingIcon;
