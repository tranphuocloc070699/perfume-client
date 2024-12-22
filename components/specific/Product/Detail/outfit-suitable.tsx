import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import NextImg from "next/image";
import ProductCardBlock from "@/components/common/product-card-block";

interface OutfitSuitableProps {
  outfits: string[];
}

const OutfitSuitable = (props: OutfitSuitableProps) => {
  return (
    <ProductCardBlock title="Trang phục phù hợp">
      <Carousel
        opts={{
          align: "start"
        }}
      >
        <CarouselContent className="-ml-8">
          {props.outfits.map((source, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2  xl:basis-1/4 2xl:basis-1/6 pl-8"
            >
              <NextImg
                key={source}
                src={source}
                width={200}
                height={200}
                alt="Outfit Suitable Image"
                className="w-full h-auto max-h-[240px] object-cover rounded-xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="rounded-sm -left-4 bg-white" />
        <CarouselNext className="rounded-sm -right-4 bg-white" />
      </Carousel>
    </ProductCardBlock>
  );
};

export default OutfitSuitable;
