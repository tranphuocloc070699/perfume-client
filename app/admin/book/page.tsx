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
import { useBookPageData } from "@/hooks/fetch-data/book-page/useBookPageData";
import BookService from "@/services/modules/book.service";

const BookManagement = () => {
  const router = useRouter();
  const { data, loading, fetchData } = useBookPageData();
  const { toast } = useToast();


  const bookService = useMemo(() => {
    return new BookService();
  }, []);

  const dataSource = useMemo(() => {
    return data.map(item => ({
      id: item.id,
      thumbnail: item.thumbnail.startsWith("https://") ? item.thumbnail : `http://localhost:8090/upload${item.thumbnail}`,
      productName: item.name
    }));
  }, [data]);

  async function handleDeleteBook(id?: string) {
    if (!id) {
      toast({ description: "không tìm thấy book id" });
      return;
    }
    try {
      const response = await bookService.delete(Number(id));
      if (response.body.status == 200 && response.body.data) {
        toast({ description: "Xóa sản phẩm thành công" });
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleSearchBook(input: string) {
    console.log("search book trigger...");
  }


  const headers: ICommonTableManagementProps = {
    title: "Quản lý sách",
    desc: "Danh sách ",
    headers: [
      { name: "ID", type: "text" },
      { name: "Thumbnail", type: "image", className: "w-16 h-16" },
      { name: "Tên sách", type: "text", className: "font-semibold" }
    ],
    data: [],
    updatePath: "/admin/book/up-save",
    onBtnCreatedClick: () => {
      router.push("/admin/book/up-save");
    },
    onBtnDeleteClick: handleDeleteBook,
    onSearching: handleSearchBook,
    loading


  };

  return (
    <div component-name="BookManagement">
      <CommonTableManagement {...headers}
                             data={dataSource} />

    </div>
  );
};

export default BookManagement;