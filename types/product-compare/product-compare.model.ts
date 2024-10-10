import { CommentDto } from "../comment/comment.model";
import { ProductDto } from "../product/product.model";

export type ProductCompareDto = {
  id: number;
  createdAt: string;
  updatedAt: string;
  product: ProductDto;
};

export type ProductCompareDetailDto = {
  id: number;
  productOriginal: ProductDto;
  productCompare: ProductDto;
  originalVotes: number[];
  compareVotes: number[];
  comments: CommentDto[];
};
