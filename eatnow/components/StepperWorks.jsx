import { useState } from "react";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";

const Steps = () => {
  const tooltipContent = (
    <Tooltip className="w-80" showArrow={true} content="">
      <span className="">
        Shortly after your campaign is launched you can track progress in real
        time within your dashboard.
      </span>
    </Tooltip>
  );

  const [steps, setStep] = useState({
    stepsItems: [
      "Register or login to your account via dashboard and launch a 'B2B' or 'B2C' campaign. Upon receiving the order we will begin by meeting with you to understand your goals, target audience, and requirements.",
      "We then set up our system to work within your budget, audience, deploy marketing tool, set schedule, and other parameters to launch your campaign effectively.",
      "",
    ],
    currentStep: 2,
  });

  return (
    <div id="foodini" className="flex flex-col justify-center items-center">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 mb-10 mt-10">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl font-barlow-condensed">
          How this works
        </h1>
        <ul aria-label="Steps" className="items-center text-gray-600 md:flex">
          {steps.stepsItems.map((item, idx) => (
            <li
              key={idx}
              aria-current={steps.currentStep == idx + 1 ? "step" : false}
              className="flex-1 flex md:items-center text-lg"
            >
              <div
                className={`flex-1 flex items-center gap-x-3 md:block ${
                  idx != 0 ? "md:space-x-10" : ""
                }`}
              >
                <span
                  className={`block h-24 w-1 md:w-full md:h-1 ${
                    steps.currentStep > idx + 1 ? "bg-green-600" : "bg-red-200"
                  }`}
                ></span>
                <div className="md:mt-2">
                  <p
                    className={`text-sm ${
                      steps.currentStep > idx + 1 ? "text-green-600" : ""
                    }`}
                  >
                    Step {idx + 1}
                  </p>
                  <h4 className="mt-1 font-normal">
                    {idx === 2 ? tooltipContent : item}
                  </h4>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-3">
        <Link
          href="/brands"
          className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Find out more
        </Link>
      </div>
    </div>
  );
};

export default Steps;
