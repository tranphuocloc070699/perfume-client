// import "../../envConfig";

import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";
import {
  GetAllProductRequest,
  GetAllProductResponse,
  ProductDto
} from "@/types/product/product.model";

import { getClientOrServerUrl } from "@/lib/utils";
import { BrandDto } from "@/types/brand/brand.model";
import { UpsaveProductDto } from "@/types/admin/admin.interface";
import { GetAllPostRequest, GetAllPostResponse, PostDto } from "@/types/post/post.model";

class ProductService extends HttpFactory {

  PREFIX: string = "/post";

  async getAllPost(params: GetAllPostRequest) {
    return this.call<ResponseDto<GetAllPostResponse>>({
      method: "GET",
      url: `${getClientOrServerUrl()}${this.PREFIX}`,
      params: Object.keys(params).length > 0 ? params : null
    });
  }

  async getAllPostId() {
    return this.call<ResponseDto<number[]>>({
      method: "GET",
      url: `${getClientOrServerUrl()}${this.PREFIX}/id`
    });
  }

  async getPostById(id: Number) {
    return this.call<ResponseDto<PostDto>>({
      method: "GET",
      url: `${getClientOrServerUrl()}${this.PREFIX}/${id}`
    });
  }

  async createPost(dto: PostDto) {
    return this.call<ResponseDto<PostDto>>({
      method: "POST",
      url: `${getClientOrServerUrl()}${this.PREFIX}`,
      body: dto
    });
  }

  async updatePost(dto: PostDto) {
    return this.call<ResponseDto<PostDto>>({
      method: "PUT",
      url: `${getClientOrServerUrl()}${this.PREFIX}/${dto.id}`,
      body: dto
    });
  }

  async deletePost(id: string) {
    return this.call<ResponseDto<PostDto>>({
      method: "DELETE",
      url: `${getClientOrServerUrl()}${this.PREFIX}/${id}`
    });
  }
}

export default ProductService;
