import { BrandDto } from "../brand/brand.model";
import { CommentDto } from "../comment/comment.model";
import { CountryDto } from "../country/country.model";
import { ProductCompareDto } from "../product-compare/product-compare.model";
import { ProductNoteDto } from "../product-note/product-note.model";
import { ProductPriceDto } from "../product-price/product-price.model";
import { UserDto } from "../user/user.model";
import { YearDto } from "../year/year.model";

export type ProductDto = {
  id: string;
  name: string;
  slug: string;
  description: string;
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
  productCompares: ProductCompareDto[];

  dateReleased: YearDto;
};

export type GetAllProductResponse = {
  content: ProductDto[];
  size: number;
  totalElements: number;
  totalPages: number;
};
