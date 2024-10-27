import React, { useMemo } from "react";

import ProductDetailGallery from "@/components/specific/Product/Detail/ProductDetailGallery";
import ProductDetailInfo from "@/components/specific/Product/Detail/ProductDetailInfo";
import ProductDetailPrice from "@/components/specific/Product/Detail/ProductDetailPrice";
import ProductDetailNotes from "@/components/specific/Product/Detail/ProductDetailNotes";
import ProductDetailComparison from "@/components/specific/Product/Detail/ProductDetailComparison";
import ProductDetailStory from "@/components/specific/Product/Detail/ProductDetailStory";
import OutfitSuitable from "@/components/specific/Product/Detail/OutfitSuitable.product-detail";
import WriteComment from "@/components/common/modal/WriteComment";
import ProductDetailComment from "@/components/specific/Product/Detail/ProductDetailComment";
import ProductRelated from "@/components/specific/Product/Detail/Related/ProductRelated";
import ProductService from "@/services/modules/product.service";
import { extractIdFromUrl } from "@/lib/utils";
import { IProductCardLineProps } from "@/components/common/ProductCardLine";
export const dynamicParams = true;
const productService = new ProductService();
export async function generateStaticParams() {
  const { data } = await productService.getAllProductId();
  return data;
}

const PerfumeDetail = async (params: any) => {
  const id = extractIdFromUrl(params?.params?.slug);
  const { data, errors } = await productService.getProductById(Number(id));

  const productDetailInfoData = () => {
    const detailInfoList: IProductCardLineProps[] = [];

    detailInfoList.push({
      label: "Năm sản xuất",
      value: data?.dateReleased?.value,
      link: `/nuoc-hoa/nam/${data?.dateReleased?.value}`,
    });
    detailInfoList.push({
      label: "Thương hiệu",
      value: data?.brand?.name,
      link: `/thuong-hieu/${data?.brand?.id}`,
    });
    detailInfoList.push({
      label: "Quốc gia",
      value: data?.country?.name,
      link: `/thuong-hieu/${data?.brand?.id}`,
    });

    return detailInfoList;
  };

  return (
    <div className="grid md:grid-cols-12">
      <section className="md:col-span-12 flex flex-col gap-4">
        <div className="mt-6">
          <ProductDetailGallery galleries={data?.galleries} />
        </div>
        <h2 className="text-3xl text-slate-700 font-bold mt-6 px-4 md:px-0">
          {data?.name}
        </h2>
        <div className="mt-6 gap-4 grid grid-cols-12 grid-flow-row">
          <div className="2xl:col-span-4 md:col-span-6 col-span-12">
            <ProductDetailInfo data={productDetailInfoData()} />
          </div>
          <div className="2xl:col-span-4 md:col-span-6 col-span-12">
            <ProductDetailPrice prices={data?.prices} />
          </div>

          <div className="2xl:col-span-4 md:col-span-6 col-span-12">
            <ProductDetailNotes
              topNotes={data?.topNotes}
              middleNotes={data?.middleNotes}
              baseNotes={data?.baseNotes}
            />
          </div>

          <div className="2xl:col-span-12 md:col-span-6 col-span-12">
            <ProductDetailStory content={data?.description} />
          </div>
          <div className="col-span-12">
            <OutfitSuitable outfits={data?.outfits} />
          </div>
          <div className="col-span-12">
            <ProductDetailComparison productCompares={data?.productCompares} />
          </div>
          <div className="col-span-12">
            <ProductDetailComment comments={data?.comments} />
          </div>
        </div>
      </section>
      {/* <section className="md:col-span-3">
        <ProductRelated />
      </section> */}
    </div>
  );
};

export default PerfumeDetail;
