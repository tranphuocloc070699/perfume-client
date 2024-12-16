"use client";

import ProductCardBlock from "@/components/common/product-card-block";
import React, { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { INoteItemProps } from "@/types/product/product.interface";
import NoteItem from "@/components/common/NoteItem";
import { ProductNoteDto } from "@/types/product-note/product-note.model";

interface ProductDetailNotesProps {
  topNotes: ProductNoteDto[];
  middleNotes: ProductNoteDto[];
  baseNotes: ProductNoteDto[];
}

const ProductDetailNotes = (data: ProductDetailNotesProps) => {
  const [isPercentMode, setIsPercentMode] = useState(false);

  const onPercentModeSwitchChange = () => {
    setIsPercentMode((prevState) => !prevState);
  };

  const getAllNotes = (data: {
    [key: string]: INoteItemProps[];
  }): INoteItemProps[] => {
    return Object.values(data).flat();
  };

  const convertKeyToLabel = (key: string) => {
    const object: { [key: string]: string } = {
      topNotes: "Hương đầu",
      middleNotes: "Hương giữa",
      baseNotes: "Hương cuối"
    };

    return object[key];
  };

  const noteKeys: Array<keyof ProductDetailNotesProps> = [
    "topNotes",
    "middleNotes",
    "baseNotes"
  ];

  return (
    <>
      <ProductCardBlock title="Nốt hương">
        <div className="flex items-center space-x-2 absolute top-0 right-0 space-y-1.5 p-6">
          {/* <Label htmlFor="percent-mode" className="p-0 m-0">
            Chế độ phần trăm
          </Label> */}
          {/* <Switch
            checked={isPercentMode}
            onCheckedChange={onPercentModeSwitchChange}
            id="percent-mode"
            className="p-0 m-0"
          /> */}
        </div>
        <div>
          {noteKeys.map((key) => (
            <section key={key} className="mb-6">
              <h4 className="font-medium text-base mb-2">
                {convertKeyToLabel(key)}
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                {data[key].map((item, index) => (
                  <NoteItem key={index} data={item} />
                ))}
              </div>
            </section>
          ))}
          {/* {isPercentMode ? (
            <>
              {getAllNotes(initData).map((item, index) => (
                <NoteItem key={index} data={item} />
              ))}
            </>
          ) : (
            <>
              
            </>
          )} */}
        </div>
      </ProductCardBlock>
    </>
  );
};

export default ProductDetailNotes;
