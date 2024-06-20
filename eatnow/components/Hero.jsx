"use client";
import { useState } from "react";
import StepTwo from "./SteppersTwo";
import RightSide from "./HeroRightSide";

export default () => {
  const [state, setState] = useState(false);

  return (
    <>
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
          <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
            <h1 className="text-sm text-red-600 font-medium">
              ReBlug App: Live at the App stores
            </h1>
            <h2 className="font-barlow-condensed text-4xl text-gray-800 font-extrabold md:text-5xl">
              Every Brand and Marketer has an ongoing{" "}
              <span className="font-barlow-condensed text-red-700 underline">
                Thing
              </span>{" "}
              or two to tackle when it comes to{" "}
              <span className="text-green-900 text-2xl font-barlow-condensed">
                growth
              </span>{" "}
              marketing
            </h2>
            <h3 className="text-green-900 text-lg">
              We solve things by providing a “blogger-first” platform where
              brands and marketers connect with talented bloggers, and utilizing
              tools and technologies developed to bolster growth.
            </h3>
            <p>
              Specifically by making blogging interactive, social and useful for
              marketing through the use of software, AI-powered technologies,
              and automation tools. Brands can accurately target specific
              audience demographics in their chosen niches by using a
              combination of AI-powered tools and user-generated content.
            </p>
            <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              <a
                href="#eat-now-pay-never"
                className="block py-2 px-4 text-center text-white font-medium bg-green-600 duration-150 hover:bg-red-500 active:bg-red-700 rounded-lg shadow-lg hover:shadow-none"
              >
                Chef & Restaurants
              </a>
              <a
                href="#brand-info"
                className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex"
              >
                Brands & Marketers
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex-none mt-14 md:mt-0 md:max-w-xl">
            <RightSide />
            {/* <img src="/images/heroimgetwo.png" className="" alt="hero-image" /> */}
          </div>
        </div>
        <div className="m-auto px-4 md:px-8 flex flex-col justify-center bg-gray-50 mt-3">
          <p className="text-center text-sm text-gray-700 font-semibold pt-3">
            Free Food Alert: Eat Now, Pay Never
          </p>
          <span>
            <StepTwo />
          </span>
          <div className="flex flex-col lg:flex-row justify-center items-center pb-2 flex-wrap gap-x-6 gap-y-6 mt-6">
            <img
              src="/images/foodini/gplay.png"
              className="w-32"
              alt="googleplay"
            />
            <img
              src="/images/foodini/appleimg.webp"
              className="w-32"
              alt="apple-store"
            />
            <img
              src="/images/foodini/micsoft.png"
              className="w-32"
              alt="apple-store"
            />
          </div>
        </div>
      </section>
    </>
  );
};
