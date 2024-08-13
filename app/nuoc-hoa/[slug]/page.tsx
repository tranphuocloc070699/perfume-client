import React from "react";
import { fakeProductData } from "@/types/product/product.data";
import ProductDetailGallery from "@/components/specific/Product/Detail/ProductDetailGallery";
import ProductDetailInfo from "@/components/specific/Product/Detail/ProductDetailInfo";
import ProductDetailPrice from "@/components/specific/Product/Detail/ProductDetailPrice";
import ProductDetailNotes from "@/components/specific/Product/Detail/ProductDetailNotes";
import ProductDetailComparison from "@/components/specific/Product/Detail/ProductDetailComparison";
const PerfumeDetail = () => {
  return (
    <div className="grid md:grid-cols-12">
      <section className="md:col-span-9 flex flex-col gap-4">
        <div className="mt-6">
          <ProductDetailGallery />
        </div>
        <h2 className="text-3xl text-slate-700 font-bold mt-6">
          {fakeProductData.title}
        </h2>
        <div className="mt-6 grid md:gap-4 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
          <div className="col-span-1">
            <ProductDetailInfo />
          </div>
          <div className="col-span-1">
            <ProductDetailPrice />
          </div>
          <div className="col-span-1 md:col-span-3">
            <ProductDetailNotes />
          </div>
          <div className="md:col-span-3">
            <ProductDetailComparison />
          </div>
        </div>
      </section>
      <section className="md:col-span-3">Related product</section>
    </div>
  );
};

export default PerfumeDetail;
