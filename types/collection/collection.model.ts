import { ProductDto } from "@/types/product/product.model";
import { icons } from "@/components/ui/icon";

export type CollectionDto = {
  id?: number;
  title: string;
  icon: keyof typeof icons | string;
  collectionProducts: CollectionProductDto[]
};


export type CollectionProductDto = {
  index: number;
  product: ProductDto
}


export type UpsaveCollectionProduct = {
  index: number;
  productId: number;
}

export type UpsaveCollection = {
  title: string;
  icon: string;
  collectionProducts: UpsaveCollectionProduct[]
}

export type UpdateCollectionIndex = {
  collectionId: number;
  index: number;
}


