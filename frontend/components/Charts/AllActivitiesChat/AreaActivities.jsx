import React, { useState, useEffect } from "react";
import { options } from "./chartData/areaOptionsData";

const AreaActivities = () => {
  const [defaultReport, setDefaultReport] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const chartCanvas = document.getElementById("area-chart");
      if (chartCanvas && typeof ApexCharts !== "undefined") {
        const chart = new ApexCharts(chartCanvas, options);
        chart.render();
      }
    }
  }, []);

  const handleClick = () => {
    setDefaultReport("Nothing to report yet");
  };

  return (
    <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between mb-3">
        <h2 className="text-xl font-bold">My Calendar</h2>
      </div>
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
            0{" "}
            <span className="text-base font-thin text-gray-500">
              Things to do
            </span>
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Something goes here
          </p>
        </div>
      </div>
      <div id="area-chart"></div>
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <div
            id="lastDaysdropdown"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Something goes here
                </a>
              </li>
            </ul>
          </div>
          <button
            onClick={handleClick}
            type="button"
            value={defaultReport}
            className="text-sm font-thin inline-flex items-center rounded-lg text-red-600 hover:text-red-700 dark:hover:text-red-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
          >
            Report
            <svg
              className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
          <p className="text-base font-thin text-gray-500 dark:text-gray-400">
            {defaultReport ? defaultReport : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AreaActivities;
