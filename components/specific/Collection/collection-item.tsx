"use client";

import React from "react";
import ProductCollectionList from "@/components/specific/Collection/product-collection-list";
import Icon from "@/components/ui/icon";
import IconCollectionItem from "@/components/specific/Collection/icon-collection-item";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PopConfirm from "@/components/common/pop-confirm";
import { CollectionDto } from "@/types/collection/collection.model";
import { twMerge } from "tailwind-merge";


type CollectionItemProps = {
  openIconGalleryModal: () => void;
  onRemoveCollection: (index: number) => void
  openProductGalleryModal: (index: number) => void
  onCreateCollectionProduct: () => void
  onSaveCollection: () => void,
  onUpdateTitle: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveProductCollection: (collectionProductIndex: number, event: React.MouseEvent<HTMLButtonElement>) => void;
  collection: CollectionDto
  index: number;
}

const CollectionItem = ({
                          openIconGalleryModal,
                          collection,
                          openProductGalleryModal,
                          onRemoveCollection,
                          onCreateCollectionProduct,
                          onSaveCollection,
                          onUpdateTitle,
                          index,
                          onRemoveProductCollection
                        }: CollectionItemProps) => {
  return (
    <div component-name="CollectionItem" className={"flex flex-col gap-2"}>
      <div className={"flex items-center justify-between gap-10"}>
        <div className="flex items-center gap-2 ">
          <IconCollectionItem icon={collection?.icon} openIconGalleryModal={openIconGalleryModal} />
          <Input name={"collection-name"} placeholder={"Nhập tên collection"} value={collection?.title}
                 onChange={onUpdateTitle} />
          <Button className={"bg-green-600 ml-2 w-20 h-9"} size={"icon"} icon={"plus"}
                  onClick={onCreateCollectionProduct}></Button>
        </div>
        <div className={"flex items-center gap-4"}>


          <PopConfirm onConfirm={() => onRemoveCollection(index)}>
            <Button className={"h-9"} variant={"destructive"}>Xóa</Button>
          </PopConfirm>
          <PopConfirm onConfirm={() => onSaveCollection()}>
            <Button className={twMerge(`h-9 ${collection?.id && "bg-orange-500"}`)}>{
              collection?.id ? "Chỉnh sửa" : "Lưu"
            }</Button>
          </PopConfirm>


        </div>
      </div>

      <ProductCollectionList onRemoveProductCollection={onRemoveProductCollection}
                             openProductGalleryModal={openProductGalleryModal}
                             collectionProducts={collection.collectionProducts} />
    </div>
  );
};

export default CollectionItem;