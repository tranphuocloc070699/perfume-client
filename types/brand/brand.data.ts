import { dummyCountryDto } from "../country/country.data";
import { BrandDto } from "./brand.model";

export const dummyBrandDto: BrandDto = {
  id: 0,
  name: "",
  description: "",
  homepageLink: "",
  thumbnail: "",
  country: dummyCountryDto,
  products: [],
  createdAt: "",
  updatedAt: "",
};
