import AppTitle from "@/components/common/app-title";
import ProductCardList from "@/components/specific/Product/product-card-list";
import ProductService from "@/services/modules/product.service";
import { ProductDto } from "@/types/product/product.model";
import PostService from "@/services/modules/post.service";
import PostPinnedList from "@/components/specific/Blog/post-pinned-list";

export default async function Home() {
  const productService = new ProductService();
  const postService = new PostService();
  const { body } = await productService.getAllProduct({});
  const { body: postBody } = await postService.getAllPost({ isPinned: true });
  console.log({ postBody });
  return (
    <main className={``}>
      <div className={"mt-2"}>
        <PostPinnedList data={postBody.data.content} />
      </div>
      <section>
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
