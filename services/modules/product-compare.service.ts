import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";
import { getClientOrServerUrl } from "@/lib/utils";
import { ProductCompareDetailDto } from "@/types/product-compare/product-compare.model";

class ProductCompareService extends HttpFactory {


  async getProductCompareById(id: number) {
    return this.call<ResponseDto<ProductCompareDetailDto>>({
      method: "GET",
      url: `${getClientOrServerUrl()}/product/product-compare/${id}`
    });
  }
}

export default ProductCompareService;
