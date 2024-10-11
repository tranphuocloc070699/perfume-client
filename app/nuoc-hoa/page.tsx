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

const page = () => {
  const [data, setData] = useState<GetAllProductResponse>(
    dummyGetAllProductResponse
  );
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const fetchData = async () => {
    const params = getParams();

    const paramsModify = {
      ...params,
      page: params.page && params.page > 0 ? params.page - 1 : params.page,
    };

    const productService = new ProductService();
    const response = await productService.getAllProduct(paramsModify);
    if (response?.data) {
      setData(response.data);
    }
  };

  const getParams = () => {
    let params: GetAllProductRequest = {
      page: 1,
    };

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    const brandId = searchParams.get("brand")
      ? Number(searchParams.get("brand"))
      : null;
    const countryId = searchParams.get("country")
      ? Number(searchParams.get("country"))
      : null;

    if (currentPage > 0) params.page = currentPage - 1;
    if (brandId) params.brandId = brandId;
    if (countryId) params.countryId = countryId;

    return params;
  };

  const currentPage = useMemo(() => {
    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    return currentPage;
  }, [searchParams]);

  const updateQueryParams = (newParams: any) => {
    const params = getParams();

    // Filter out empty or falsy values from newParams
    let paramsModify: Record<string, any> = {};
    Object.keys(newParams).forEach((key) => {
      if (newParams[key] && newParams[key] != 0) {
        // Check if the value is truthy
        paramsModify[key] = newParams[key];
      }
    });

    // If there are no valid params to update, return early
    if (Object.keys(paramsModify).length === 0) {
      return; // No need to update the router if newParams is empty or invalid
    }

    // Merge existing params with the valid newParams
    console.log({ params });
    console.log({ paramsModify });
    let paramsUpdated: any = {
      ...params,
      ...paramsModify, // Use only the filtered params
    };

    // Update the router only when valid params are present
    router.push(`${pathName}?${new URLSearchParams(paramsUpdated)}`);
  };

  const onPageChange = (page: number) => {
    updateQueryParams({ page });
  };

  const onSearch = (request: GetAllProductRequest) => {
    updateQueryParams(request);
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
