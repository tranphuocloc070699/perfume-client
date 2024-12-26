import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";

import { getClientOrServerUrl } from "@/lib/utils";
import { CountryDto } from "@/types/country/country.model";
import { BrandDto } from "@/types/brand/brand.model";
import { MediaDto } from "@/types/media/media.model";

class MediaService extends HttpFactory {
  readonly PREFIX: string = "/media";

  async getAllMedia() {
    return this.call<ResponseDto<MediaDto[]>>({
      method: "GET",
      url: `${getClientOrServerUrl()}${this.PREFIX}`
    });
  }

  async uploadImage(uploadDir: string, file: File) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("uploadDir", uploadDir);

    return this.call<ResponseDto<string>>({
      method: "POST",
      url: `${getClientOrServerUrl()}${this.PREFIX}`,
      body: formData
    });
  }


}

export default MediaService;
