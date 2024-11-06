import React from "react";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import MediaUploaderModal from "@/components/specific/Admin/Product/MediaUploaderModal";

interface IMediaListProps {
  data: string[];
}

const MediaList = ({ data }: IMediaListProps) => {

  function openMediaUploaderModal() {
    mediaUploaderModal.openModal();
  }

  const mediaUploaderModal = MediaUploaderModal();
  return (
    <div component-name={"MediaList"} className="col-span-1 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label>Gallery</Label>
        <span
          className="p-2 w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer"
          onClick={openMediaUploaderModal}
        >
                      <Icon
                        icon={"lucide:plus"}
                        className=" text-white h-4 w-4"
                      />
                    </span>
        <div className={"mt-4 "}>
          {data?.map(path => <img src={path} alt={"Image"} className={"w-8 h-8 rounded-lg"} />)}
        </div>

      </div>
    </div>
  );
};

export default MediaList;