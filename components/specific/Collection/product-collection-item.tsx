import React, { useState } from "react";
import { Plus, XCircle } from "lucide-react";
import { ProductDto } from "@/types/product/product.model";

type ProductCollectionItemProps = {
  product?: ProductDto;
  openProductGalleryModal: () => void
}

const ProductCollectionItem = ({ product, openProductGalleryModal }) => {


  return (
    <div
      onClick={openProductGalleryModal}
      component-name="ProductCollectionItem"
      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-500 cursor-pointer h-40"
    >
      {!product ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500"
        >
          <Plus className="w-8 h-8 mb-2" />
          <p className="text-sm">Add a product</p>
        </div>
      ) : (
        <div className="relative w-full h-full bg-white rounded-lg shadow-lg">
          <button

            className="absolute top-2 right-2 text-red-500"
          >
            <XCircle className="w-5 h-5" />
          </button>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCollectionItem;
