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
import ProductService from "@/services/modules/product.service";
export const dynamicParams = true;
const productService = new ProductService();
export async function generateStaticParams() {
  const { data } = await productService.getAllProductId();

  return data;
}

const PerfumeDetail = async ({ id }: { id: any }) => {
  console.log({ id });

  return (
    <div className="grid md:grid-cols-12">
      <section className="md:col-span-12 flex flex-col gap-4">
        <div className="mt-6">
          <ProductDetailGallery />
        </div>
        <h2 className="text-3xl text-slate-700 font-bold mt-6">
          {fakeProductData.name}
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

// export async function getStaticPaths() {
//   const productService = new ProductService();
//   const { data } = await productService.getAllProductId();
//   const paths = data.map((id) => ({
//     params: { id },
//   }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }: { params: any }) {
//   console.log({ params });
//   const productService = new ProductService();
//   const { data } = await productService.getProductById(params?.id);
//   console.log({ data });

//   // Pass post data to the page via props
//   return { props: { data } };
// }
