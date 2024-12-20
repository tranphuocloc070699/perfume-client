import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCardItem from "@/components/specific/Product/product-card-item";
import { ProductDto } from "@/types/product/product.model";
import { PostDto } from "@/types/post/post.model";
import PostPinnedItem from "@/components/specific/Blog/post-pinned-item";

const PostPinnedList = ({ data }: { data: PostDto[] }) => {
  return (
    <Carousel
      opts={{
        align: "start"
      }}
    >
      <CarouselContent className="-ml-2">
        {data.map((item, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/3  xl:basis-1/3 2xl:basis-1/4 pl-2"
          >
            <PostPinnedItem post={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default PostPinnedList;