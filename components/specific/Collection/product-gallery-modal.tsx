"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Icon, { icons } from "@/components/ui/icon";
import { GetAllProductRequest, GetAllProductResponse } from "@/types/product/product.model";
import { dummyGetAllProductResponse } from "@/types/product/product.data";
import { useProductGalleryData } from "@/hooks/fetch-data/collection-page/useProducGalleryData";
import NextImg from "next/image";


type ProductGalleryModalProps = {
  onClick?: (key: string) => void
}


const ProductGalleryModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [props, setProps] = useState<ProductGalleryModalProps>({});
  const [params, setParams] = useState<GetAllProductRequest>({});

  const { data, loading } = useProductGalleryData(params);


  function openModal(newProps: ProductGalleryModalProps) {
    if (newProps) setProps(newProps);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  return {
    content: (
      <div component-name={"ProductGalleryModal"}>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-[80%] h-[90%]">
            <DialogHeader>
              <DialogTitle className="mb-4 font-bold text-base">
                Product Gallery
              </DialogTitle>
              <div className={"grid grid-cols-4 gap-6 "}>
                {data.content.map(product => (
                  <NextImg key={product.id} src={product.thumbnail} alt={product.name} width={200} height={200}
                           className={"w-full h-40"} />))}
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