import AppTitle from "@/components/common/app-title";
import ProductCardList from "@/components/specific/Product/product-card-list";
import ProductService from "@/services/modules/product.service";
import { ProductDto } from "@/types/product/product.model";
import PostService from "@/services/modules/post.service";
import PostPinnedList from "@/components/specific/Blog/post-pinned-list";
import CollectionService from "@/services/modules/collection.service";
import BookService from "@/services/modules/book.service";
import BookList from "@/components/specific/Book/book-list";
import PostCardItem from "@/components/specific/Blog/post-card-item";
import PostPageList from "@/components/specific/Blog/post-page-list";

export default async function Home() {

  const collectionService = new CollectionService();
  const postService = new PostService();
  const bookService = new BookService();
  const { body: collectionBody } = await collectionService.getAll();
  const { body: postPinnedBody } = await postService.getAllPost({ isPinned: true });
  const { body: postBody } = await postService.getAllPost({ isPinned: false });
  const { body: bookBody } = await bookService.getAll();

  return (
    <main>
      <div className={"mt-4 md:px-4"}>
        <PostPinnedList data={postPinnedBody.data.content} />
      </div>
      <section className={"px-4 "}>
        <div className={"flex flex-col gap-10 mt-10"}>
          {
            collectionBody.data.map((collection) => <AppTitle
              key={collection.id}
              loading={false}
              title={collection.title}
              // icon={collection.icon}
            >
              <ProductCardList
                data={collection.collectionProducts.map(collectionProduct => collectionProduct.product)} />
            </AppTitle>)
          }
        </div>

        <div className={"grid grid-cols-5 mt-10 gap-10 "}>
          <PostPageList posts={postBody.data.content} className={"md:col-span-4 col-span-5 "} />
          <BookList books={bookBody.data}
                    className={"md:col-span-1 col-span-5 md:border-l md:border-gray-300 md:pl-10"} />
        </div>


      </section>
    </main>
  );
}
