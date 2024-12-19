import { sortByList } from "@/components/specific/Product/product-page-searching";
import { IUseParams, useParamsUtil } from "@/hooks/use-params";

import ProductService from "@/services/modules/product.service";
import { dummyGetAllProductResponse } from "@/types/product/product.data";
import { GetAllProductResponse } from "@/types/product/product.model";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GetAllPostResponse } from "@/types/post/post.model";
import { dummyGetAllPostResponse } from "@/types/post/post.data";
import PostService from "@/services/modules/post.service";

export const usePostPageData = (props: IUseParams) => {
  const [data, setData] = useState<GetAllPostResponse>(
    dummyGetAllPostResponse
  );
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setData(dummyGetAllPostResponse);
    setLoading(true);

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
    const postService = new PostService();
    const { body } = await postService.getAllPost(params);
    if (body?.data) {
      setData(body.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [props.searchParams]);

  return { data, loading, fetchData };
};
