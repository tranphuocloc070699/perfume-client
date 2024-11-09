import { GetAllPostResponse, PostDto } from "@/types/post/post.model";
import { CommentDto } from "@/types/comment/comment.model";
import { UserDto } from "@/types/user/user.model";
import { GetAllProductResponse } from "@/types/product/product.model";

export const dummyPostDto: PostDto = {
  title: "",
  excerpt: "",
  content: "",
  isPinned: false,
  type: "",
  thumbnail: "",
  slug: ""
};

export const dummyGetAllPostResponse: GetAllPostResponse = {
  content: [],
  size: 0,
  last: true,
  totalElements: 0,
  totalPages: 0
};

export const postTypeList = [{
  label: "Tin tức",
  value: "NEWS"
}, {
  label: "Kiến thức",
  value: "KNOWLEDGE"
}];