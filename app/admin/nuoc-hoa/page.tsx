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
import CommonPagination from "@/components/common/pagination";
import { useToast } from "@/hooks/use-toast";

const ProductManagement = () => {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { data, loading, fetchData } = usePerfumePageData({
    searchParams,
    pathname,
    router
  });
  const { updateParams } = useParamsUtil({ searchParams, pathname, router });
  const { toast } = useToast();
  const { accessToken } = useUserStore();


  const productService = useMemo(() => {
    return new ProductService(accessToken);
  }, [accessToken]);

  const currentPage = useMemo(() => {
    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    return currentPage;
  }, [searchParams]);

  const onPageChange = (page: number) => {
    updateParams({ key: "page", value: `${page}` });
  };


  const dataSource = useMemo(() => {
    return data.content.map(item => ({
      id: item.id,
      thumbnail: item.thumbnail.startsWith("https://") ? item.thumbnail : `http://localhost:8090/upload${item.thumbnail}`,
      productName: item.name
    }));
  }, [data]);

  async function handleDeleteProduct(id?: string) {
    if (!id) {
      toast({ description: "không tìm thấy product id" });
      return;
    }
    try {
      const response = await productService.deleteProduct(id);
      console.log({ response });
      if (response.body.status == 200 && response.body.data) {
        toast({ description: "Xóa sản phẩm thành công" });
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  }


  function handleSearchProduct(input: string) {
    updateParams({
      key: "productName",
      value: input,
      resetPage: true
    });
  }

  const headers: ICommonTableManagementProps = {
    title: "Quản lý sản phẩm",
    desc: "Danh sách sản phẩm",
    headers: [
      { name: "ID", type: "text" },
      { name: "Thumbnail", type: "image", className: "w-16 h-16" },
      { name: "Tên sản phẩm", type: "text", className: "font-semibold" }
    ],
    data: [],
    updatePath: "/admin/nuoc-hoa/up-save",
    onBtnCreatedClick: () => {
      router.push("/admin/nuoc-hoa/up-save");
    },
    onBtnDeleteClick: handleDeleteProduct,
    onSearching: handleSearchProduct,
    loading


  };

  return (
    <div component-name="ProductManagement">
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

export default ProductManagement;