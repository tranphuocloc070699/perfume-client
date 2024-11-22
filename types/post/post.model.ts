import { CommentDto } from "@/types/comment/comment.model";
import { UserDto } from "@/types/user/user.model";
import { ProductDto } from "@/types/product/product.model";


export type PostDto = {
  id?: number;
  title: string;
  excerpt: string;
  content: string;
  isPinned: boolean;
  slug: string;
  type: string;
  thumbnail: string;
  votes?: number[];
  comments?: CommentDto[];
  user?: UserDto;
  createdAt?: string;
  updatedAt?: string;
}

export type GetAllPostResponse = {
  content: PostDto[];
  size: number;
  last: boolean;
  totalElements: number;
  totalPages: number;
};

export type GetAllPostRequest = {
  page?: number;
  title?: string;
  type?: string;
};
