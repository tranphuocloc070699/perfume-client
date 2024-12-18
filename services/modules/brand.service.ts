// import "../../envConfig";

import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";

import { getClientOrServerUrl } from "@/lib/utils";
import { CountryDto } from "@/types/country/country.model";
import { BrandDto } from "@/types/brand/brand.model";

class BrandService extends HttpFactory {
  readonly PREFIX: string = "/brand";


  async getAllBrand() {
    return this.call<ResponseDto<BrandDto[]>>({
      method: "GET",
      url: `${getClientOrServerUrl()}${this.PREFIX}`
    });
  }

  async createBrand(dto: BrandDto) {
    return this.call<ResponseDto<BrandDto>>({
      method: "POST",
      url: `${getClientOrServerUrl()}${this.PREFIX}`,
      body: dto
    });
  }
}

export default BrandService;
