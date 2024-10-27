import { ProductNoteDto } from "@/types/product-note/product-note.model";
import React from "react";
import ProductNoteItem from "./ProductNoteItem";

interface IProps {
  data: ProductNoteDto[];
}

const ProductNoteList = ({ data }: IProps) => {
  return (
    <div className="flex flex-wrap gap-8 items-center">
      {data.map((item, index) => (
        <ProductNoteItem key={index} data={item} />
      ))}
    </div>
  );
};

export default ProductNoteList;
