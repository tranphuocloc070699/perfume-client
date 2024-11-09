import { dummyBrandDto } from "../brand/brand.data";
import { dummyCountryDto } from "../country/country.data";
import { dummyYearDto } from "../year/year.data";
import { UpsaveProductDto } from "./admin.interface";

const yearNow = new Date().getFullYear();
export const validYears: number[] = Array.from(
  { length: yearNow - 1900 + 1 },
  (_, index) => 1900 + index
);

export const dummyUpsaveProductDto: UpsaveProductDto = {
  name: "",
  slug: "",
  description: "",
  thumbnail: "",
  galleries: [],
  outfits: [],
  brand: dummyBrandDto,
  dateReleased: dummyYearDto,
  country: dummyCountryDto,
  topNotes: [],
  middleNotes: [],
  baseNotes: [],
  prices: [
    {
      labelType: "VIETNAM_MARKET",
      priceType: "VND",
      value: "",
      isSearch: true,
      link: "",
      createdAt: "",
      updatedAt: ""
    }, {
      labelType: "LISTED",
      priceType: "USD",
      value: "",
      isSearch: true,
      link: "",
      createdAt: "",
      updatedAt: ""
    }
  ]
};
