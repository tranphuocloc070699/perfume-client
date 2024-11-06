import React from "react";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";

const MediaList = () => {


  return (
    <div component-name={"MediaList"} className="col-span-1 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label>Gallery</Label>
        <span
          className="p-2 w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer"
          onClick={}
        >
                      <Icon
                        icon={"lucide:plus"}
                        className=" text-white h-4 w-4"
                      />
                    </span>
      </div>
    </div>
  );
};

export default MediaList;