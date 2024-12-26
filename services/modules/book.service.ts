import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";
import { getClientOrServerUrl } from "@/lib/utils";
import { CollectionDto, UpdateCollectionIndex, UpsaveCollection } from "@/types/collection/collection.model";
import { BookDto, UpsaveBookDto } from "@/types/book/book.model";

class BookService extends HttpFactory {
  readonly PREFIX: string = "/book";

  async getAll() {
    return this.call<ResponseDto<BookDto[]>>({
      method: "GET",
      url: `${getClientOrServerUrl()}${this.PREFIX}`
    });
  }

  async getById(id: number) {
    return this.call<ResponseDto<BookDto>>({
      method: "GET",
      url: `${getClientOrServerUrl()}${this.PREFIX}/${id}`
    });
  }

  async create(request: UpsaveBookDto) {
    return this.call<ResponseDto<BookDto>>({
      method: "POST",
      url: `${getClientOrServerUrl()}${this.PREFIX}`,
      body: request
    });
  }

  async update(id: number, request: UpsaveBookDto) {
    return this.call<ResponseDto<CollectionDto>>({
      method: "PUT",
      url: `${getClientOrServerUrl()}${this.PREFIX}/${id}`,
      body: request
    });
  }


  async delete(id: number) {
    return this.call<ResponseDto<BookDto>>({
      method: "DELETE",
      url: `${getClientOrServerUrl()}${this.PREFIX}/${id}`
    });
  }


}

export default BookService;
