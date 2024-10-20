"use client";

import CommonPagination from "@/components/common/CommonPagination";
import ProductPageList from "@/components/specific/Product/ProductPageList";
import ProductPageSearching from "@/components/specific/Product/ProductPageSearching";
import ProductService from "@/services/modules/product.service";
import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  GetAllProductRequest,
  GetAllProductResponse,
} from "@/types/product/product.model";
import { dummyGetAllProductResponse } from "@/types/product/product.data";
import { useRouter } from "next/navigation";
import { getParams } from "@/lib/url";

const page = () => {
  const [data, setData] = useState<GetAllProductResponse>(
    dummyGetAllProductResponse
  );
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  useEffect(() => {
    // console.log({ searchParams });
    fetchData();
  }, [searchParams]);

  const fetchData = async () => {
    const params = getParams(searchParams);
    console.log("fetch data trigger...", params);
    const productService = new ProductService();
    const response = await productService.getAllProduct(params);
    if (response?.data) {
      setData(response.data);
    }
  };

  const currentPage = useMemo(() => {
    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    return currentPage;
  }, [searchParams]);

  const updateQueryParams = (newParams: any) => {
    const params = getParams(searchParams);
    let paramsModify: Record<string, any> = {};
    Object.keys(newParams).forEach((key) => {
      if (newParams[key] && newParams[key] != 0) {
        paramsModify[key] = newParams[key];
      }
    });
    if (Object.keys(paramsModify).length === 0) {
      return;
    }
    let paramsUpdated: any = {
      ...params,
      ...paramsModify,
    };
    console.log({ paramsUpdated });

    const path = `${pathName}?${new URLSearchParams(paramsUpdated)}`;
    // Update the router only when valid params are present
    router.push(path);
  };

  const onPageChange = (page: number) => {
    updateQueryParams({ page });
  };

  const onSearch = (request: GetAllProductRequest) => {
    console.log({ request });
    updateQueryParams({ ...request });
  };
  return (
    <div className="p-4">
      <h2 className="font-medium text-xl">Tìm kiếm toàn bộ nước hoa</h2>
      <div className="mt-2">
        <ProductPageSearching onSearch={onSearch} />
      </div>
      <div className="mt-10">
        <ProductPageList data={data.content} />
      </div>
      <div className="mt-10">
        <CommonPagination
          totalPages={data.totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default page;
