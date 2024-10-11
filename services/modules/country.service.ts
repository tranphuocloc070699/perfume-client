// import "../../envConfig";

import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";

import { getClientOrServerUrl } from "@/lib/utils";
import { CountryDto } from "@/types/country/country.model";
class CountryService extends HttpFactory {
  async getAllCountry() {
    return this.call<ResponseDto<CountryDto[]>>({
      method: "GET",
      url: `${getClientOrServerUrl()}/country`,
    });
  }
}

export default CountryService;
