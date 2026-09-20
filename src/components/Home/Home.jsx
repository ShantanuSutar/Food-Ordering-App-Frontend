import { useEffect } from "react";
import "./Home.css";

import { MultiItemCarousel } from "./MultiItemCarousel";
import { RestaurantCard } from "../Restaurant/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../State/Restaurant/Action";
import { getTopMeals } from "../../State/Menu/Action";
import { Button, Skeleton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const Home = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {restaurant, menu} = useSelector(store => store)

  useEffect(() => {
    dispatch(getTopMeals())
    dispatch(getAllRestaurantsAction(jwt))
  }, [dispatch, jwt])

  

  return (
    <main className="pb-16">
      <section className="banner relative isolate flex items-center overflow-hidden">
        <div className="page-shell relative z-10 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-amber-400">Local favourites, one tap away</p>
            <h1 className="!m-0 max-w-2xl !text-4xl !font-black !leading-[1.05] sm:!text-6xl lg:!text-7xl">
              Your next favourite meal is <span className="text-orange-500">closer than you think.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-xl">
              Discover fresh dishes from nearby restaurants and get them delivered without the fuss.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} href="#restaurants">Explore restaurants</Button>
              <Button variant="outlined" size="large" href="#top-meals" sx={{ color: 'white', borderColor: 'rgba(255,255,255,.35)' }}>See top meals</Button>
            </div>
          </div>
        </div>
        <div className="cover absolute inset-0 -z-10" />
      </section>

        <section id="top-meals" className="page-shell scroll-mt-24 py-14 sm:py-18">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div><p className="eyebrow">Popular right now</p><h2 className="!mb-0 !mt-2 !text-2xl sm:!text-3xl">Top meals</h2></div>
            <p className="hidden max-w-md text-right text-sm text-slate-400 md:block">Real dishes available from open restaurants near you.</p>
          </div>
            <MultiItemCarousel
              items={menu.topMeals}
              loading={menu.topMealsLoading}
              error={menu.topMealsError}
            />
        </section>

        <section id="restaurants" className="page-shell scroll-mt-24 py-8">
          <div className="mb-7"><p className="eyebrow">Restaurants</p><h2 className="!mb-0 !mt-2 !text-2xl sm:!text-3xl">Handpicked for you</h2></div>
          {restaurant.loading && restaurant.restaurants.length === 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => <Skeleton key={item} variant="rounded" height={310} />)}
            </div>
          ) : restaurant.restaurants.length === 0 ? (
            <div className="empty-state px-6 py-14 text-center">No restaurants are available right now. Please check back soon.</div>
          ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {restaurant.restaurants.map((item) => <RestaurantCard key={item.id} item={item} />)}
          </div>
          )}
        </section>
    </main>
  );
};
