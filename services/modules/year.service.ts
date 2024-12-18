// import "../../envConfig";

import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";

import { getClientOrServerUrl } from "@/lib/utils";
import { CountryDto } from "@/types/country/country.model";
import { YearDto } from "@/types/year/year.model";
import { UpsaveYearDto } from "@/types/year/year.interface";

class YearService extends HttpFactory {
  readonly PREFIX: string = "/year";

  async getAllYear() {
    return this.call<ResponseDto<YearDto[]>>({
      method: "GET",
      url: `${getClientOrServerUrl()}${this.PREFIX}`
    });
  }

  async createYear(data: UpsaveYearDto) {
    return this.call<ResponseDto<YearDto>>({
      method: "POST",
      url: `${getClientOrServerUrl()}${this.PREFIX}`,
      body: data
    });
  }
}

export default YearService;
