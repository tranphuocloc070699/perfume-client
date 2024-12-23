import React from "react";
import ProductCollectionItem from "@/components/specific/Collection/product-collection-item";

type ProductCollectionListProps = {
  openProductGalleryModal: (index: number) => void
}

const ProductCollectionList = ({ openProductGalleryModal }: ProductCollectionListProps) => {
  return (
    <div component-name="ProductCollectionList" className={"grid gap-6 grid-cols-4"}>
      {Array.from({ length: 4 }, (_, index) => index + 1).map((_, index) => (
        <ProductCollectionItem product={null} key={index}
                               openProductGalleryModal={() => openProductGalleryModal(index)} />))}
    </div>
  );
};

export default ProductCollectionList;