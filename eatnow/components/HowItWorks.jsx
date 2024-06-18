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
    color: "#293462",
    icon: faHourglass,
    title: "Beginner",
    text: "Our platform makes creating and publishing your blog posts a breeze. Learn from experienced bloggers through our boot camp program. Get tips on writing, formatting, and engaging your audience.",
  },
  {
    color: "#393E46",
    icon: faLifeRing,
    title: "Expert",
    text: "Everything you need to thrive as a blogger is right here! Struggling with writer's block? Our AI tools can help you brainstorm ideas, monetize and even generate content in your style of writing.",
  },
  {
    color: "#A0153E",
    icon: faWindowRestore,
    title: "Tools",
    text: "We have an array of tools and resources available at your disposal to help you succeed. While our AI-powered tools help write and publish articles, AI Assistant provides support and knowledge to readers.",
  },
  {
    color: "#414141",
    icon: faLightbulb,
    title: "Monetize",
    text: "There are multiple ways to grow and monetize your content. Establish yourself as a brand, connect and collaborate with sponsors, guide and tutor novice bloggers, present and monetize with bCommerce, and more.",
  },
];

// Dynamically create the color classes
const colorClasses = contents.reduce((acc, item) => {
  acc[item.color] = {
    backgroundColor: item.color,
  };
  return acc;
}, {});

const ContentItem = ({ item, index }) => {
  const style = colorClasses[item.color];
  return (
    <div
      className={`flex flex-col items-center justify-center text-white rounded-2xl text-center p-6 md:py-10 h-full ${
        index % 2 === 1 ? "lg:mt-16" : ""
      }`}
      style={style}
    >
      <div className="text-5xl mb-6">
        <FontAwesomeIcon icon={item.icon} />
      </div>
      <h4 className="font-barlow-condensed text-2xl font-medium mb-2">
        {item.title}
      </h4>
      <p className="opacity-75 mt-4">{item.text}</p>
    </div>
  );
};

ContentItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const HowItWorks12 = () => {
  return (
    <>
      <section className="ezy__howitworks12 light py-14 md:py-16 bg-white dark:bg-[#EEF5FF] text-zinc-900 dark:text-gray-900 relative overflow-hidden z-[1]">
        <div className="container px-4 m-auto">
          <div className="w-full text-center">
            <h2 className="font-barlow-condensed font-bold text-left text-3xl lg:text-4xl text-black">
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
    </>
  );
};

export default HowItWorks12;
