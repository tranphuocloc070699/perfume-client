"use client";

import AppTitle from "@/components/common/AppTitle";
import ProductCardList from "@/components/specific/Product/ProductCardList";
import ProductService from "@/services/modules/product.service";
import { Product } from "@/types/product/product.model";
import { useEffect, useState } from "react";
export default function Home() {
  const [productList, setProductList] = useState<Product[]>([]);

  const fetchData = async () => {
    const productService = new ProductService();

    const response = await productService.getAllProduct();

    if (response.data.content.length > 0) {
      setProductList(response.data.content);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className={`md:px-0 px-4 w-full max-w-`}>
      <section className="mt-6">
        <AppTitle
          loading={false}
          title="Mới ra mắt"
          icon="material-symbols-light:award-star-outline"
        >
          <ProductCardList data={productList} />
          <div></div>
        </AppTitle>
      </section>
    </main>
  );
}
