"use client";

import React from "react";
import ProductCollectionList from "@/components/specific/Collection/product-collection-list";
import IconCollectionItem from "@/components/specific/Collection/icon-collection-item";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PopConfirm from "@/components/common/pop-confirm";
import { CollectionDto } from "@/types/collection/collection.model";
import { twMerge } from "tailwind-merge";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Typography from "@/components/ui/typography";

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


  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition
  } = useSortable({
    id: collection?.id,
    data: {
      type: "Collection",
      collection
    },
    attributes: {
      roleDescription: `Collection: ${collection?.title}`
    }
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  };


  return (
    <div component-name="CollectionItem" className={"flex flex-col gap-2"} ref={setNodeRef}
         style={style}>
      <div className={"flex items-center justify-between gap-10"}>
        <div className="flex items-center gap-2 ">
          <IconCollectionItem icon={collection?.icon} openIconGalleryModal={openIconGalleryModal} />
          <Input name={"collection-name"} placeholder={"Nhập tên collection"} value={collection?.title}
                 onChange={onUpdateTitle} />
          <Typography.H4
            className={"text-nowrap bg-gray-100 rounded shadow py-1 px-4"}>{collection?.title}</Typography.H4>
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
      <div className={"flex items-center gap-4"}>
        <div className={"w-16 flex flex-col gap-6"}>
          <Button
            {...attributes}
            {...listeners}
            className={"w-full bg-gray-100 h-8 cursor-grab"}
            size={"icon"}
            icon={"grip"}
            iconClassName={"text-gray-900"}
          ></Button>
          <Button className={"bg-green-600  h-9 w-full"} size={"icon"} icon={"plus"}
                  onClick={onCreateCollectionProduct}></Button>
        </div>
        <ProductCollectionList onRemoveProductCollection={onRemoveProductCollection}
                               openProductGalleryModal={openProductGalleryModal}
                               collectionProducts={collection.collectionProducts} />
      </div>
    </div>
  );
};

export default CollectionItem;