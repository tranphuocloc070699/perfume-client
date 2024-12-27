"use client";

import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const CarouselWithAutoplay = ({ children, delay }: { children: React.ReactNode, delay: number }) => {
  const autoplay = Autoplay({ delay });

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true
      }}
      plugins={[autoplay]}
    >
      {children}
    </Carousel>
  );
};

export default CarouselWithAutoplay;