"use client";

import React from "react";
import Icon from "@/components/ui/icon";

type InteractionItem = {
  text: string;
  icon: string; // Icon name
  actionText: string;
  moveTo: string;
};

type Props = {
  items: InteractionItem[];
  className?: string;
};

const ProductInteractions: React.FC<Props> = ({ items, className }) => {
  function moveToId(id: string) {

  }

  return (
    <div
      className={`bg-gray-100 rounded flex flex-col p-4 mt-4 text-xs gap-2 ${className}`}
    >
      {items.map((item, index) => (
        <span key={index} className="flex items-center">
          {item.text}
          <Icon size={14} name={item.icon} className="ml-4 mr-2" />
          <span className="font-semibold cursor-pointer" onClick={() => moveToId(item.moveTo)}>
            {item.actionText}
          </span>
        </span>
      ))}
    </div>
  );
};

export default ProductInteractions;
