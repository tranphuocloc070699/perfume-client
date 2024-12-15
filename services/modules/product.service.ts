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

class ProductService extends HttpFactory {
  async getAllProduct(params: GetAllProductRequest) {
    return this.call<ResponseDto<GetAllProductResponse>>({
      method: "GET",
      url: `${getClientOrServerUrl()}/product`,
      params: Object.keys(params).length > 0 ? params : null
    });
  }

  async getAllProductId() {
    return this.call<ResponseDto<number[]>>({
      method: "GET",
      url: `${getClientOrServerUrl()}/product/id`
    });
  }

  async getProductById(id: number) {
    return this.call<ResponseDto<ProductDto>>({
      method: "GET",
      url: `${getClientOrServerUrl()}/product/${id}`
    });
  }

  async createProduct(dto: ProductDto) {
    return this.call<ResponseDto<ProductDto>>({
      method: "POST",
      url: `${getClientOrServerUrl()}/product`,
      body: dto
    });
  }

  async updateProduct(dto: ProductDto) {
    return this.call<ResponseDto<ProductDto>>({
      method: "PUT",
      url: `${getClientOrServerUrl()}/product/${dto.id}`,
      body: dto
    });
  }

  async deleteProduct(id: string) {
    return this.call<ResponseDto<ProductDto>>({
      method: "DELETE",
      url: `${getClientOrServerUrl()}/product/${id}`
    });
  }
}

export default ProductService;
