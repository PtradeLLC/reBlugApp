import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BreadCrumbs from "./CategoryBreadcrumbs";

const HowItWorks12 = () => {
  return (
    <>
      <section className="ezy__howitworks12 light pb-14 md:pt-4 md:pb-4 bg-white dark:bg-[#EEF5FF] text-zinc-900 dark:text-gray-900 relative overflow-hidden z-[1]">
        <div className="container px-4 m-auto">
          <BreadCrumbs />
          <div className="w-full text-center mt-8">
            <h2 className="font-barlow-condensed font-bold text-left text-3xl lg:text-4xl text-black">
              Blogging on ReBlug is Easy
            </h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks12;
