"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { convertNumToPrice } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import NextImg from "next/image";
import { useState } from "react";
import CompareCommentList from "./CompareCommentList";
import CompareTitle from "./CompareTitle";
import CompareVote from "./CompareVote";
import WriteComment from "./WriteComment";
import { ProductCompareDetailDto } from "@/types/product-compare/product-compare.model";
import { initDataProductCompareDetail } from "@/types/product-compare/product-compare.data";
import { ProductPriceDto } from "@/types/product-price/product-price.model";

const ProductCompareModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ProductCompareDetailDto>(
    initDataProductCompareDetail
  );

  function openModal(props: ProductCompareDetailDto) {
    setIsOpen(true);
    setData(props);
  }
  function closeModal() {
    setIsOpen(false);
    setData(initDataProductCompareDetail);
  }

  function getPriceByType(prices: ProductPriceDto[], type: "VND" | "USD") {
    if (!prices || prices.length == 0) return { value: 0 };
    return prices[prices?.findIndex((price) => price.priceType === type)];
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
                        src={data?.productOriginal?.thumbnail}
                        alt={data?.productOriginal?.name}
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
                        src={data?.productCompare?.thumbnail}
                        alt={data?.productCompare?.name}
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
                      {data?.productOriginal?.name}
                    </h4>
                    <h4 className="col-span-1 text-center p-4">
                      {" "}
                      {data?.productCompare?.name}
                    </h4>
                  </div>
                  {/* Product Price */}
                  <div className="grid grid-cols-2 border-t border-gray-300 font-light relative">
                    <div className="absolute top-[-10px] left-[50%] translate-x-[-50%]">
                      <CompareTitle title="Giá hãng" />
                    </div>
                    <h5 className="col-span-1 border-r border-gray-300 text-center p-4">
                      {convertNumToPrice(
                        getPriceByType(data?.productOriginal?.prices, "USD")
                          ?.value,
                        "USD"
                      )}
                    </h5>
                    <h5 className="col-span-1 text-center p-4">
                      {convertNumToPrice(
                        getPriceByType(data?.productCompare?.prices, "USD")
                          ?.value,
                        "USD"
                      )}
                    </h5>
                  </div>

                  <div className="grid grid-cols-2 border-t border-gray-300 font-light relative">
                    <div className="absolute top-[-10px] left-[50%] translate-x-[-50%]">
                      <CompareTitle title="Giá thị trường" />
                    </div>
                    <h5 className="col-span-1 border-r border-gray-300 text-center p-4">
                      {convertNumToPrice(
                        getPriceByType(data?.productOriginal?.prices, "VND")
                          ?.value,
                        "VND"
                      )}
                    </h5>
                    <h5 className="col-span-1 text-center p-4">
                      {convertNumToPrice(
                        getPriceByType(data?.productCompare?.prices, "VND")
                          ?.value,
                        "VND"
                      )}
                    </h5>
                  </div>
                </div>

                <div className="mt-8 mb-4  pt-4">
                  <WriteComment />
                </div>
                <DialogTitle className="mt-4 mb-2 font-bold text-base">
                  Bình luận
                </DialogTitle>
                <CompareCommentList comments={data?.comments} />
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
