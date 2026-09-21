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
        <div className="animate-pulse overflow-hidden rounded-xl border border-slate-400/15 bg-[var(--color-surface)]">
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
        delay: 4500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
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
      <div className="empty-state px-6 py-12 text-center">
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
          bg-[var(--color-surface-2)]/95
          backdrop-blur-md
          border border-slate-400/25
          text-white
          shadow-lg
          hover:bg-orange-600
          transition-colors duration-200
        "
      >
        <ChevronLeftIcon />
      </button>}

      {/* Carousel */}
      <div
        ref={emblaRef}
        className="overflow-hidden"
      >
        <div className="flex py-2">
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
          bg-[var(--color-surface-2)]/95
          backdrop-blur-md
          border border-slate-400/25
          text-white
          shadow-lg
          hover:bg-orange-600
          transition-colors duration-200
        "
      >
        <ChevronRightIcon />
      </button>}

    </div>
  );
};
