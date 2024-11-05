import { BrandDto } from "../brand/brand.model";
import { ProductDto } from "../product/product.model";

export type CountryDto = {
  id?: number;
  name: string;
  code: string;
  thumbnail: string;
  products: ProductDto[];
  brands: BrandDto[];
  createdAt: string;
  updatedAt: string;
};
