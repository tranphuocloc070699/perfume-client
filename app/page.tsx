import AppTitle from "@/components/common/AppTitle";
import ProductCardItem from "@/components/specific/Product/ProductCardItem";
import Image from "next/image";
import { fakeProductData } from "@/types/product/product.data";
import ProductCardList from "@/components/specific/Product/ProductCardList";
export default function Home() {
  return (
    <main className={`md:px-0 px-4 w-full max-w-`}>
      <section className="mt-6">
        <AppTitle
          loading={false}
          title="Mới ra mắt"
          icon="material-symbols-light:award-star-outline"
        >
          <ProductCardList data={[]} />
          <div></div>
        </AppTitle>
      </section>
    </main>
  );
}
