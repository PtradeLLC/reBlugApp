import { Button } from "@nextui-org/react";
import React from "react";

const PostSubscription = () => {
  return (
    <div className="mt-3">
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
                d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
              />
            </svg>

            <span className="sr-only">Series icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
              Subscribe
            </span>
            <div className="mb-2 text-sm font-normal">
              Know when author publishes a new one
            </div>
            <Button className="bg-lime-800 text-sm text-white border border-white h-8 rounded-md">
              Subscribe to Blog
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSubscription;
