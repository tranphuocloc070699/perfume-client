import { IUseParams, useParamsUtil } from "@/hooks/use-params";

import ProductService from "@/services/modules/product.service";
import { dummyGetAllProductResponse } from "@/types/product/product.data";
import { GetAllProductResponse } from "@/types/product/product.model";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const usePerfumePageData = (props: IUseParams) => {
  const [data, setData] = useState<GetAllProductResponse>(
    dummyGetAllProductResponse
  );
  const fetchData = async () => {
    const { getParams } = useParamsUtil(props);

    const params = getParams(props.searchParams);
    const productService = new ProductService();
    const response = await productService.getAllProduct(params);
    if (response?.data) {
      setData(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.searchParams]);

  return { data };
};
