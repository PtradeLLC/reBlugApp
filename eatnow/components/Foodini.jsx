import React from "react";
import { Tooltip } from "@nextui-org/tooltip";

const Foodhini = () => {
  return (
    <>
      {/* Features */}
      <div
        id="foodini"
        className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto"
      >
        <div className="relative p-6 md:p-12">
          {/* Grid */}
          <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
              <h2 className="font-thin text-2xl text-gray-800 font-bold sm:text-3xl dark:text-neutral-200">
                Meet <span className="text-amber-100">Foodhini</span>
              </h2>
              {/* Tab Navs */}
              <nav
                className="grid gap-4 mt-5 md:mt-10"
                aria-label="Tabs"
                role="tablist"
              >
                <button
                  type="button"
                  className="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-neutral-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-neutral-800 dark:hover:bg-neutral-800 active"
                  id="tabs-with-card-item-1"
                  data-hs-tab="#tabs-with-card-1"
                  aria-controls="tabs-with-card-1"
                  role="tab"
                >
                  <span className="flex">
                    <img
                      className="size-9"
                      src="/images/foodini/chefbo.png"
                      alt="chef-image"
                    />
                    <span className="grow ms-6">
                      <span className="font-thin block text-sm font-semibold hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-neutral-200">
                        The Legend
                      </span>
                      <span className="font-thin block text-lg mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-neutral-200">
                        As rumor has it, when chefs prays to the gods at the 11
                        O'clock hour hoping for a miracle, Foodhini answers.
                      </span>
                    </span>
                  </span>
                </button>
                <div
                  className="hs-tab-active:bg-white hs-tab-active:shadow-md text-start p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-neutral-700 "
                  id="tabs-with-card-item-2"
                  data-hs-tab="#tabs-with-card-2"
                  aria-controls="tabs-with-card-2"
                  role="tab"
                >
                  <span
                    id="tabs-with-card-item-1"
                    data-hs-tab="#tabs-with-card-1"
                    aria-controls="tabs-with-card-1"
                    role="tab"
                    className="flex hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-neutral-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-neutral-800 dark:hover:bg-neutral-800 active"
                  >
                    <img
                      className="size-7 bg-white rounded-md"
                      src="/images/foodini/stefstash.png"
                      alt="chef-image"
                    />
                    <span className="grow ms-6">
                      <span className="font-thin block text-sm font-semibold hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-neutral-200">
                        "Foodhini Says"
                      </span>
                      <span className="font-thin block text-lg mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-neutral-200">
                        And as a result, he collaborates with chefs from various
                        restaurants and brands to bring you &nbsp;
                        <Tooltip
                          className="w-60"
                          showArrow={true}
                          content="Actually we work with various brands, and accept individual donations to pick up the
                          cost."
                        >
                          <span className="border-b border-dashed">
                            their finest offerings for free{" "}
                          </span>
                        </Tooltip>
                        <br />
                        1. Download the app to explore all the exciting options
                        Foodhini has to offer.
                        <br />
                        2. If you receive &nbsp;
                        <Tooltip
                          className="w-80"
                          showArrow={true}
                          content="'Foodhini says: Google is buying dinner for 5,000 members who blogs about this product: sample-product.com'."
                        >
                          <span className="border-b border-dashed">
                            a notification from Foodhini{" "}
                          </span>
                        </Tooltip>
                        , act quickly to take advantage of the best cuisines,
                        treats, dishes, and desserts from top restaurants in
                        town.
                        <br />
                        3. Search or browse through local restaurant menus in
                        the app, place your order, and enjoy.
                      </span>
                      <div className="grid grid-cols-2 mt-5 mb-3 mx-auto">
                        <span className="flex justify-center mx-2 cursor-pointer">
                          <img
                            className="rounded-small border h-9"
                            src="/images/foodini/applogo.png"
                            alt="Apple_app_store"
                          />
                        </span>
                        <span className="flex justify-center mx-2 cursor-pointer">
                          <img
                            className="rounded-small border w-24"
                            src="/images/foodini/gplay.png"
                            alt="Google_app_store"
                          />
                        </span>
                      </div>
                    </span>
                  </span>
                </div>
              </nav>
              {/* End Tab Navs */}
            </div>
            {/* End Col */}
            <div className="lg:col-span-6">
              <div className="relative">
                {/* Tab Content */}
                <div>
                  <div
                    id="tabs-with-card-1"
                    role="tabpanel"
                    aria-labelledby="tabs-with-card-item-1"
                  >
                    <img
                      className="shadow-xl shadow-gray-200 rounded-xl lg:-mt-[318px] dark:shadow-gray-900/20"
                      src="/images/foodini/foodini3.jpeg"
                      alt="Image Description"
                    />
                  </div>
                  <div
                    id="tabs-with-card-2"
                    className="hidden"
                    role="tabpanel"
                    aria-labelledby="tabs-with-card-item-2"
                  >
                    <img
                      className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/20"
                      src="https://images.unsplash.com/photo-1665686306574-1ace09918530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&h=1220&q=80"
                      alt="Image Description"
                    />
                  </div>
                  <div
                    id="tabs-with-card-3"
                    className="hidden"
                    role="tabpanel"
                    aria-labelledby="tabs-with-card-item-3"
                  >
                    <img
                      className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/20"
                      src="https://images.unsplash.com/photo-1598929213452-52d72f63e307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&h=1220&q=80"
                      alt="Image Description"
                    />
                  </div>
                </div>
                {/* End Tab Content */}
                {/* SVG Element */}
                <div className="hidden absolute top-0 end-0 translate-x-20 md:block lg:translate-x-20">
                  <svg
                    className="w-16 h-auto text-orange-500"
                    width={121}
                    height={135}
                    viewBox="0 0 121 135"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                      stroke="currentColor"
                      strokeWidth={10}
                      strokeLinecap="round"
                    />
                    <path
                      d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                      stroke="currentColor"
                      strokeWidth={10}
                      strokeLinecap="round"
                    />
                    <path
                      d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                      stroke="currentColor"
                      strokeWidth={10}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                {/* End SVG Element */}
              </div>
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
          {/* Background Color */}
          <div className="absolute inset-0 grid grid-cols-12 size-full">
            <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-gray-100 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full dark:bg-neutral-950" />
          </div>
          {/* End Background Color */}
        </div>
      </div>
      {/* End Features */}
    </>
  );
};

export default Foodhini;
