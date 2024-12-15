"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductPageSearching from "@/components/specific/Product/ProductPageSearching";
import CommonLoadDataSpinner from "@/components/common/CommonLoadDataSpinner";
import CommonPagination from "@/components/common/CommonPagination";
import PostPageList from "@/components/specific/Blog/PostPageList";
import { usePostPageData } from "@/hooks/fetch-data/blog-page/usePostPageData";

const BlogPage = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();


  const { data, loading } = usePostPageData({ searchParams, pathname, router });

  return (
    <div className="p-4">
      <h2 className="font-medium text-xl">Tìm kiếm toàn bộ bài viết</h2>
      <div className="mt-2">
        {/*<ProductPageSearching />*/}
      </div>
      <div className="mt-10">
        <PostPageList posts={data.content} />
        {/*{loading && (*/}
        {/*  <CommonLoadDataSpinner loading={loading} text="Đang tải bài viết" />*/}
        {/*)}*/}
        {/*{!loading && dataProcessor}*/}
      </div>
      {/*<div className="mt-10">*/}
      {/*  {data.content.length > 0 && (*/}
      {/*    <CommonPagination*/}
      {/*      totalPages={data.totalPages}*/}
      {/*      currentPage={currentPage}*/}
      {/*      onPageChange={onPageChange}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  );
};

export default BlogPage;
