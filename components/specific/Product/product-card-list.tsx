"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

import { ProductDto } from "@/types/product/product.model";
import ProductCardItem from "./product-card-item";

const ProductCardList = ({ data }: { data: ProductDto[] }) => {
  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: 2
      }}
    >
      <CarouselContent className="-ml-6">
        {data.map((item, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2  xl:basis-1/6 2xl:basis-1/6 pl-6"
          >
            <ProductCardItem data={item} showIcon />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="rounded-sm -left-4  bg-white " />
      <CarouselNext className="rounded-sm -right-4 bg-white disabled:hidden" />
    </Carousel>
  );
};

export default ProductCardList;
