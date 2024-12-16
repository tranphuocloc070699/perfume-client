import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react/dist/iconify.js";
import MediaUploaderModal from "@/components/specific/Admin/Product/media-uploader-modal";
import PopConfirm from "@/components/common/pop-confirm";
import { UpsaveProductDto } from "@/types/admin/admin.interface";
import upsaveInput from "@/components/specific/Admin/Product/upsave-input";
import { ProductDto } from "@/types/product/product.model";

interface IMediaListProps {
  className?: string,
  data?: string[],
  updateUpsaveProductValue: (key: keyof UpsaveProductDto, value: any) => void,
  id: keyof UpsaveProductDto,
  label: string
}


const MediaList = ({ data, className, updateUpsaveProductValue, id, label }: IMediaListProps) => {

  function openMediaUploaderModal() {
    mediaUploaderModal.openModal().then(data => {
      if (data.length === 0) return;

      updateUpsaveProductValue(id, data);
      mediaUploaderModal.closeModal();
    });
  }


  const mediaUploaderModal = MediaUploaderModal();

  function removeImage(path: string) {
    const imagesContain = data?.filter(item => item !== path);
    updateUpsaveProductValue(id, imagesContain);
  }

  return (
    <div component-name={"MediaList"} className={className}>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span
          className="p-2 w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer"
          onClick={openMediaUploaderModal}
        >
                      <Icon
                        icon={"lucide:plus"}
                        className=" text-white h-4 w-4"
                      />
                    </span>
      </div>
      <div className={"mt-4 p-4 border border-b-gray-300 rounded-lg grid grid-cols-12 gap-4 "}>
        {data?.map(path => <div key={path} className={"rounded-lg col-span-3 relative"}>
          <img src={path} alt={"Image"}
               className={"w-full object-cover h-16 rounded-lg"} />
          <PopConfirm onConfirm={() => removeImage(path)}>
          <span
            className={"absolute top-[-10px] right-[-10px] bg-white rounded-full shadow-lg cursor-pointer"}>
            <Icon icon={"lucide:circle-x"} className={"h-6 w-6 text-red-700"} />
          </span>
          </PopConfirm>
        </div>)}
      </div>
      {mediaUploaderModal.content}
    </div>
  );
};

export default MediaList;