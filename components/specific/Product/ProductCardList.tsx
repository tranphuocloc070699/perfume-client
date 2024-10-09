"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ProductDto } from "@/types/product/product.model";
import ProductCardItem from "./ProductCardItem";

const ProductCardList = ({ data }: { data: ProductDto[] }) => {
  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: 4,
      }}
    >
      <CarouselContent className="-ml-8">
        {data.map((item, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2  xl:basis-1/4 2xl:basis-1/6 pl-8"
          >
            <ProductCardItem data={item} showIcon />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="rounded-sm -left-4 bg-white" />
      <CarouselNext className="rounded-sm -right-4 bg-white" />
    </Carousel>
  );
};

export default ProductCardList;
