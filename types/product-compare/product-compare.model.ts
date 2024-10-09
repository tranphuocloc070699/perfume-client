import { ProductDto } from "../product/product.model";

export type ProductCompareDto = {
  id: number;
  createdAt: string;
  updatedAt: string;
  product: ProductDto;
};
