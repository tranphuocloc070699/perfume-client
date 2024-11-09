"use client";
import React, { useMemo } from "react";
import CommonTableManagement, {
  ICommonTableManagementProps
} from "@/components/common/CommonManagement/CommonTableManagement";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/user.store";
import ProductService from "@/services/modules/product.service";
import { usePerfumePageData } from "@/hooks/fetch-data/nuoc-hoa-page/usePerfumePageData";
import { useParamsUtil } from "@/hooks/use-params";
import CommonPagination from "@/components/common/CommonPagination";
import { useToast } from "@/hooks/use-toast";
import PostService from "@/services/modules/post.service";
import { usePostPageData } from "@/hooks/fetch-data/blog-page/usePostPageData";

const NewsManagement = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { data, loading, fetchData } = usePostPageData({
    searchParams,
    pathname,
    router
  });


  const { updateParams } = useParamsUtil({ searchParams, pathname, router });
  const { toast } = useToast();
  const { accessToken } = useUserStore();


  const postService = useMemo(() => {
    return new PostService(accessToken);
  }, [accessToken]);

  const currentPage = useMemo(() => {
    return searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
  }, [searchParams]);

  const onPageChange = (page: number) => {
    updateParams({ key: "page", value: `${page}` });
  };


  const dataSource = useMemo(() => {
    return data.content.map(item => ({
      id: item.id,
      thumbnail: item?.thumbnail?.startsWith("https://") ? item?.thumbnail : `http://localhost:8090/upload${item?.thumbnail}`,
      title: item.title
    }));
  }, [data]);

  async function handleDeletePost(id?: string) {
    if (!id) {
      toast({ description: "không tìm thấy post id" });
      return;
    }
    try {
      const response = await postService.deletePost(id);
      console.log({ response });
      if (response.status == 200 && response.data) {
        toast({ description: "Xóa bài viết thành công" });
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  }


  function handleSearchPost(input: string) {
    updateParams({
      key: "title",
      value: input,
      resetPage: true
    });
  }

  const headers: ICommonTableManagementProps = {
    title: "Quản lý bài viết",
    desc: "Danh sách bài viết",
    headers: [
      { name: "ID", type: "text" },
      { name: "Thumbnail", type: "image", className: "w-16 h-16" },
      { name: "Tên bài viết", type: "text", className: "font-semibold" }
    ],
    data: [],
    updatePath: "/admin/blog/up-save",
    onBtnCreatedClick: () => {
      router.push("/admin/blog/up-save");
    },
    onBtnDeleteClick: handleDeletePost,
    onSearching: handleSearchPost,
    loading
  };

  return (
    <div component-name="NewsManagement">
      <CommonTableManagement {...headers}
                             data={dataSource} />

      <div className="mt-10">
        {data.content.length > 0 && (
          <CommonPagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default NewsManagement;