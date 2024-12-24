import { ProductDto } from "@/types/product/product.model";

export type CollectionDto = {
  id?: number;
  title: string;
  icon: string;
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


