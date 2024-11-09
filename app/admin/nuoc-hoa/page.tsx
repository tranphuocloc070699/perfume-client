"use client";
import React, { useMemo, useState } from "react";
import UpsaveProductContainer from "@/components/specific/Admin/Product/UpsaveProductContainer";
import CommonTableManagement, {
  ICommonTableManagementProps
} from "@/components/common/CommonManagement/CommonTableManagement";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/user.store";
import ProductService from "@/services/modules/product.service";
import { ProductDto } from "@/types/product/product.model";
import { usePerfumePageData } from "@/hooks/fetch-data/nuoc-hoa-page/usePerfumePageData";
import { useParamsUtil } from "@/hooks/use-params";
import CommonPagination from "@/components/common/CommonPagination";
import { useToast } from "@/hooks/use-toast";
import productService from "@/services/modules/product.service";

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
      if (response.status == 200 && response.data) {
        toast({ description: "Xóa sản phẩm thành công" });
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
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
    onBtnDeleteClick: handleDeleteProduct


  };

  return (
    <div component-name="ProductManagement">
      <CommonTableManagement title={headers.title} desc={headers.desc} headers={headers.headers}
                             onBtnCreatedClick={headers.onBtnCreatedClick}
                             onBtnDeleteClick={headers.onBtnDeleteClick}
                             updatePath={headers.updatePath}
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