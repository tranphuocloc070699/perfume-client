import { ProductNote } from "@/types/product-note/product-note.model";
import React from "react";
import NextImg from "next/image";

interface IProps {
  data: ProductNote;
}

const ProductNoteItem = ({ data }: IProps) => {
  return (
    <div className="flex flex-col items-center">
      <NextImg
        src={data.thumbnail}
        width={100}
        height={100}
        alt="Product Note Thumbnail"
        className="rounded-full w-16 h-16 bg-gray-200 cursor-pointer mb-2"
      />
      <h5 className="font-semibold text-xs text-gray-600 self-start hover:underline cursor-pointer">
        {data.category.title}
      </h5>
      <h4 className="font-medium hover:underline cursor-pointer text-sm">
        {data.title}
      </h4>
    </div>
  );
};

export default ProductNoteItem;
