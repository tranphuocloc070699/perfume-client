import { CountryDto } from "../country/country.model";
import { ProductDto } from "../product/product.model";

export type BrandDto = {
  id: string;
  name: string;
  description: string;
  homepageLink: string;
  thumbnail: string;
  country: CountryDto;
  products: ProductDto[];
  createdAt: string;
  updatedAt: string;
};
