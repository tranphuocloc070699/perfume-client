import AppTitle from "@/components/common/app-title";
import ProductCardList from "@/components/specific/Product/product-card-list";
import ProductService from "@/services/modules/product.service";
import { ProductDto } from "@/types/product/product.model";
import PostService from "@/services/modules/post.service";
import PostPinnedList from "@/components/specific/Blog/post-pinned-list";
import CollectionService from "@/services/modules/collection.service";

export default async function Home() {
  // const productService = new ProductService();
  const collectionService = new CollectionService();
  const postService = new PostService();
  // const { body } = await productService.getAllProduct({});
  const { body: collectionBody } = await collectionService.getAll();
  const { body: postBody } = await postService.getAllPost({ isPinned: true });
  console.log({ postBody });
  return (
    <main className={``}>
      <div className={"mt-2"}>
        <PostPinnedList data={postBody.data.content} />
      </div>
      <section>
        <div className={"flex flex-col gap-10"}>
          {
            collectionBody.data.map((collection) => <AppTitle
              key={collection.id}
              loading={false}
              title={collection.title}
              icon={collection.icon}
            >
              <ProductCardList
                data={collection.collectionProducts.map(collectionProduct => collectionProduct.product)} />
            </AppTitle>)
          }
        </div>
        {/*<AppTitle*/}
        {/*  loading={false}*/}
        {/*  title="Mới ra mắt"*/}
        {/*  icon="material-symbols-light:award-star-outline"*/}
        {/*>*/}
        {/*  <ProductCardList data={body.data.content} />*/}
        {/*</AppTitle>*/}
      </section>
    </main>
  );
}
