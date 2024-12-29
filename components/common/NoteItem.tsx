import React from "react";
import NextImg from "next/image";
import { INoteItemProps } from "@/types/product/product.interface";
import { Progress } from "@/components/ui/progress";
import { ProductNoteDto } from "@/types/product-note/product-note.model";
import Typography from "@/components/ui/typography";

const NoteItem = ({ data }: { data: ProductNoteDto }) => {
  return (
    <>
      <div className="rounded bg-gray-100 items-center gap-2 px-4 py-2">
        <NextImg
          src={data.thumbnail}
          height={28}
          width={28}
          alt="Ảnh note"
          className="w-6 h-6 object-cover bg-gray-300"
        />
        <span className={"font-normal flex flex-col"}>
          <span className={"text-xs text-gray-500"}>{data.enName}</span>
        <Typography.Text className={"text-xs "}>{data.name}</Typography.Text>
        </span>
      </div>
      {/* {data.showPercentMode ? (
        <div className="flex items-center gap-2">
          <h4 className="whitespace-nowrap text-sm font-medium">
            {data.title}
          </h4>
          <Progress className={"text-4xl"} value={data.percent} />
        </div>
      ) : (
       
      )} */}
    </>
  );
};

export default NoteItem;
