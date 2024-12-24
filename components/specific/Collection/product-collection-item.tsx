import React, { useState } from "react";
import { Plus, XCircle } from "lucide-react";
import { ProductDto } from "@/types/product/product.model";
import { CollectionProductDto } from "@/types/collection/collection.model";
import NextImg from "next/image";
import Typography from "@/components/ui/typography";
import PopConfirm from "@/components/common/pop-confirm";

type ProductCollectionItemProps = {
  collectionProduct?: CollectionProductDto;
  onRemoveProductCollection: (e: React.MouseEvent<HTMLButtonElement>) => void
  openProductGalleryModal: () => void;
  size: number;
}

const ProductCollectionItem = ({
                                 collectionProduct,
                                 openProductGalleryModal,
                                 onRemoveProductCollection,
                                 size
                               }: ProductCollectionItemProps) => {

  return (
    <div
      onClick={openProductGalleryModal}
      component-name="ProductCollectionItem"
      className=" relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-500 cursor-pointer  h-40"
    >
      {
        size > 4 && <button
          onClick={onRemoveProductCollection}
          className="absolute top-2 right-2 text-red-500"
        >
          <XCircle className="w-5 h-5" />
        </button>
      }
      {!collectionProduct.product.id ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500"
        >
          <Plus className="w-8 h-8 mb-2" />
          <p className="text-sm">Add a product</p>
        </div>
      ) : (
        <div className="">
          <img
            src={collectionProduct.product.thumbnail}
            alt={collectionProduct.product.name}
            className="w-full h-20 object-contain rounded-t-lg"
            width={40}
            height={40}
          />

          <Typography.Paragraph
            className="text-sm text-gray-500 text-center">{collectionProduct.product.name}</Typography.Paragraph>

        </div>
      )}
    </div>
  );
};

export default ProductCollectionItem;
