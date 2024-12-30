import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";
import { getClientOrServerUrl } from "@/lib/utils";
import { ColorDto } from "@/types/color/color.model";

class ColorService extends HttpFactory {
  readonly PREFIX: string = "/colors";

  async getAllColors() {
    return this.call<ResponseDto<ColorDto[]>>({
      method: "GET",
      url: `${getClientOrServerUrl()}${this.PREFIX}`
    });
  }

  async getColorById(id: string) {
    return this.call<ResponseDto<ColorDto>>({
      method: "GET",
      url: `${getClientOrServerUrl()}${this.PREFIX}/${id}`
    });
  }

  async createColor(color: ColorDto) {
    return this.call<ResponseDto<ColorDto>>({
      method: "POST",
      url: `${getClientOrServerUrl()}${this.PREFIX}`,
      body: color
    });
  }

  async updateColor(id: string, color: ColorDto) {
    return this.call<ResponseDto<ColorDto>>({
      method: "PUT",
      url: `${getClientOrServerUrl()}${this.PREFIX}/${id}`,
      body: color
    });
  }

  async deleteColor(id: string) {
    return this.call<ResponseDto<null>>({
      method: "DELETE",
      url: `${getClientOrServerUrl()}${this.PREFIX}/${id}`
    });
  }
}

export default ColorService;