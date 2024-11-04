// import "../../envConfig";

import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";

import { getClientOrServerUrl } from "@/lib/utils";
import { CountryDto } from "@/types/country/country.model";
import { BrandDto } from "@/types/brand/brand.model";

class BrandService extends HttpFactory {
  async getAllBrand() {
    return this.call<ResponseDto<BrandDto[]>>({
      method: "GET",
      url: `${getClientOrServerUrl()}/brand`
    });
  }

  async createBrand(dto: BrandDto) {
    return this.call<ResponseDto<BrandDto>>({
      method: "POST",
      url: `${getClientOrServerUrl()}/brand`
    });
  }
}

export default BrandService;
