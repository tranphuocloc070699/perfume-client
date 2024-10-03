import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";
import { GetAllProductResponse, Product } from "@/types/product/product.model";
import "../../envConfig";
class ProductService extends HttpFactory {
  async getAllProduct() {
    console.log({ env: process.env.BACKEND_DOMAIN });
    console.log({});
    return this.call<ResponseDto<GetAllProductResponse>>({
      method: "GET",
      url: `http://localhost:8080/product`,
    });
  }

  async getAllProductId() {
    return this.call<ResponseDto<number[]>>({
      method: "GET",
      url: `/api/product/id`,
    });
  }

  async getProductById(id: number) {
    return this.call<ResponseDto<Product>>({
      method: "GET",
      url: `/api/product/${id}`,
    });
  }
}

export default ProductService;
