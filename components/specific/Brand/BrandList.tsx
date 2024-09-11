import { Brand } from "@/types/brand/brand.model";
import React from "react";
import BrandItem from "./BrandItem";
import { dummyBrand } from "@/types/brand/brand.data";

interface IProps {
  data: Brand[];
}

const BrandList = ({ data }: IProps) => {
  return (
    <div className="flex flex-wrap gap-8 items-center">
      {/* {data.map((item, index) => (
        <ProductNoteItem key={index} data={item} />
      ))} */}
      {[...Array(8)].map((item, index) => (
        <BrandItem key={index} data={dummyBrand} />
      ))}
    </div>
  );
};

export default BrandList;
