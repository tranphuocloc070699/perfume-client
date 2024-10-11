// import "../../envConfig";

import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";
import {
  GetAllProductRequest,
  GetAllProductResponse,
  ProductDto,
} from "@/types/product/product.model";

import { getClientOrServerUrl } from "@/lib/utils";
class ProductService extends HttpFactory {
  async getAllProduct(params: GetAllProductRequest) {
    return this.call<ResponseDto<GetAllProductResponse>>({
      method: "GET",
      url: `${getClientOrServerUrl()}/product`,
      params,
    });
  }

  async getAllProductId() {
    return this.call<ResponseDto<number[]>>({
      method: "GET",
      url: `${getClientOrServerUrl()}/product/id`,
    });
  }

  async getProductById(id: number) {
    return this.call<ResponseDto<ProductDto>>({
      method: "GET",
      url: `${getClientOrServerUrl()}/product/${id}`,
    });
  }
}

export default ProductService;
