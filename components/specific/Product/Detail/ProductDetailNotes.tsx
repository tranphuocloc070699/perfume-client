"use client";

import ProductCardBlock from "@/components/common/ProductCardBlock";
import React, { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { INoteItemProps } from "@/types/product/product.interface";
import NoteItem from "@/components/common/NoteItem";

const ProductDetailNotes = () => {
  const [isPercentMode, setIsPercentMode] = useState(false);

  const onPercentModeSwitchChange = () => {
    setIsPercentMode((prevState) => !prevState);
  };

  const getAllNotes = (data: {
    [key: string]: INoteItemProps[];
  }): INoteItemProps[] => {
    return Object.values(data).flat();
  };

  const initData: { [key: string]: INoteItemProps[] } = {
    topNotes: [
      {
        showPercentMode: isPercentMode,
        title: "Hoa hồng",
        thumbnail: "https://fimgs.net/mdimg/sastojci/t.105.jpg",
        percent: 50,
      },
      {
        showPercentMode: isPercentMode,
        title: "Hoa hồng",
        thumbnail: "https://fimgs.net/mdimg/sastojci/t.105.jpg",
        percent: 50,
      },
      {
        showPercentMode: isPercentMode,
        title: "Hoa hồng",
        thumbnail: "https://fimgs.net/mdimg/sastojci/t.105.jpg",
        percent: 50,
      },
    ],
    middleNotes: [
      {
        showPercentMode: isPercentMode,
        title: "Hoa hồng",
        thumbnail: "https://fimgs.net/mdimg/sastojci/t.105.jpg",
        percent: 50,
      },
    ],
    baseNotes: [
      {
        showPercentMode: isPercentMode,
        title: "Hoa hồng",
        thumbnail: "https://fimgs.net/mdimg/sastojci/t.105.jpg",
        percent: 50,
      },
    ],
  };

  const convertKeyToLabel = (key: string) => {
    const object: { [key: string]: string } = {
      topNotes: "Hương đầu",
      middleNotes: "Hương giữa",
      baseNotes: "Hương cuối",
    };

    return object[key];
  };

  return (
    <>
      <ProductCardBlock title="Nốt hương">
        <div className="flex items-center space-x-2 absolute top-0 right-0 space-y-1.5 p-6">
          <Label htmlFor="percent-mode" className="p-0 m-0">
            Chế độ phần trăm
          </Label>
          <Switch
            checked={isPercentMode}
            onCheckedChange={onPercentModeSwitchChange}
            id="percent-mode"
            className="m-0"
          />
        </div>
        <div>
          {isPercentMode ? (
            <>
              {getAllNotes(initData).map((item, index) => (
                <NoteItem key={index} data={item} />
              ))}
            </>
          ) : (
            <>
              {Object.keys(initData).map((initDataKey) => (
                <section key={initDataKey} className="mb-6">
                  <h4 className="font-medium text-base mb-2">
                    {convertKeyToLabel(initDataKey)}
                  </h4>
                  <div className="flex items-center gap-2 ">
                    {initData[initDataKey].map((item, index) => (
                      <NoteItem key={index} data={item} />
                    ))}
                  </div>
                </section>
              ))}
            </>
          )}
        </div>
      </ProductCardBlock>
    </>
  );
};

export default ProductDetailNotes;
