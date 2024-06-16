import React from "react";
import PropTypes from "prop-types";
import {
  faHourglass,
  faLifeRing,
  faLightbulb,
  faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const contents = [
  {
    color: "red",
    icon: faHourglass,
    title: "Beginner",
    text: "First we collect all kind of reviews from our clients. Which then help us to understand the market value of our product.",
  },
  {
    color: "yellow",
    icon: faLifeRing,
    title: "Expert",
    text: "First we collect all kind of reviews from our clients. Which then help us to understand the market value of our product.",
  },
  {
    color: "teal",
    icon: faWindowRestore,
    title: "Tools",
    text: "First we collect all kind of reviews from our clients. Which then help us to understand the market value of our product.",
  },
  {
    color: "purple",
    icon: faLightbulb,
    title: "Monetize",
    text: "First we collect all kind of reviews from our clients. Which then help us to understand the market value of our product.",
  },
];

const colorClasses = {
  red: "bg-red-500 shadow-red-500",
  yellow: "bg-yellow-500 shadow-yellow-500",
  teal: "bg-teal-500 shadow-teal-500",
  purple: "bg-purple-500 shadow-purple-500",
};

const ContentItem = ({ item, index }) => (
  <div
    className={`${
      colorClasses[item.color]
    } flex flex-col items-center justify-center shadow-lg text-white rounded-2xl text-center p-6 md:py-10 h-full ${
      index % 2 === 1 ? "lg:mt-16" : ""
    }`}
  >
    <div className="text-5xl mb-6">
      <FontAwesomeIcon icon={item.icon} />
    </div>
    <h4 className="text-2xl font-medium mb-2">{item.title}</h4>
    <p className="opacity-75 mt-4">{item.text}</p>
  </div>
);

ContentItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const HowItWorks12 = () => {
  return (
    <section className="ezy__howitworks12 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-[1]">
      <div className="container px-4 m-auto">
        <div className="w-full text-center">
          <h2 className="text-3xl md:text-[45px] leading-none font-thin tracking-wide uppercase mb-2">
            Blogging on ReBlug is Easy
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-6 mt-12 md:mt-20">
          {contents.map((item, i) => (
            <div className="col-span-12 sm:col-span-6 lg:col-span-3" key={i}>
              <ContentItem index={i} item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks12;

// import React from "react";
// import PropTypes from "prop-types";
// import {
//   faHourglass,
//   faLifeRing,
//   faLightbulb,
//   faWindowRestore,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const contents = [
//   {
//     color: "red",
//     icon: faHourglass,
//     title: "Strategy",
//     text: " First we collect all kind of reviews from our clients. Which then help us to understand the market value of our product.",
//   },
//   {
//     color: "yellow",
//     icon: faLifeRing,
//     title: "Marketing",
//     text: "First we collect all kind of reviews from our clients. Which then help us to understand the market value of our product.",
//   },
//   {
//     color: "teal",
//     icon: faWindowRestore,
//     title: "Product Design",
//     text: "First we collect all kind of reviews from our clients. Which then help us to understand the market value of our product.",
//   },
//   {
//     color: "purple",
//     icon: faLightbulb,
//     title: "Branding",
//     text: "First we collect all kind of reviews from our clients. Which then help us to understand the market value of our product.",
//   },
// ];

// const ContentItem = ({ item, index }) => (
//   <div
//     className={`bg-${
//       item.color
//     }-500 flex flex-col items-center justify-center shadow-lg shadow-${
//       item.color
//     }-500 text-white rounded-2xl text-center p-6 md:py-10 h-full ${
//       index % 2 === 1 && "lg:mt-16"
//     }`}
//   >
//     <div className="text-5xl mb-6">
//       <FontAwesomeIcon icon={item.icon} />
//     </div>
//     <h4 className="text-2xl font-medium mb-2">{item.title}</h4>
//     <p className="opacity-75 mt-4">{item.text}</p>
//   </div>
// );

// ContentItem.propTypes = {
//   item: PropTypes.object.isRequired,
//   index: PropTypes.number.isRequired,
// };
// const HowItWorks12 = () => {
//   return (
//     <section className="ezy__howitworks12 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-[1]">
//       <div className="container px-4">
//         <div className="w-full text-center">
//           <h2 className="text-3xl md:text-[45px] leading-none font-thin tracking-wide uppercase mb-2">
//             Our Work Process
//           </h2>
//         </div>
//         <div className="grid grid-cols-12 gap-6 mt-12 md:mt-20">
//           {contents.map((item, i) => (
//             <div className="col-span-12 sm:col-span-6 lg:col-span-3" key={i}>
//               <ContentItem index={i + 1} item={item} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HowItWorks12;
