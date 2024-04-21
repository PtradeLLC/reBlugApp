import React from "react";

const Earnings = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <h2 className="text-xl font-bold">Earnings</h2>
      <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
        <dl className="mx-8">
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Profit
          </dt>
          <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
            $0
          </dd>
        </dl>
        <div>
          <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
            <svg
              className="w-2.5 h-2.5 me-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13V1m0 0L1 5m4-4 4 4"
              />
            </svg>
            Profit rate 0%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 py-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Income
          </dt>
          <dd className="leading-none text-xl font-bold text-green-500 dark:text-green-400">
            $0
          </dd>
        </dl>
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Expense
          </dt>
          <dd className="leading-none text-xl font-bold text-red-600 dark:text-red-500">
            -0
          </dd>
        </dl>
      </div>

      <div id="bar-chart"></div>
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <a
            href="#"
            className="uppercase text-sm font-thin inline-flex items-center rounded-lg text-red-600 hover:text-red-700 dark:hover:text-red-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
