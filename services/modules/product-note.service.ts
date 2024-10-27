// import "../../envConfig";

import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";
import {
  GetAllProductRequest,
  GetAllProductResponse,
  ProductDto,
} from "@/types/product/product.model";

import { getClientOrServerUrl } from "@/lib/utils";
import { ProductNoteDto } from "@/types/product-note/product-note.model";
class ProductNoteService extends HttpFactory {
  async getAllProductNote() {
    return this.call<ResponseDto<ProductNoteDto[]>>({
      method: "GET",
      url: `${getClientOrServerUrl()}/notes`,
    });
  }
}

export default ProductNoteService;
