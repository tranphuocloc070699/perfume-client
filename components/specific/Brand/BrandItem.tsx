import { ProductNoteDto } from "@/types/product-note/product-note.model";
import React from "react";
import NextImg from "next/image";
import { BrandDto } from "@/types/brand/brand.model";
import Link from "next/link";
interface IProps {
  data: BrandDto;
}

const BrandItem = ({ data }: IProps) => {
  return (
    <Link
      href={`/nuoc-hoa?brandId=${data.id}`}
      className="flex flex-col items-center"
    >
      <NextImg
        src={data.thumbnail}
        width={100}
        height={100}
        alt="Brand Thumbnail"
        className="rounded-xl w-20 h-20 object-cover bg-gray-200 cursor-pointer mb-2"
      />

      <h4 className="font-medium hover:underline cursor-pointer text-sm">
        {data.name}
      </h4>
    </Link>
  );
};

export default BrandItem;
