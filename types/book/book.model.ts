export type BookDto = {
  id?: number;
  name: string;
  description: string;
  link: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export type UpsaveBookDto = Omit<BookDto, "createdAt" | "updatedAt">

export type UpsaveBookValidation = {
  name?: string;
  link?: string;
  description?: string;
  thumbnailPreview?: File | null;
}
