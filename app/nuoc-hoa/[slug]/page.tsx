import React from "react";
import { fakeProductData } from "@/types/product/product.data";
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
const PerfumeDetail = () => {
  return (
    <div className="grid md:grid-cols-12">
      <section className="md:col-span-12 flex flex-col gap-4">
        <div className="mt-6">
          <ProductDetailGallery />
        </div>
        <h2 className="text-3xl text-slate-700 font-bold mt-6">
          {fakeProductData.title}
        </h2>
        <div className="mt-6 gap-4 grid grid-cols-1 md:grid-cols-2 grid-flow-row">
          <ProductDetailInfo />
          <ProductDetailPrice />
          <ProductDetailStory />
          <ProductDetailNotes />
          <div className="col-span-2">
            <OutfitSuitable />
          </div>
          <div className="col-span-2">
            <ProductDetailComparison />
          </div>
          <div className="col-span-2">
            <ProductDetailComment />
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
