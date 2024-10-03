import { Media } from "../media/media.model";

export type Product = {
  id: string;
  name: string;
  exceprt: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: Media;
  stylesThumbnail: string[];
  gallery: string[];
  dateReleased: string;
};

export type GetAllProductResponse = {
  content: Product[];
  size: number;
  totalElements: number;
  totalPages: number;
};
