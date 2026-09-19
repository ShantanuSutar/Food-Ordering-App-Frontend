import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useNavigate } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { CarouselItem } from "./CarouselItem";

const TopMealsSkeleton = () => (
  <div className="flex overflow-hidden px-6 lg:px-12" aria-label="Loading top meals">
    {Array.from({ length: 5 }, (_, index) => (
      <div
        key={`top-meal-skeleton-${index}`}
        className="flex-[0_0_100%] px-2 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_20%]"
      >
        <div className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
          <div className="aspect-[4/3] bg-white/10" />
          <div className="space-y-3 p-4">
            <div className="h-5 w-3/4 rounded bg-white/10" />
            <div className="h-4 w-1/2 rounded bg-white/10" />
            <div className="h-4 w-1/4 rounded bg-white/10" />
          </div>
        </div>
      </div>
    ))}
  </div>
)

export const MultiItemCarousel = ({ items = [], loading = false, error = null }) => {
  const navigate = useNavigate();
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

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, items.length]);

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

  const handleSelectMeal = (item) => {
    const city = encodeURIComponent(item.restaurantCity || "city");
    const restaurantName = encodeURIComponent(item.restaurantName || "restaurant");

    navigate(
      `/restaurant/${city}/${restaurantName}/${item.restaurantId}?food=${item.id}`,
      { state: { selectedFoodId: item.id } }
    );
  };

  if (loading) return <TopMealsSkeleton />;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-12 text-center text-gray-400">
        {error
          ? "Top meals could not be loaded right now. Please try again later."
          : "No available meals from open restaurants yet."}
      </div>
    );
  }

  return (
    <div className="relative px-6 lg:px-12">

      {/* Previous Button */}
      {items.length > 1 && <button
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
      </button>}

      {/* Carousel */}
      <div
        ref={emblaRef}
        className="overflow-hidden"
      >
        <div className="flex">
          {items.map((item) => (
            <div
              key={item.id}
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
                item={item}
                onSelect={() => handleSelectMeal(item)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      {items.length > 1 && <button
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
      </button>}

    </div>
  );
};
