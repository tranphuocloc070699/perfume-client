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
import { Product } from "@/types/product/product.model";
import ProductCardItem from "./ProductCardItem";
import { fakeProductData } from "@/types/product/product.data";

const ProductCardList = ({ data }: { data: Product[] }) => {
  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: 4,
      }}
    >
      <CarouselContent className="-ml-8">
        {Array.from({ length: 20 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2  xl:basis-1/4 2xl:basis-1/6 pl-8"
          >
            <ProductCardItem
              data={{
                ...fakeProductData,
                title: fakeProductData.title + " " + (index + 1),
              }}
              showIcon
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="rounded-sm -left-4 bg-white" />
      <CarouselNext className="rounded-sm -right-4 bg-white" />
    </Carousel>
  );
};

export default ProductCardList;
