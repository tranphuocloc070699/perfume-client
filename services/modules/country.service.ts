// import "../../envConfig";

import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";

import { getClientOrServerUrl } from "@/lib/utils";
import { CountryDto } from "@/types/country/country.model";
import { BrandDto } from "@/types/brand/brand.model";

class CountryService extends HttpFactory {
  async getAllCountry() {
    return this.call<ResponseDto<CountryDto[]>>({
      method: "GET",
      url: `${getClientOrServerUrl()}/country`
    });
  }

  async createCountry(dto: CountryDto) {
    return this.call<ResponseDto<CountryDto>>({
      method: "POST",
      url: `${getClientOrServerUrl()}/country`,
      body: dto
    });
  }

}

export default CountryService;
