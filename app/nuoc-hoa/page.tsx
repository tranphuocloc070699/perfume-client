"use client";

import CommonPagination from "@/components/common/pagination";
import ProductPageList from "@/components/specific/Product/product-page-list";
import ProductPageSearching from "@/components/specific/Product/product-page-searching";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { usePerfumePageData } from "@/hooks/fetch-data/nuoc-hoa-page/usePerfumePageData";
import { useParamsUtil } from "@/hooks/use-params";
import CommonEmpty from "@/components/common/empty";
import CommonLoadDataSpinner from "@/components/common/data-loading-spinner";

const page = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { data, loading } = usePerfumePageData({
    searchParams,
    pathname,
    router
  });
  const { updateParams } = useParamsUtil({ searchParams, pathname, router });

  const currentPage = useMemo(() => {
    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    return currentPage;
  }, [searchParams]);

  const dataProcessor = useMemo(() => {
    return data.content.length > 0 ? (
      <ProductPageList data={data.content} />
    ) : (
      <CommonEmpty text="Không có sản phẩm" />
    );
  }, [data]);

  const onPageChange = (page: number) => {
    updateParams({ key: "page", value: `${page}` });
  };

  return (
    <div className="p-4">
      <h2 className="font-medium text-xl">Tìm kiếm toàn bộ nước hoa</h2>
      <div className="mt-2">
        <ProductPageSearching />
      </div>
      <div className="mt-10">
        {loading && (
          <CommonLoadDataSpinner text="Đang tải sản phẩm" />
        )}
        {!loading && dataProcessor}
      </div>
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

export default page;
