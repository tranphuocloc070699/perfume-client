"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Icon, { icons } from "@/components/ui/icon";
import { GetAllProductRequest, GetAllProductResponse, ProductDto } from "@/types/product/product.model";
import { dummyGetAllProductResponse } from "@/types/product/product.data";
import { useProductGalleryData } from "@/hooks/fetch-data/collection-page/useProducGalleryData";
import NextImg from "next/image";
import Typography from "@/components/ui/typography";
import CommonPagination from "@/components/common/pagination";
import useCustomState from "@/hooks/use-custom-state";
import DataLoadingSpinner from "@/components/common/data-loading-spinner";
import Input from "@/components/ui/input";
import AppDataNotFound from "@/components/common/app-data-not-found";


type ProductGalleryModalProps = {
  onClick?: (product: ProductDto) => void
}


const ProductGalleryModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [props, setProps] = useState<ProductGalleryModalProps>({});
  const [params, updateParams] = useCustomState<GetAllProductRequest>({
    page: 1,
    productName: ""
  });


  const { data, loading, setLoading } = useProductGalleryData(params);


  function openModal(newProps: ProductGalleryModalProps) {
    if (newProps) setProps(newProps);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function onPageChange(page: number) {
    updateParams({ page });
  }

  function onProductNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateParams({ productName: event.target.value });
  }


  return {
    content: (
      <div component-name={"ProductGalleryModal"}>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="min-w-[80%] h-[90%]">
            <DialogHeader>
              <DialogTitle className="mb-4 font-normal flex items-center gap-4">
                <span className={"font-bold text-base text-nowrap"}>Product Gallery</span>

                <Input name={"productName"} placeholder={"Nhập tên nước hoa..."}
                       debounce={{ callback: onProductNameChange }} onChange={(e) => {
                  if (!loading) setLoading(true);
                }} wrapperClassName={"max-w-[200px]"} />
              </DialogTitle>
              <div
                className={"grid  md:grid-cols-4 2xl:grid-cols-6 gap-6 p-4 rounded-lg border border-gray-300 min-h-[400px]"}>
                {loading && <div className={"w-full h-full col-span-4 flex items-center justify-center"}>
                  <DataLoadingSpinner text={"Đang tải dữ liệu"} />
                </div>}

                {!loading && <>
                  {
                    data.content.length > 0 ? data.content.map(product => (
                      <div key={product.id}
                           onClick={() => props?.onClick(product)}
                           className={"flex flex-col gap-4 items-center shadow rounded-lg pb-4 transition duration-300 hover:shadow-xl cursor-pointer"}>
                        <NextImg src={product.thumbnail} alt={product.name} width={200} height={200}
                                 className={"w-full h-28 object-contain"} />
                        <Typography.Text className={"text-center flex-1"}>{product.name}</Typography.Text>
                      </div>)) : <div className={"w-full h-full col-span-4 flex items-center justify-center"}>
                      <AppDataNotFound className={"bg-white"} />
                    </div>
                  }
                </>}
                {
                  !loading && <div className="flex justify-center col-span-4">
                    {data.content.length > 0 && (
                      <CommonPagination
                        totalPages={data.totalPages}
                        currentPage={params.page}
                        onPageChange={onPageChange}
                      />
                    )}
                  </div>
                }
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    ),
    openModal,
    closeModal
  };
};

export default ProductGalleryModal;