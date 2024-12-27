import React from "react";

import ProductDetailGallery from "@/components/specific/Product/Detail/product-detail-gallery";
import ProductDetailInfo from "@/components/specific/Product/Detail/product-detail-info";
import ProductDetailPrice from "@/components/specific/Product/Detail/product-detail-price";
import ProductDetailNotes from "@/components/specific/Product/Detail/ProductDetailNotes";
import ProductDetailComparison from "@/components/specific/Product/Detail/product-detail-comparison";
import ProductDetailStory from "@/components/specific/Product/Detail/product-detail-story";
import OutfitSuitable from "@/components/specific/Product/Detail/outfit-suitable";
import ProductDetailComment from "@/components/specific/Product/Detail/ProductDetailComment";
import ProductService from "@/services/modules/product.service";
import { extractIdFromUrl } from "@/lib/utils";
import { IProductCardLineProps } from "@/components/common/product-card-line";
import PageNavigation from "@/components/specific/Header/page-navigation";

export const dynamicParams = true;
const productService = new ProductService();

export async function generateStaticParams() {
  const { body } = await productService.getAllProductId();
  return body.data;
}

const PerfumeDetail = async (params: any) => {
  const id = extractIdFromUrl(params?.params?.slug);
  const { body: { data } } = await productService.getProductById(Number(id));

  const productDetailInfoData = () => {
    const detailInfoList: IProductCardLineProps[] = [];

    detailInfoList.push({
      label: "Năm sản xuất",
      value: data?.dateReleased?.value,
      link: `/nuoc-hoa/nam/${data?.dateReleased?.value}`
    });
    detailInfoList.push({
      label: "Thương hiệu",
      value: data?.brand?.name,
      link: `/thuong-hieu/${data?.brand?.id}`
    });
    detailInfoList.push({
      label: "Quốc gia",
      value: data?.country?.name,
      link: `/thuong-hieu/${data?.brand?.id}`
    });

    return detailInfoList;
  };

  return (
    <div>
      <PageNavigation />
    </div>
  );
};

export default PerfumeDetail;
