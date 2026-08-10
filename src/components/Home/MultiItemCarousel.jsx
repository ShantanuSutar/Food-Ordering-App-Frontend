import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { topMeals } from "./TopMeal";
import { CarouselItem } from "./CarouselItem";

export const MultiItemCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      duration: 30,
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  return (
    <div className="relative px-6 lg:px-12">

      {/* Previous Button */}
      <button
        onClick={scrollPrev}
        className="
          absolute left-1 lg:left-4 top-1/2 -translate-y-1/2 z-20
          flex items-center justify-center
          w-11 h-11
          rounded-full
          bg-white/10
          backdrop-blur-md
          border border-white/20
          text-white
          shadow-lg
          hover:bg-pink-600
          hover:scale-110
          transition-all duration-300
        "
      >
        <ChevronLeftIcon />
      </button>

      {/* Carousel */}
      <div
        ref={emblaRef}
        className="overflow-hidden"
      >
        <div className="flex">
          {topMeals.map((item, index) => (
            <div
              key={index}
              className="
                min-w-0
                flex-[0_0_100%]
                sm:flex-[0_0_50%]
                md:flex-[0_0_33.333%]
                lg:flex-[0_0_20%]
                px-2
              "
            >
              <CarouselItem
                image={item.image}
                title={item.title}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={scrollNext}
        className="
          absolute right-1 lg:right-4 top-1/2 -translate-y-1/2 z-20
          flex items-center justify-center
          w-11 h-11
          rounded-full
          bg-white/10
          backdrop-blur-md
          border border-white/20
          text-white
          shadow-lg
          hover:bg-pink-600
          hover:scale-110
          transition-all duration-300
        "
      >
        <ChevronRightIcon />
      </button>

    </div>
  );
};