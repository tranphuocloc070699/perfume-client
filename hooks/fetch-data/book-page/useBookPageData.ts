import { sortByList } from "@/components/specific/Product/product-page-searching";
import { IUseParams, useParamsUtil } from "@/hooks/use-params";

import ProductService from "@/services/modules/product.service";
import { dummyGetAllProductResponse } from "@/types/product/product.data";
import { GetAllProductResponse } from "@/types/product/product.model";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BookDto } from "@/types/book/book.model";
import BookService from "@/services/modules/book.service";

export const useBookPageData = () => {
  const [data, setData] = useState<BookDto[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setData([]);
    setLoading(true);

    const bookService = new BookService();
    const { body } = await bookService.getAll();
    if (body?.data) {
      setData(body.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, fetchData };
};
