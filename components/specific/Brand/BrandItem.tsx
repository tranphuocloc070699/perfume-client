import { ProductNote } from "@/types/product-note/product-note.model";
import React from "react";
import NextImg from "next/image";
import { Brand } from "@/types/brand/brand.model";

interface IProps {
  data: Brand;
}

const BrandItem = ({ data }: IProps) => {
  return (
    <div className="flex flex-col items-center">
      <NextImg
        src={data.thumbnail}
        width={100}
        height={100}
        alt="Brand Thumbnail"
        className="rounded-xl w-20 h-20 object-cover bg-gray-200 cursor-pointer mb-2"
      />

      <h4 className="font-medium hover:underline cursor-pointer text-sm">
        {data.title}
      </h4>
    </div>
  );
};

export default BrandItem;
