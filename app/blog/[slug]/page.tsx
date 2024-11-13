import React from "react";
import ProductService from "@/services/modules/product.service";
import { extractIdFromUrl } from "@/lib/utils";
import PostService from "@/services/modules/post.service";

export const dynamicParams = true;
const postService = new PostService();

export async function generateStaticParams() {
  const { data } = await postService.getAllPostId();
  return data;
}

const PostDetailPage = async (params: any) => {
  const id = extractIdFromUrl(params?.params?.slug);
  const { data, errors } = await postService.getPostById(Number(id));


  console.log({ data });


  return (
    <div className="grid grid-cols-12">
      <section className="col-span-3">

      </section>
      <section className="col-span-6 font-normal">
        <h1 className={"font-bold text-3xl text-slate-700"}>Nước hoa hay dầu thơm (tiếng Anh: Perfume, tiếng Pháp:
          Parfum) là hỗn hợp chất tạo mùi của tinh dầu thơm hoặc các hợp chất tạo mùi thơm, chất hãm hương</h1>
        <div className={"mt-4"}>
          <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </div>
      </section>
      <section className="col-span-3">

      </section>
      {/* <section className="md:col-span-3">
        <ProductRelated />
      </section> */}
    </div>
  );
};

export default PostDetailPage;
