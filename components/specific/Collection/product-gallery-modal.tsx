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


type ProductGalleryModalProps = {
  onClick?: (product: ProductDto) => void
}


const ProductGalleryModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [props, setProps] = useState<ProductGalleryModalProps>({});
  const [params, setParams] = useState<GetAllProductRequest>({});

  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading } = useProductGalleryData(params);


  function openModal(newProps: ProductGalleryModalProps) {
    if (newProps) setProps(newProps);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function onPageChange(page: number) {
    setCurrentPage(page);
  }


  return {
    content: (
      <div component-name={"ProductGalleryModal"}>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="min-w-[80%] h-[90%]">
            <DialogHeader>
              <DialogTitle className="mb-4 font-bold text-base">
                Product Gallery
              </DialogTitle>
              <div className={"grid  md:grid-cols-4 2xl:grid-cols-6 gap-6 p-4 rounded-lg border border-gray-300"}>
                {data.content.map(product => (
                  <div key={product.id}
                       onClick={() => props?.onClick(product)}
                       className={"flex flex-col gap-4 items-center shadow rounded-lg pb-4 transition duration-300 hover:shadow-xl cursor-pointer"}>
                    <NextImg src={product.thumbnail} alt={product.name} width={200} height={200}
                             className={"w-full h-28 object-contain"} />
                    <Typography.Text>{product.name}</Typography.Text>
                  </div>))}

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