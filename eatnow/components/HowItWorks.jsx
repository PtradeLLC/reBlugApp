import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BreadCrumbs from "./CategoryBreadcrumbs";

// Dynamically create the color classes
// const colorClasses = contents.reduce((acc, item) => {
//   acc[item.color] = {
//     backgroundColor: item.color,
//   };
//   return acc;
// }, {});

// const ContentItem = ({ item, index }) => {
//   const style = colorClasses[item.color];
//   return (
//     <div
//       className={`flex flex-col items-center justify-center text-white rounded-2xl text-center p-6 md:py-10 h-full ${
//         index % 2 === 1 ? "lg:mt-16" : ""
//       }`}
//       style={style}
//     >
//       <div className="text-5xl mb-6">
//         <FontAwesomeIcon icon={item.icon} />
//       </div>
//       <h4 className="font-barlow-condensed text-2xl font-medium mb-2">
//         {item.title}
//       </h4>
//       <p className="opacity-75 mt-4">{item.text}</p>
//     </div>
//   );
// };

// ContentItem.propTypes = {
//   item: PropTypes.object.isRequired,
//   index: PropTypes.number.isRequired,
// };

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
