"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { convertNumToPrice } from "@/lib/utils";
import { fakeProductData } from "@/types/product/product.data";
import { Icon } from "@iconify/react/dist/iconify.js";
import NextImg from "next/image";
import { useState } from "react";
import CompareCommentList from "./CompareCommentList";
import CompareTitle from "./CompareTitle";
import CompareVote from "./CompareVote";
import WriteComment from "./WriteComment";
interface IProductCompareModalProps {
  text: string;
  open?: boolean;
  onClose?: () => void;
}

const ProductCompareModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function onChange() {
    console.log("trigger...");
  }

  return {
    content: (
      <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <div className="max-h-[500px] overflow-y-auto px-2">
                <DialogTitle className="mb-4 font-bold text-base">
                  Bảng so sánh
                </DialogTitle>
                <div className="border border-gray-300 rounded-xl">
                  {/* Thumbnail */}
                  <div className=" relative grid grid-cols-2">
                    <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
                      <CompareVote />
                    </div>
                    <div className="col-span-1 flex flex-col items-center justify-center border-r border-gray-200">
                      <NextImg
                        src={fakeProductData.thumnail}
                        alt="Product Thumbnail"
                        width={100}
                        height={100}
                      />
                      <Button variant="ghost" className="w-[90%]  my-2">
                        Thích
                        <Icon
                          icon={"ph:heart-light"}
                          className="h-5 w-5 ml-2"
                        />
                      </Button>
                    </div>
                    <div className="col-span-1 flex flex-col items-center justify-center text-center">
                      <NextImg
                        src={fakeProductData.thumnail}
                        alt="Product Thumbnail"
                        width={100}
                        height={100}
                      />
                      <Button variant="ghost" className="w-[90%]  my-2">
                        Thích
                        <Icon
                          icon={"ph:heart-light"}
                          className="h-5 w-5 ml-2"
                        />
                      </Button>
                    </div>
                  </div>
                  {/* Product name */}
                  <div className="grid grid-cols-2 border-t border-gray-300  font-medium">
                    <h4 className="col-span-1 border-r border-gray-300 text-center p-4">
                      Versace Pour Homme
                    </h4>
                    <h4 className="col-span-1 text-center p-4">Dior Sauvage</h4>
                  </div>
                  {/* Product Price */}
                  <div className="grid grid-cols-2 border-t border-gray-300 font-light relative">
                    <div className="absolute top-[-10px] left-[50%] translate-x-[-50%]">
                      <CompareTitle title="Giá hãng" />
                    </div>
                    <h5 className="col-span-1 border-r border-gray-300 text-center p-4">
                      {convertNumToPrice(10000, "")}
                    </h5>
                    <h5 className="col-span-1 text-center p-4">
                      {convertNumToPrice(30000, "")}
                    </h5>
                  </div>

                  <div className="grid grid-cols-2 border-t border-gray-300 font-light relative">
                    <div className="absolute top-[-10px] left-[50%] translate-x-[-50%]">
                      <CompareTitle title="Giá thị trường" />
                    </div>
                    <h5 className="col-span-1 border-r border-gray-300 text-center p-4">
                      {convertNumToPrice(10000, "VN")}
                    </h5>
                    <h5 className="col-span-1 text-center p-4">
                      {convertNumToPrice(30000, "VN")}
                    </h5>
                  </div>
                </div>

                <div className="mt-8 mb-4  pt-4">
                  <WriteComment />
                </div>
                <DialogTitle className="mt-4 mb-2 font-bold text-base">
                  Bình luận
                </DialogTitle>
                <CompareCommentList />
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>
    ),
    close: closeModal,
    open: openModal,
  };
};

export default ProductCompareModal;
