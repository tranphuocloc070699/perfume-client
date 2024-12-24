import React from "react";
import ProductCollectionItem from "@/components/specific/Collection/product-collection-item";
import { CollectionProductDto } from "@/types/collection/collection.model";

type ProductCollectionListProps = {
  openProductGalleryModal: (index: number) => void
  collectionProducts: CollectionProductDto[];
  onRemoveProductCollection: (productCollectionIndex: number, event: React.MouseEvent<HTMLButtonElement>) => void

}

const ProductCollectionList = ({
                                 openProductGalleryModal,
                                 collectionProducts,
                                 onRemoveProductCollection
                               }: ProductCollectionListProps) => {
  return (
    <div component-name="ProductCollectionList" className={"grid gap-6 grid-cols-4"}>
      {collectionProducts.map((collectionProduct, index) => (
        <ProductCollectionItem size={collectionProducts.length} collectionProduct={collectionProduct} key={index}
                               openProductGalleryModal={() => openProductGalleryModal(index)}
                               onRemoveProductCollection={(event) => onRemoveProductCollection(index, event)} />))}
    </div>
  );
};

export default ProductCollectionList;