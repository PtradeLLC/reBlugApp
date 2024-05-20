"use client";
import React from "react";
import { Input } from "@nextui-org/react";

const NavBar = () => {
  const placements = ["inside"];

  return (
    <>
      <header className="shadow-md sticky bg-white top-0 z-50 w-full text-sm py-3 sm:py-0">
        <nav
          className="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <div className="pr-14 pt-1 pb-1">
              <a href="/">
                <img
                  className="w-[184px] h-[24px]"
                  src="/images/reblogo.png"
                  alt="Logo"
                />
              </a>
            </div>
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-9 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-white/20 text-black/80 hover:text-black/80 hover:text-black hover:border-white/40 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1={3} x2={21} y1={6} y2={6} />
                  <line x1={3} x2={21} y1={12} y2={12} />
                  <line x1={3} x2={21} y1={18} y2={18} />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="ml-20 w-8/12">
            <div className="flex w-full flex-wrap bg-white justify-between items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
              {placements.map((placement) => (
                <Input
                  key={placement}
                  type="text"
                  className="h-10 my-2 sm:h-10"
                  label="Search for restaurants or dishes"
                  labelPlacement={placement}
                />
              ))}
            </div>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
              {/* <a
                className="font-medium text-black/80 hover:text-black  sm:py-6"
                href="#foodini"
                aria-current="page"
              >
                How it works
              </a> */}
              <a
                className="font-medium text-black/80 hover:text-black sm:py-6"
                href="/restaurant"
              >
                Submit Restaurant
              </a>
              <a
                className="font-medium text-black/80 hover:text-black sm:py-6"
                href="#"
              >
                Brands
              </a>
              <a
                className="flex items-center gap-x-2 font-medium text-black/80 hover:text-black sm:border-s sm:border-slate/30 sm:my-6 sm:ps-6"
                href="/login"
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx={12} cy={7} r={4} />
                </svg>
                Log in
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
