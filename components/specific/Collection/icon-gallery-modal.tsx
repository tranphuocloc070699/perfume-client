"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Icon, { icons } from "@/components/ui/icon";


type IconGalleryModalProps = {
  onClick?: (key: string) => void
}


const IconGalleryModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [props, setProps] = useState<IconGalleryModalProps>({});

  function openModal(newProps: IconGalleryModalProps) {
    if (newProps) setProps(newProps);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  return {
    content: (
      <div component-name={"IconGalleryModal"}>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-[50%] h-[90%]">
            <DialogHeader>
              <DialogTitle className="mb-4 font-bold text-base">
                Icon Gallery
              </DialogTitle>
              <div className={"flex items-center gap-6 w-full flex-wrap "}>
                {Object.keys(icons).map((key, index) => (
                  <Icon key={key} name={key} size={36}
                        className={"bg-gray-100 rounded p-2 transition cursor-pointer duration-300 hover:bg-gray-200"}
                        onClick={() => props?.onClick(key)} />
                ))}
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    ),
    openModal,
    closeModal
  };
};

export default IconGalleryModal;