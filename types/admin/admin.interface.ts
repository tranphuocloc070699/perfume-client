import { BrandDto } from "../brand/brand.model";
import { CountryDto } from "../country/country.model";
import { YearDto } from "../year/year.model";
import { ProductNoteDto } from "@/types/product-note/product-note.model";

export interface ITableHeader {
  name: string;
  type: string;
  className?: string;
}

export interface UpsaveProductDto {
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  galleries: string[];
  outfits: string[];
  topNotes: ProductNoteDto[];
  middleNotes: ProductNoteDto[];
  baseNotes: ProductNoteDto[];
  dateReleased: YearDto;
  brand: BrandDto;
  country: CountryDto;
}
