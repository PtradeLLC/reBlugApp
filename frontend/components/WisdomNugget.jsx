import React from "react";

const WisdomNugget = () => {
  return (
    <div>
      <div
        id="toast-interactive"
        className="w-full p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
        role="alert"
      >
        <div className="flex">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-slate-500 bg-slate-100 rounded-lg dark:text-slate-300 dark:bg-slate-900">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 9a3 3 0 0 1 3-3m-2 15h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 6 9c0 4 4 5 4 9h4Z"
              />
            </svg>
            <span className="sr-only">Refresh icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
              Wisdom Nuggets
            </span>
            <div className="mb-2 text-sm font-normal">
              Little known facts about this article
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <a
                  href="#"
                  className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-slate-600 rounded-lg hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-500 dark:hover:bg-slate-600 dark:focus:ring-slate-800"
                >
                  Deep Dive
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                >
                  Show Next
                </a>
              </div>
            </div>
          </div>
          {/* <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-interactive"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default WisdomNugget;
