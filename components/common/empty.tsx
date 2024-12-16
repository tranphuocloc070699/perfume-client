import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface ICommonEmpty {
  text: string;
}

const Empty = ({ text }: ICommonEmpty) => {
  return (
    <div
      component-name="Empty"
      className="w-full flex flex-col items-center justify-center gap-2"
    >
      <Icon icon={"ph:empty-thin"} className="text-3xl font-semibold" />
      <p className="font-medium text-lg text-gray-600">{text}</p>
    </div>
  );
};

export default Empty;
