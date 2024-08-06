import React from "react";
import { fakeProductData } from "@/types/product/product.data";
import ProductDetailGallery from "@/components/specific/Product/Detail/ProductDetailGallery";
import ProductDetailInfo from "@/components/specific/Product/Detail/ProductDetailInfo";
const PerfumeDetail = () => {
  return (
    <div className="grid md:grid-cols-12">
      <section className="md:col-span-9 flex flex-col gap-2">
        <div className="mt-6">
          <ProductDetailGallery />
        </div>
        <h2 className="text-2xl text-slate-700 font-semibold mt-6">
          {fakeProductData.title}
        </h2>
        <ProductDetailInfo />
      </section>
      <section className="md:col-span-3">Related product</section>
    </div>
  );
};

export default PerfumeDetail;
