import { BrandDto } from "@/types/brand/brand.model";
import React from "react";
import BrandItem from "./BrandItem";
import { dummyBrandDto } from "@/types/brand/brand.data";

interface IProps {
  data: BrandDto[];
}

const BrandList = ({ data }: IProps) => {
  return (
    <div className="flex flex-wrap gap-8 items-center">
      {data.map((item, index) => (
        <BrandItem key={index} data={item} />
      ))}
    </div>
  );
};

export default BrandList;
