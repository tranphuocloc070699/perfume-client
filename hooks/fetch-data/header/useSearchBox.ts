import { ISearchResultList } from "@/components/specific/Header/SearchResultBox";
import { sortByList } from "@/components/specific/Product/ProductPageSearching";
import { IUseParams, useParamsUtil } from "@/hooks/use-params";

import ProductService from "@/services/modules/product.service";
import { dummyGetAllProductResponse } from "@/types/product/product.data";
import { GetAllProductResponse } from "@/types/product/product.model";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IUseSearchBoxParams {
  searchInput: string;
}

export const useSearchBoxData = () => {
  const [data, setData] = useState<ISearchResultList[]>([
    {
      title: "Nước hoa",
      children: [],
    },
  ]);
  const [loading, setLoading] = useState(true);
  const execute = async (props: IUseSearchBoxParams) => {
    setData([
      {
        title: "Nước hoa",
        children: [],
      },
    ]);
    setLoading(true);

    const productService = new ProductService();
    const response = await productService.getAllProduct({
      productName: props.searchInput,
    });
    if (response?.data) {
      setData([
        {
          title: "Nước hoa",
          children: response.data.content.map((item) => ({
            title: item.name,
            link: `/nuoc-hoa/${item.slug}-${item.id}`,
          })),
        },
      ]);
    }

    setLoading(false);
  };

  return { data, loading, execute };
};
