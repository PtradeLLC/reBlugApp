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
          <div className="relative p-4 w-full max-w-[40rem] flex justify-center items-center">
            <div className="relative bg-white rounded-lg shadow overflow-y-auto dark:bg-gray-700">
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
                  With <span className="italic">b</span>Commerce, you can sell
                  your products or those from our partners in your blog
                  articles. For example, if your blog is about golfing, you can
                  include golfing-related products in your posts.
                </span>
                <p>Benefits of using ReBlug:</p>
                <ul className="mt-2 m-3 list-disc">
                  <li className="text-md">Sell your own products</li>
                  <li className="text-md">Sell partner products</li>
                  <li className="text-md">
                    No inventory management for partner products
                  </li>
                  <li className="text-md">Keep 100% of your earnings</li>
                  <li className="text-md">
                    Access over 500 million products from Shopify, Amazon,
                    Walmart, and more
                  </li>
                  <li className="text-md">
                    Collaborate automatically with other bloggers to
                    cross-promote articles and products
                  </li>
                </ul>
                <p className="text-md">
                  To begin simply add products or scroll and select from the
                  list of partner Products to your collection. Once added, they
                  will be available to you when you write an article.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorksModal;
