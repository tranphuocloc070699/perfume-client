import { CollectionDto } from "@/types/collection/collection.model";
import { dummyProductDto } from "@/types/product/product.data";

export const dummyCollectionDto: CollectionDto = {
  icon: "",
  title: "",
  collectionProducts: Array.from({ length: 4 }, (_, index) => index + 1).map((_, index) => ({
    index: index,
    product: dummyProductDto
  }))
};