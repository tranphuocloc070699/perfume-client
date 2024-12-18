// import "../../envConfig";

import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";

import { getClientOrServerUrl } from "@/lib/utils";
import { CountryDto } from "@/types/country/country.model";
import { BrandDto } from "@/types/brand/brand.model";

class CountryService extends HttpFactory {
  readonly PREFIX: string = "/country";

  async getAllCountry() {
    return this.call<ResponseDto<CountryDto[]>>({
      method: "GET",
      url: `${getClientOrServerUrl()}${this.PREFIX}`
    });
  }

  async createCountry(dto: CountryDto) {
    return this.call<ResponseDto<CountryDto>>({
      method: "POST",
      url: `${getClientOrServerUrl()}${this.PREFIX}`,
      body: dto
    });
  }

}

export default CountryService;
