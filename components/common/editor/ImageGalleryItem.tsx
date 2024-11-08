import React from "react";
import NextImg from "next/image";
import { twMerge } from "tailwind-merge";
import { Check, Trash2 } from "lucide-react";

interface Props {
  src: string;
  className: string;
  onDeleteClick: () => void;
  onSelectClick: () => void;
}

const ImageGalleryItem = ({ src, onDeleteClick, onSelectClick, className }: Props) => {
  return (
    <div component-name="ImageGalleryItem" className={twMerge(`relative ${className}`)}>
      <NextImg src={src} width={200} height={200} alt={"Image"}
               className={"w-full h-auto aspect-square object-cover bg-gray-100 rounded-lg overflow-hidden"} />
      <div className={"absolute bottom-0 left-0 right-0 flex items-center justify-center rounded-lg overflow-hidden"}>
        <button className={"bg-rose-500 flex-1 p-2 flex items-center justify-center"}>
          <Trash2 size={20} className={"text-gray-100"} />
        </button>
        <button className={"bg-sky-500 flex-1 p-2 flex items-center justify-center"}>
          <Check size={20} className={"text-gray-100"} />
        </button>
      </div>
    </div>
  );
};

export default ImageGalleryItem;