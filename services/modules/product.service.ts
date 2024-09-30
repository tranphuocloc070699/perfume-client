import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";
import { GetAllProductResponse } from "@/types/product/product.model";

class ProductService extends HttpFactory {
  async getAllProduct() {
    return this.call<ResponseDto<GetAllProductResponse>>({
      method: "GET",
      url: `/api/product`,
    });
  }
}

export default ProductService;
