import React, { useState } from "react";

const WorksModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="my-2">
      <button
        onClick={handleModalToggle}
        className="block text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
        type="button"
      >
        How this works
      </button>
      {isOpen && (
        <div
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={handleModalToggle}
          ></div>
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  How It works
                </h3>
                <button
                  type="button"
                  onClick={handleModalToggle}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
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
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-3">
                <span className="mt-2">
                  With b-Commerce you can include and sell your products or ones
                  that are related to your niche from our partners in your blog
                  articles and share with fans.
                  <br />
                  <br />
                  For example let's say that your niche 'sports', and your blog
                  is about 'golfing'. Partner products that are available to you
                  are everything that is related to golfing - which you can
                  include in your articles. <br /> Even better, the following
                  are some of the benefits of using ReBlug:
                </span>
                <ul className="mt-2">
                  <li className="text-sm">Sell your own products</li>
                  <li className="text-sm">Sell partner products</li>
                  <li className="text-sm">
                    No inventories to manage with partner products
                  </li>
                  <li className="text-sm">
                    Over 500 million products from Shopify, Amazon, Walmart...
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorksModal;
