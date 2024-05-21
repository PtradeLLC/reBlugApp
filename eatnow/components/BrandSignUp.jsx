"use client";
import { useState } from "react";
import { RadioGroup, Switch } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { CreditCardIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import WhyBrandENPN from "./ENPNBrands";

const subNavigation = [
  {
    name: "Why Eat Now, Pay Never?",
    href: "#",
    icon: CreditCardIcon,
    current: true,
  },
  //   { name: "Sign Up", href: "#", icon: SquaresPlusIcon, current: false },
];

const plans = [
  {
    name: "Private Chef",
    priceMonthly: 100,
    priceYearly: 1100,
    limit: "Up to 5 active job postings",
  },
  {
    name: "Food Trucks",
    priceMonthly: 150,
    priceYearly: 1700,
    limit: "Up to 25 active job postings",
  },
  {
    name: "Restaurants",
    priceMonthly: 249,
    priceYearly: 2888,
    limit: "Unlimited active job postings",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BrandSign() {
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [annualBillingEnabled, setAnnualBillingEnabled] = useState(true);
  const [currentTab, setCurrentTab] = useState(subNavigation[0].name);

  return (
    <>
      <div className="h-full">
        <main className="mx-auto max-w-7xl pb-10 lg:px-8 lg:py-12">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <aside className="px-2 py-6 sm:px-6 lg:col-span-3 lg:px-0 lg:py-0">
              <nav className="space-y-1">
                {subNavigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setCurrentTab(item.name)}
                    className={classNames(
                      currentTab === item.name
                        ? "bg-gray-50 text-orange-600 hover:bg-white"
                        : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={currentTab === item.name ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        currentTab === item.name
                          ? "text-orange-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </button>
                ))}
              </nav>
            </aside>

            <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
              {currentTab === "Why Eat Now, Pay Never?" ? (
                <section aria-labelledby="why-us-heading">
                  <div className="">
                    <WhyBrandENPN />
                  </div>
                </section>
              ) : (
                <>
                  {/* Payment details */}
                  <section aria-labelledby="payment-details-heading">
                    <form action="#" method="POST">
                      <div className="shadow sm:overflow-hidden sm:rounded-md">
                        <div className="bg-white px-4 py-6 sm:p-6">
                          <div>
                            <h2
                              id="payment-details-heading"
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              Payment details
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                              Update your billing information. Please note that
                              updating your location could affect your tax
                              rates.
                            </p>
                          </div>

                          <div className="mt-6 grid grid-cols-4 gap-6">
                            <div className="col-span-4 sm:col-span-2">
                              <label
                                htmlFor="first-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                First name
                              </label>
                              <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="cc-given-name"
                                className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                              />
                            </div>

                            <div className="col-span-4 sm:col-span-2">
                              <label
                                htmlFor="last-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Last name
                              </label>
                              <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="cc-family-name"
                                className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                              />
                            </div>

                            <div className="col-span-4 sm:col-span-2">
                              <label
                                htmlFor="email-address"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Email address
                              </label>
                              <input
                                type="text"
                                name="email-address"
                                id="email-address"
                                autoComplete="email"
                                className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                              />
                            </div>

                            <div className="col-span-4 sm:col-span-1">
                              <label
                                htmlFor="expiration-date"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Expiration date
                              </label>
                              <input
                                type="text"
                                name="expiration-date"
                                id="expiration-date"
                                autoComplete="cc-exp"
                                className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                placeholder="MM / YY"
                              />
                            </div>

                            <div className="col-span-4 sm:col-span-1">
                              <label
                                htmlFor="security-code"
                                className="flex items-center text-sm font-medium leading-6 text-gray-900"
                              >
                                <span>Security code</span>
                                <QuestionMarkCircleIcon
                                  className="ml-1 h-5 w-5 flex-shrink-0 text-gray-300"
                                  aria-hidden="true"
                                />
                              </label>
                              <input
                                type="text"
                                name="security-code"
                                id="security-code"
                                autoComplete="cc-csc"
                                className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                              />
                            </div>

                            <div className="col-span-4 sm:col-span-2">
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Country
                              </label>
                              <select
                                id="country"
                                name="country"
                                autoComplete="country-name"
                                className="mt-2 block w-full rounded-md border-0 bg-white px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                              >
                                <option>United States</option>
                                <option>Canada</option>
                                <option>Mexico</option>
                              </select>
                            </div>

                            <div className="col-span-4 sm:col-span-2">
                              <label
                                htmlFor="postal-code"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                ZIP / Postal code
                              </label>
                              <input
                                type="text"
                                name="postal-code"
                                id="postal-code"
                                autoComplete="postal-code"
                                className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </section>

                  {/* Plan */}
                  <section aria-labelledby="plan-heading">
                    <form action="#" method="POST">
                      <div className="shadow sm:overflow-hidden sm:rounded-md">
                        <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
                          <div>
                            <h2
                              id="plan-heading"
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              Plan
                            </h2>
                          </div>

                          <RadioGroup
                            value={selectedPlan}
                            onChange={setSelectedPlan}
                          >
                            <RadioGroup.Label className="sr-only">
                              Pricing plans
                            </RadioGroup.Label>
                            <div className="relative -space-y-px rounded-md bg-white">
                              {plans.map((plan, planIdx) => (
                                <RadioGroup.Option
                                  key={plan.name}
                                  value={plan}
                                  className={({ checked }) =>
                                    classNames(
                                      planIdx === 0
                                        ? "rounded-tl-md rounded-tr-md"
                                        : "",
                                      planIdx === plans.length - 1
                                        ? "rounded-bl-md rounded-br-md"
                                        : "",
                                      checked
                                        ? "z-10 border-orange-200 bg-orange-50"
                                        : "border-gray-200",
                                      "relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-3 md:pr-6"
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <span className="flex items-center text-sm">
                                        <span
                                          className={classNames(
                                            checked
                                              ? "bg-orange-500 border-transparent"
                                              : "bg-white border-gray-300",
                                            active
                                              ? "ring-2 ring-offset-2 ring-gray-900"
                                              : "",
                                            "h-4 w-4 rounded-full border flex items-center justify-center"
                                          )}
                                          aria-hidden="true"
                                        >
                                          <span className="rounded-full bg-white w-1.5 h-1.5" />
                                        </span>
                                        <RadioGroup.Label
                                          as="span"
                                          className="ml-3 font-medium text-gray-900"
                                        >
                                          {plan.name}
                                        </RadioGroup.Label>
                                      </span>
                                      <RadioGroup.Description
                                        as="span"
                                        className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                                      >
                                        <span
                                          className={classNames(
                                            checked
                                              ? "text-orange-900"
                                              : "text-gray-900",
                                            "font-medium"
                                          )}
                                        >
                                          ${plan.priceMonthly} / mo
                                        </span>{" "}
                                        <span
                                          className={
                                            checked
                                              ? "text-orange-700"
                                              : "text-gray-500"
                                          }
                                        >
                                          (${plan.priceYearly} / yr)
                                        </span>
                                      </RadioGroup.Description>
                                      <RadioGroup.Description
                                        as="span"
                                        className={classNames(
                                          checked
                                            ? "text-orange-700"
                                            : "text-gray-500",
                                          "ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
                                        )}
                                      >
                                        {plan.limit}
                                      </RadioGroup.Description>
                                    </>
                                  )}
                                </RadioGroup.Option>
                              ))}
                            </div>
                          </RadioGroup>

                          <Switch
                            checked={annualBillingEnabled}
                            onChange={setAnnualBillingEnabled}
                            className={classNames(
                              annualBillingEnabled
                                ? "bg-orange-500"
                                : "bg-gray-200",
                              "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                annualBillingEnabled
                                  ? "translate-x-5"
                                  : "translate-x-0",
                                "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                              )}
                            />
                          </Switch>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                          >
                            Sign up
                          </button>
                        </div>
                      </div>
                    </form>
                  </section>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
