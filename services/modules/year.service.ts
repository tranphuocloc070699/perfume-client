// import "../../envConfig";

import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";

import { getClientOrServerUrl } from "@/lib/utils";
import { CountryDto } from "@/types/country/country.model";
import { YearDto } from "@/types/year/year.model";
class YearService extends HttpFactory {
  async getAllYear() {
    return this.call<ResponseDto<YearDto[]>>({
      method: "GET",
      url: `${getClientOrServerUrl()}/year`,
    });
  }
}

export default YearService;
