import React from "react";
import Hero from "./Hero";
import Restaurants from "./RestaurantList";
import Foodhini from "./Foodini";
import Footer from "./Footer";

const HomeComponent = () => {
  return (
    <>
      <div className="flex justify-center items-center text-3xl font-bold text-white w-full max-w-screen-xl">
        <Hero />
      </div>
      <div className="flex justify-center items-center text-3xl font-bold text-white w-full max-w-screen-xl">
        <Restaurants />
      </div>
      <div className="flex justify-center items-center text-3xl font-bold text-white w-full max-w-screen-xl">
        <Foodhini />
      </div>
      <div className="flex justify-center items-center text-3xl font-bold text-white w-full max-w-screen-xl">
        <Footer />
      </div>
    </>
  );
};

export default HomeComponent;
