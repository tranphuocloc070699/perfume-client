import React, { useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fakeProductData } from "@/types/product/product.data";
import NextImg from "next/image";
const ProductDetailGallery = () => {
  const galleryNested = useMemo(() => {
    const result: string[][] = [];
    for (let i = 0; i < fakeProductData.gallery.length; i += 4) {
      result.push([
        fakeProductData.gallery[i],
        fakeProductData.gallery[i + 1],
        fakeProductData.gallery[i + 2],
        fakeProductData.gallery[i + 3],
      ]); //Adds i and i+1 as a new array to the result array
    }

    return result;
  }, [fakeProductData.gallery]);

  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="-ml-8">
          {galleryNested.map((galleryItem, index) => (
            <CarouselItem key={index}>
              <div className="grid md:grid-cols-2 md:gap-4">
                {galleryItem.map((imageSrc) => (
                  <NextImg
                    key={imageSrc}
                    src={imageSrc}
                    width={200}
                    height={200}
                    alt="Gallery image"
                    className="w-full h-[240px] object-cover bg-slate-200"
                  />
                ))}
              </div>
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
