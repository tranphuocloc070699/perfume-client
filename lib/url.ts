import { GetAllProductRequest } from "@/types/product/product.model";
import { ReadonlyURLSearchParams } from "next/navigation";

export const getParams = (searchParams: ReadonlyURLSearchParams) => {
  let params: GetAllProductRequest = {
    page: 1,
  };

  const productName = searchParams.get("productName");

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const brandId = searchParams.get("brandId")
    ? Number(searchParams.get("brandId"))
    : null;
  const countryId = searchParams.get("countryId")
    ? Number(searchParams.get("countryId"))
    : null;

  if (currentPage > 0) params.page = currentPage;
  if (brandId) params.brandId = brandId;
  if (countryId) params.countryId = countryId;
  if (productName) params.productName = productName;

  return params;
};
