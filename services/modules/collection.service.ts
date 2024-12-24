import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";
import { getClientOrServerUrl } from "@/lib/utils";
import { CollectionDto, UpsaveCollection } from "@/types/collection/collection.model";

class CollectionService extends HttpFactory {
  readonly PREFIX: string = "/collection";

  async getAll() {
    return this.call<ResponseDto<CollectionDto[]>>({
      method: "GET",
      url: `${getClientOrServerUrl()}${this.PREFIX}`
    });
  }

  async create(request: UpsaveCollection) {
    return this.call<ResponseDto<CollectionDto>>({
      method: "POST",
      url: `${getClientOrServerUrl()}${this.PREFIX}`,
      body: request
    });
  }

  async update(id: number, request: UpsaveCollection) {
    return this.call<ResponseDto<CollectionDto>>({
      method: "PUT",
      url: `${getClientOrServerUrl()}${this.PREFIX}/${id}`,
      body: request
    });
  }

  async delete(id: number) {
    return this.call<ResponseDto<CollectionDto>>({
      method: "DELETE",
      url: `${getClientOrServerUrl()}${this.PREFIX}/${id}`
    });
  }


}

export default CollectionService;
