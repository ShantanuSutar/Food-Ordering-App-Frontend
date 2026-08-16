import React, { useEffect } from "react";
import "./Home.css";

import { MultiItemCarousel } from "./MultiItemCarousel";
import { restaurants } from "./Restaurants";
import { RestaurantCard } from "../Restaurant/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../State/Restaurant/Action";
import { store } from "../../State/store";


export const Home = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {restaurant} = useSelector(store => store)

  useEffect(() => {
    dispatch(getAllRestaurantsAction(jwt))
  }, [])

  return (
    <div className=" pb-10">
      <section className="banner relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-2xl lg:text-6xl font-bold z-10 py-5">
            DineHub
          </p>

          <p className="z-10 text-gray-300 text-xl lg:text-4xl">
            Taste the Convenience: Food, Fast and Delivered.
          </p>
        </div>

        <div className="cover absolute top-0 left-0 right-0"></div>

        <div className="fadeout"></div>
      </section>

        <section className=" p-10 lg:py-10 lg:px-20">
          <h1 className=" text-center text-2xl font-semibold text-gray-400 pb-8 pt-10">Top Meals</h1>
            <MultiItemCarousel/>
        </section>

        <section className=" px-5 lg:px-20">
          <h1 className=" text-center text-2xl font-semibold text-gray-400 pb-8 pt-10">Order from our handpicked favourites</h1>
          <div className=" flex flex-wrap items-center justify-around gap-5">
            {restaurant?.restaurants?.map((item) => <RestaurantCard item={item} />)}  
          </div>
        </section>
    </div>
  );
};