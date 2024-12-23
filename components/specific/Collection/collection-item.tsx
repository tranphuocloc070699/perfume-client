"use client";

import React from "react";
import ProductCollectionList from "@/components/specific/Collection/product-collection-list";
import Icon from "@/components/ui/icon";
import IconCollectionItem from "@/components/specific/Collection/icon-collection-item";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";


type CollectionItemProps = {
  openIconGalleryModal: () => void;
  openProductGalleryModal: (index: number) => void
  title: string;
  icon: string;
}

const CollectionItem = ({ openIconGalleryModal, title, icon, openProductGalleryModal }: CollectionItemProps) => {
  return (
    <div component-name="CollectionItem" className={"flex flex-col gap-2"}>
      <div className={"flex items-center justify-between gap-10"}>
        <div className="flex items-center gap-2 ">
          <IconCollectionItem icon={icon} openIconGalleryModal={openIconGalleryModal} />
          <Input name={"collection-name"} placeholder={"Nhập tên collection"} />
        </div>
        <div className={"flex items-center gap-6"}>
          <Button className={"h-9"}>Lưu</Button>
        </div>
      </div>

      <ProductCollectionList openProductGalleryModal={openProductGalleryModal} />
    </div>
  );
};

export default CollectionItem;