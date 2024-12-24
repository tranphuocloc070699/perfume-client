import React from "react";
import Icon from "@/components/ui/icon";
import { twMerge } from "tailwind-merge";
import Typography from "@/components/ui/typography";


type IconCollectionItemProps = {
  icon?: string;
  openIconGalleryModal: () => void;

}

const IconCollectionItem = ({ icon, openIconGalleryModal }: IconCollectionItemProps) => {
  return (
    <div
      onClick={openIconGalleryModal}
      component-name="ProductCollectionItem"
      className={twMerge(`flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-500 cursor-pointer h-8`)}
    >
      {!icon ? (
        <Typography.Label className={"mb-0 text-xs text-nowrap"}>
          Thêm Icon

        </Typography.Label>
      ) : (
        <div>
          <Icon size={24} name={icon} className={"flex-1 w-5 h-5"} />
        </div>
      )}
    </div>
  );
};

export default IconCollectionItem;
