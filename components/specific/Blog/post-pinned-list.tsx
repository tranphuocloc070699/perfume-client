"use server";

import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCardItem from "@/components/specific/Product/product-card-item";
import { ProductDto } from "@/types/product/product.model";
import { PostDto } from "@/types/post/post.model";
import PostPinnedItem from "@/components/specific/Blog/post-pinned-item";
import Autoplay from "embla-carousel-autoplay";
import CarouselWithAutoplay from "@/components/specific/Blog/carousel-with-autoplay";

const PostPinnedList = ({ data }: { data: PostDto[] }) => {
  return (
    <CarouselWithAutoplay delay={3000}>
      <CarouselContent className="md:-ml-4 ">
        {data.map((item, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/3  xl:basis-1/3 2xl:basis-1/4 md:pl-4"
          >

            <PostPinnedItem post={item} />

          </CarouselItem>
        ))}
      </CarouselContent>
    </CarouselWithAutoplay>
  );
};

export default PostPinnedList;