import { GetAllProductRequest, GetAllProductResponse } from "@/types/product/product.model";
import { useEffect, useState } from "react";
import { dummyGetAllProductResponse } from "@/types/product/product.data";
import { useParamsUtil } from "@/hooks/use-params";
import { sortByList } from "@/components/specific/Product/product-page-searching";
import ProductService from "@/services/modules/product.service";

export const useProductGalleryData = (props: GetAllProductRequest) => {
  const [data, setData] = useState<GetAllProductResponse>(
    dummyGetAllProductResponse
  );
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (props) {
      fetchData();
    }
  }, [props]);

  const fetchData = async () => {
    setData(dummyGetAllProductResponse);
    setLoading(true);
    const productService = new ProductService();
    const { body } = await productService.getAllProduct(props);
    if (body?.data) {
      setData(body.data);
    }
    setLoading(false);
  };

  return { data, loading };
};