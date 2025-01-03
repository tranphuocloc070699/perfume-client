import { ISearchResultList } from "@/components/specific/Header/search-result-box";
import { sortByList } from "@/components/specific/Product/product-page-searching";
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
      children: []
    }
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const execute = async (props: IUseSearchBoxParams) => {
    // setData([
    //   {
    //     title: "Nước hoa",
    //     children: []
    //   }
    // ]);
    setLoading(true);

    const productService = new ProductService();
    const { body } = await productService.getAllProduct({
      productName: props.searchInput
    });
    if (body?.data) {
      setData([
        {
          title: "Nước hoa",
          children: body.data.content.map((item) => ({
            title: item.name,
            link: `/nuoc-hoa/${item.slug}-${item.id}`
          }))
        }
      ]);
    }

    setLoading(false);
  };

  return { data, loading, setLoading, execute };
};
