import { sortByList } from "@/components/specific/Product/ProductPageSearching";
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

    let params = getParams(props.searchParams);
    if (params?.sortByType) {
      const index = sortByList.findIndex(
        (item) => item.value.toString() == params.sortByType
      );
      if (index >= 0) {
        const sortByItem = sortByList[index].query;
        params = { ...params, ...sortByItem };
        delete params?.sortByType;
      }
    }
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
