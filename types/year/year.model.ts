import { ProductDto } from "../product/product.model";

export type YearDto = {
  id?: number;
  value: number;
  products: ProductDto[];
};
