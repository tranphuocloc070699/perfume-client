import React, { useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NextImg from "next/image";

interface ProductDetailGalleryProps {
  galleries: string[];
}
const ProductDetailGallery = (props: ProductDetailGalleryProps) => {
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="-ml-8">
          {props.galleries.map((source, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2  xl:basis-1/4 2xl:basis-1/6 pl-8"
            >
              <NextImg
                key={index}
                src={source}
                width={200}
                height={200}
                alt="Gallery image"
                className="w-full h-[240px] object-cover bg-slate-200 border border-gray-200 rounded-md"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="rounded-sm -left-4 bg-white" />
        <CarouselNext className="rounded-sm -right-4 bg-white" />
      </Carousel>
    </div>
  );
};

export default ProductDetailGallery;
