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
import { IProduct } from "@/types/products/product.interface";
import ProductCardItem from "./ProductCardItem";
import { fakeProductData } from "@/types/products/product.data";

const ProductCardList = ({ data }: { data: IProduct[] }) => {
  return (
    <Carousel
    // plugins={[
    //   Autoplay({
    //     delay: 5000,
    //   }),
    // ]}
    >
      <CarouselContent className="-ml-8">
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6 pl-8">
            <ProductCardItem data={fakeProductData} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
};

export default ProductCardList;
