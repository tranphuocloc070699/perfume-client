import React from "react";
import NextImg from "next/image";
import { INoteItemProps } from "@/types/product/product.interface";
import { Progress } from "@/components/ui/progress";
const NoteItem = ({ data }: { data: INoteItemProps }) => {
  return (
    <>
      {data.showPercentMode ? (
        <div className="flex items-center gap-2">
          <h4 className="whitespace-nowrap text-sm font-medium">
            {data.title}
          </h4>
          <Progress className={"text-4xl"} value={data.percent} />
        </div>
      ) : (
        <div className="flex rounded-full py-0.5 px-3 items-center gap-2 border border-slate-200">
          <NextImg
            src={data.thumbnail}
            height={28}
            width={28}
            alt="Ảnh note"
            className="w-7 h-7 rounded-full object-cover"
          />
          <span className="text-sm">{data.title}</span>
        </div>
      )}
    </>
  );
};

export default NoteItem;
