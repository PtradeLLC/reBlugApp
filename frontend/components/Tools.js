import React, { useState } from "react";
import Image from "next/image";

const Tools = ({ openModal, setOpenModal }) => {
  const people = [
    {
      name: "Analyze buying Trends",
      title: "AI powered: yes",
      desc: "In today's ever-changing marketplace, it's more important than ever for brands to stay ahead of the curve. One way to do this is by using artificial intelligence (AI) to analyze buying trends on the web, and predict outcomes.",
      trialUrl: "#",
      telephone: "+1-202-555-0170",
      imageUrl: "/images/trends.png",
      waitingList: "Use as standalone",
      bgColor: "",
    },
    {
      name: "Develop Marketing Plan",
      title: "AI powered: yes",
      desc: "Our AI tool first understand your target audience's needs, preferences, and behaviors. This includes analyzing the data collected on shopping trends, Identifying new trends, Sales data, Tracking trends, and finally predicting outcomes.",
      trialUrl: "##",
      telephone: "+1-202-555-0170",
      imageUrl: "/images/plan.jpg",
      waitingList: "Use as a bundle",
      bgColor: "",
    },
    {
      name: "AI Influencer Marketing",
      title: "AI powered: yes",
      desc: "Automate influencer marketing with our AI tool. Set this tool to generate contents automatically, schedule posting and manage responses on your behalf. Reach customers at the right time with precision posting.",
      trialUrl: "##",
      telephone: "+1-202-555-0170",
      imageUrl: "/images/influencer-image.png",
      waitingList: "Join waiting list",
      bgColor: "",
    },
  ];

  return (
    <div>
      <p className="text-lg mt-4 mb-3 flex justify-center text-center pl-2 pr-2 font-semibold">
        Growth-hack your brand to success in three easy steps
      </p>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ml-12 mr-12">
        {people.map((person) => (
          <li
            key={person.trialUrl}
            className="sm:w-full col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <div className="flex flex-1 flex-col">
              <Image
                className="mx-auto h-[20rem] w-full flex-shrink-0 object-cover"
                src={person.imageUrl}
                width={400}
                height={400}
                alt="tools"
              />
              <h3 className="mt-6 text-sm font-medium text-gray-900">
                {person.name}
              </h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Title</dt>
                <dd className="text-sm text-gray-500">{person.title}</dd>
                <dt className="sr-only">desc</dt>
                <dd className="mt-3 mb-8">
                  <span className="inline-flex items-center px-2 text-xs font-medium">
                    {person.desc}
                  </span>
                </dd>
              </dl>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <button
                    onClick={() => {
                      setOpenModal(true);
                    }}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    {person.waitingList}
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tools;
