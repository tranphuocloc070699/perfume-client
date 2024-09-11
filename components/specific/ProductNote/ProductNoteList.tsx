import { ProductNote } from "@/types/product-note/product-note.model";
import React from "react";
import ProductNoteItem from "./ProductNoteItem";
import { dummyProductNote } from "@/types/product-note/product-note.data";

interface IProps {
  data: ProductNote[];
}

const ProductNoteList = ({ data }: IProps) => {
  return (
    <div className="flex flex-wrap gap-8 items-center">
      {/* {data.map((item, index) => (
        <ProductNoteItem key={index} data={item} />
      ))} */}
      {[...Array(8)].map((item, index) => (
        <ProductNoteItem key={index} data={dummyProductNote} />
      ))}
    </div>
  );
};

export default ProductNoteList;
