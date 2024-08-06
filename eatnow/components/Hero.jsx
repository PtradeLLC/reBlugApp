"use client";
import { useState } from "react";
import StepTwo from "./SteppersTwo";
import RightSide from "./HeroRightSide";
import AppStore from "./AppStore";

export default () => {
  const [state, setState] = useState(false);

  return (
    <>
      <section className="">
        <div className="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
          <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
            <h2 className=" text-4xl text-gray-800 font-extrabold md:text-5xl lg:text-6xl">
              Experience the ReBirth of Blogging like you've never seen.
              <span className="font-semibold text-4xl "></span>
            </h2>
            <h3 className="text-green-900 text-2xl font-thin">
              Start blogging with our:
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
                <span className="font-semibold text-lg">Series Blogging:</span>{" "}
                Write posts and publish them sequentially.
              </li>
              <li>
                <span className="font-semibold text-lg">
                  Monetization Simplified:
                </span>{" "}
                Easy ways to earn from your blog.
              </li>
              <li>
                <span className="font-semibold text-lg">Bloggers Network:</span>{" "}
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
              <li>
                <span className="font-semibold text-lg">
                  Tools for content creators:
                </span>{" "}
                Transform social media contents to blogs.
              </li>
              <li>
                <span className="font-semibold text-lg">
                  Universal Publishing:
                </span>{" "}
                Write once, publish everywhere.
              </li>
            </ul>
            <p className="text-2xl">
              Pro-Blogging reimagined. Start blogging for free now!
            </p>
            <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              <a
                href="/login"
                className="flex items-center mx-auto justify-center bg-green-600 gap-x-2 py-2 px-4 text-white hover:text-white/65 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex"
              >
                Join for free Today
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
          </div>
        </div>
        <div>
          <AppStore />
        </div>
      </section>
    </>
  );
};
