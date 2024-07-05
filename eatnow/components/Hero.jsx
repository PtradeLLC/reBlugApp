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
            <h2 className=" text-4xl text-gray-800 font-extrabold md:text-5xl lg:text-6xl">
              Experience the ReBirth of Blogging
              <span className="font-semibold text-4xl "></span>
            </h2>
            <h3 className="text-green-900 text-3xl font-thin">
              Start a blog for free with our:
            </h3>
            <ul className="text-lg">
              <li>
                <span className="font-semibold text-lg">
                  Social Blogging Tools:
                </span>{" "}
                Engage and grow your audience.
              </li>
              <li>
                <span className="font-semibold text-lg">
                  AI-Powered Features:
                </span>{" "}
                Solve common blogging pain points effortlessly.
              </li>
              <li>
                <span className="font-semibold text-lg">
                  Monetization Simplified:
                </span>{" "}
                Easy ways to earn from your blog.
              </li>
              <li>
                <span className="font-semibold text-lg">
                  Bloggers Marketplace:
                </span>{" "}
                Connect and collaborate with others.
              </li>
              <li>
                <span className="font-semibold text-lg">
                  Brand Marketing Tools:
                </span>{" "}
                Enhance your sponsors' reach.
              </li>
              <li>
                <span className="font-semibold text-lg">
                  Organic Growth Strategies:
                </span>{" "}
                Increase your influence naturally.
              </li>
              <li>
                <span className="font-semibold text-lg">
                  Beginner & Expert Tools:
                </span>{" "}
                Perfect for all experience levels.
              </li>
              <li className="font-semibold text-lg">
                Universal Publishing: Write once, publish everywhere.
              </li>
            </ul>
            <p className="text-2xl">
              Pro-Blogging reimagined. Start blogging for free now!
            </p>
            <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              {/* <a
                href="#eat-now-pay-never"
                className="block py-2 px-4 text-center text-white font-medium bg-green-600 duration-150 hover:bg-red-500 active:bg-red-700 rounded-lg shadow-lg hover:shadow-none"
              >
                Chef & Restaurants
              </a> */}
              <a
                href="/login"
                className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex"
              >
                Join us Today
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
