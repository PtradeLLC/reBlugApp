import React, { useState } from "react";
import { Button } from "@nextui-org/react";

const CampaignAutomation = ({ onFrequencyChange }) => {
  const [frequency, setFrequency] = useState("none");

  const handleFrequencyChange = (e) => {
    const value = e.target.value;
    setFrequency(value);
    onFrequencyChange(value);
  };

  return (
    <>
      <p className="text-sm font-medium text-gray-500 mb-3">
        Automate this process:
      </p>
      <div className="flex flex-col gap-2 h-9 my-3 md:flex-row lg:flex-row sm:mb-5">
        <div className="flex w-full px-2 items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            checked={frequency === "none"}
            id="bordered-radio-1"
            type="radio"
            value="none"
            name="bordered-radio"
            onChange={handleFrequencyChange}
            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="bordered-radio-1"
            className="w-[190px] py-4 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300"
          >
            Single Run
          </label>
        </div>
        <div className="flex w-full px-2 items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            checked={frequency === "twoWeeks"}
            id="bordered-radio-2"
            type="radio"
            value="twoWeeks"
            name="bordered-radio"
            onChange={handleFrequencyChange}
            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="bordered-radio-2"
            className="w-[190px] py-4 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300"
          >
            Every Two Weeks
          </label>
        </div>
        <div className="flex w-full px-2 items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            checked={frequency === "monthly"}
            id="bordered-radio-3"
            type="radio"
            value="monthly"
            name="bordered-radio"
            onChange={handleFrequencyChange}
            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="bordered-radio-3"
            className="w-[190px] py-4 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300"
          >
            Once a Monthly
          </label>
        </div>
      </div>
    </>
  );
};

export default CampaignAutomation;
