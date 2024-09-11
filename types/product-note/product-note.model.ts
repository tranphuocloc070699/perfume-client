export type ProductNoteCategory = {
  id: string;
  title: string;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductNote = {
  id: string;
  title: string;

  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  category: ProductNoteCategory;
};
