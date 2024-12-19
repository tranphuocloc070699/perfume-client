import AppTitle from "@/components/common/app-title";
import ProductCardList from "@/components/specific/Product/product-card-list";
import ProductService from "@/services/modules/product.service";
import { ProductDto } from "@/types/product/product.model";

export default async function Home() {
  const productService = new ProductService();
  const { body } = await productService.getAllProduct({});

  return (
    <main className={`md:px-0 px-4 w-full max-w-`}>
      <section className="mt-6">
        <AppTitle
          loading={false}
          title="Mới ra mắt"
          icon="material-symbols-light:award-star-outline"
        >
          <ProductCardList data={body.data.content} />
          <div></div>
        </AppTitle>
      </section>
    </main>
  );
}
