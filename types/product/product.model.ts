import { BrandDto } from "../brand/brand.model";
import { CommentDto } from "../comment/comment.model";
import { CountryDto } from "../country/country.model";
import { ProductCompareDto } from "../product-compare/product-compare.model";
import { ProductNoteDto } from "../product-note/product-note.model";
import { ProductPriceDto } from "../product-price/product-price.model";
import { UserDto } from "../user/user.model";
import { YearDto } from "../year/year.model";
import { ColorDto } from "@/types/color/color.model";

export type ProductDto = {
  id: string;
  name: string;
  slug: string;
  description: string;
  fengShui: string;
  thumbnail: string;
  votes: UserDto[];
  comments: CommentDto[];
  prices: ProductPriceDto[];
  createdAt: string;
  updatedAt: string;
  outfits: string[];
  brand: BrandDto;
  country: CountryDto;
  galleries: string[];
  topNotes: ProductNoteDto[];
  middleNotes: ProductNoteDto[];
  baseNotes: ProductNoteDto[];
  colors: ColorDto[];
  productCompares: ProductCompareDto[];
  dateReleased: YearDto;
};

export type GetAllProductResponse = {
  content: ProductDto[];
  size: number;
  last: boolean;
  totalElements: number;
  totalPages: number;
};

export type GetAllProductRequest = {
  page?: number;
  productName?: string;
  brandId?: number;
  countryId?: number;
  notesIds?: number[];
  sortBy?: number;
};
