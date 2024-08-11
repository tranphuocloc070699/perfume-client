import React from "react";
import { fakeProductData } from "@/types/product/product.data";
import ProductDetailGallery from "@/components/specific/Product/Detail/ProductDetailGallery";
import ProductDetailInfo from "@/components/specific/Product/Detail/ProductDetailInfo";
import ProductDetailPrice from "@/components/specific/Product/Detail/ProductDetailPrice";
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
        <div className="mt-6 flex flex-col md:flex-row gap-8">
          <ProductDetailInfo />
          <ProductDetailPrice />
        </div>
      </section>
      <section className="md:col-span-3">Related product</section>
    </div>
  );
};

export default PerfumeDetail;
