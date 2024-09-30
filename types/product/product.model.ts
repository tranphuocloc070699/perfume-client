import { Media } from "../media/media.model";

export type Product = {
  id: string;
  title: string;
  exceprt: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  thumnail: Media;
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
