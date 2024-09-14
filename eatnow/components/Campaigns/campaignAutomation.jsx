import React, { useState } from "react";

const CampaignAutomation = ({ onFrequencyChange }) => {
  const [frequency, setFrequency] = useState("none");

  const handleFrequencyChange = (e) => {
    const value = e.target.value;
    setFrequency(value);
    onFrequencyChange(value);
  };

  return (
    <div className="flex sm:flex-col lg:flex-row gap-2 h-9 my-3">
      <p className="text-sm font-medium text-gray-500">
        Automate this process:
      </p>
      <div className="flex px-2 items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
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
          className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          No, don't automate
        </label>
      </div>
      <div className="flex px-2 items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
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
          className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Every Two Weeks
        </label>
      </div>
      <div className="flex px-2 items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
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
          className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Once a Month
        </label>
      </div>
    </div>
  );
};

export default CampaignAutomation;
