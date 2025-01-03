import { dummyBrandDto } from "../brand/brand.data";
import { dummyCountryDto } from "../country/country.data";
import { dummyYearDto } from "../year/year.data";
import { GetAllProductResponse, ProductDto } from "./product.model";

export const dummyProductDto: ProductDto = {
  id: "",
  name: "",
  slug: "",
  description: "",
  fengShui: "",
  thumbnail: "",
  votes: [],
  comments: [],
  prices: [
    {
      "labelType": "VIETNAM_MARKET",
      "priceType": "VND",
      "value": "",
      "isSearch": true,
      "link": ""
    },
    {
      "labelType": "LISTED",
      "priceType": "USD",
      "value": "",
      "isSearch": true,
      "link": ""
    }
  ],
  createdAt: "",
  updatedAt: "",
  outfits: [],
  brand: dummyBrandDto,
  country: dummyCountryDto,
  galleries: [],
  topNotes: [],
  middleNotes: [],
  baseNotes: [],
  colors: [],
  productCompares: [],
  dateReleased: dummyYearDto
};

export const dummyGetAllProductResponse: GetAllProductResponse = {
  content: [],
  size: 0,
  last: true,
  totalElements: 0,
  totalPages: 0
};



