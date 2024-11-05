import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";

import { getClientOrServerUrl } from "@/lib/utils";
import { CountryDto } from "@/types/country/country.model";
import { BrandDto } from "@/types/brand/brand.model";
import { MediaDto } from "@/types/media/media.model";

class MediaService extends HttpFactory {
  async getAllMedia() {
    return this.call<ResponseDto<MediaDto[]>>({
      method: "GET",
      url: `${getClientOrServerUrl()}/media`
    });
  }

  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    return this.call<ResponseDto<string>>({
      method: "POST",
      url: `/api/media`,
      body: formData
    });
  }
}

export default MediaService;
