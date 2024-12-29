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
import BreadcumbList, { BreadcrumbItem } from "@/components/ui/breadcumb-list";
import NextImg from "next/image";
import Typography from "@/components/ui/typography";
import ProductDetailBadge from "@/components/specific/Product/Detail/product-detail-badge";
import Examination from "@/components/specific/Product/Detail/examination";
import Icon from "@/components/ui/icon";
import ProductInteractions from "@/components/specific/Product/Detail/product-interaction";
import CountingIcon from "@/components/common/counting-icon";
import UnderlineTab from "@/components/specific/Product/Detail/underline-tab";
import MasonryImageList from "@/components/specific/Product/Detail/masonry-image-list";

export const dynamicParams = true;
const productService = new ProductService();

export async function generateStaticParams() {
  const { body } = await productService.getAllProductId();
  return body.data;
}

const PerfumeDetail = async (params: any) => {
  const id = extractIdFromUrl(params?.params?.slug);
  const { body: { data } } = await productService.getProductById(Number(id));

  const breadcumbItems: BreadcrumbItem[] = [{
    title: "Trang chủ",
    link: "/"
  }, { title: "Nước hoa", link: "/nuoc-hoa" }, { title: data?.name }];

  const tabs = [
    {
      id: "description",
      label: "Thông tin sản phẩm",
      content: <p>{data.description}</p>
    },
    {
      id: "feng-shui",
      label: "Phong thủy",
      content: <p>Here are customer reviews.</p>
    }

  ];

  const interactionItems = [
    {
      text: "Sản phẩm này có 20 bình luận",
      icon: "moveRight", // Icon name
      actionText: "Xem bình luận",
      moveTo: "comments"
    },
    {
      text: "So sánh với những sản phẩm khác",
      icon: "moveRight", // Icon name
      actionText: "Xem 30 so sánh",
      moveTo: "comparison"
    }
  ];


  return (
    <div className={"mt-10"}>
      <BreadcumbList className={"px-4"} items={breadcumbItems} />
      <div className={"mt-4 grid grid-cols-12 md:gap-10 px-4"}>
        <NextImg src={data.thumbnail} alt={data.name} width={200} height={200}
                 className={"object-cover bg-gray-100 w-full  rounded shadow   md:h-[500px] h-[400px] md:col-span-4 col-span-12 "}
                 quality={100} priority={true} />

        <div className={"md:col-span-5 col-span-12 md:mt-0 mt-10"}>
          <Typography.Label className={"underline underline-offset-2"}>{data.brand.name}</Typography.Label>
          <Typography.H3 className={"flex items-baseline justify-between gap-4"}>{data.name}
            <CountingIcon icon={"emptyHeart"} counting={30} />
          </Typography.H3>

          <div className={"flex items-center gap-4 flex-wrap mt-2"}>
            <ProductDetailBadge label={"Sản xuất năm"} value={data.dateReleased.value.toString()} />
            <ProductDetailBadge label={"Quốc gia"} value={data.country.name} />
          </div>
          <ProductInteractions items={interactionItems} />
          <ProductDetailPrice prices={data?.prices} />
          <Examination description={`Bạn đã trải nghiệm mùi hương của ${data.name} chưa?`} title={"Xin chào"}
                       className={"mt-10"} />

        </div>
        <div className={"md:col-span-3 col-span-12 md:mt-0 mt-10"}>
          <ProductDetailNotes
            topNotes={data?.topNotes}
            middleNotes={data?.middleNotes}
            baseNotes={data?.baseNotes}
          />
        </div>
      </div>

      <div className={"flex flex-col gap-20  px-4"}>
        <UnderlineTab tabs={tabs} />
        <ProductDetailComparison productCompares={data?.productCompares} />
        <ProductDetailComment comments={data?.comments} productName={data?.name} />
        <MasonryImageList images={data?.galleries} productName={data?.name} />
      </div>

    </div>
  );
};

export default PerfumeDetail;
