import { dummyBrandDto } from "../brand/brand.data";
import { dummyCountryDto } from "../country/country.data";
import { dummyYearDto } from "../year/year.data";
import { ProductDto } from "./product.model";

export const dummyProductDto: ProductDto = {
  id: 0,
  name: "",
  slug: "",
  description: "",
  thumbnail: "",
  votes: [],
  comments: [],
  prices: [],
  createdAt: "",
  updatedAt: "",
  outfits: [],
  brand: dummyBrandDto,
  country: dummyCountryDto,
  galleries: [],
  topNotes: [],
  middleNotes: [],
  baseNotes: [],
  productCompares: [],
  dateReleased: dummyYearDto,
};
