import React from "react";
import Link from "next/link";

const TopShape = () => (
  <svg
    className="text-white dark:text-[#0b1727] absolute top-0 left-0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1920 90"
    preserveAspectRatio="none"
  >
    <path
      d="M959 90c320.067 0 640.4-38.333 961-90H0c319.267 76.667 638.933 90 959 90z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

const BottomShape = () => (
  <svg
    className="text-white dark:text-[#0b1727] absolute bottom-0 left-0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1920 90"
    preserveAspectRatio="none"
  >
    <path
      d="M959 0c320.067 0 640.4 38.333 961 90H0C319.267 38.333 638.933 0 959 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

const Verification = () => {
  return (
    <section
      className="ezy__cta1 light relative py-14 md:py-24 overflow-hidden bg-white dark:bg-[#0b1727] text-gray-800 dark:text-white"
      style={{
        background: "linear-gradient(131deg, #ff9d66, #ff4e53);",
      }}
    >
      <TopShape />
      <BottomShape />

      <div className="container relative px-4">
        <div className="grid grid-cols-12 justify-center text-white">
          <div className="col-span-12 lg:col-span-6 lg:col-start-4 lg:mx-12">
            <div className="bg-white dark:bg-[#0B1727] rounded-lg p-6">
              {/* <h2 className="text-2xl md:text-4xl leading-none font-bold text-red-600 mb-6">
                Did you know?
              </h2> */}
              {/* <p className="text-lg leading-6 text-gray-800 dark:text-white mb-6">
                It’s easier to reach your savings goals when you have the right
                savings account.
              </p> */}
              <p className="text-lg leading-6 text-gray-800 dark:text-white mb-6">
                We just sent you an email to verify your account. Please check
                your email address to verify your account.
              </p>
              <Link
                href="/login"
                className="bg-red-600 hover:bg-opacity-90 text-white border border-red-600 py-3 px-7 rounded transition font-normal"
              >
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Verification;
