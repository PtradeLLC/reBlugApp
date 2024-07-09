"use client";

import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

// Correct usage of Radio component in @headlessui/react
const Radio = RadioGroup.Option;

const frequencies = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  { value: "annually", label: "Annually", priceSuffix: "/year" },
];

const tiers = [
  {
    name: "Blog basic + Foodhini Says",
    id: "default",
    href: "#",
    price: { monthly: "Free", annually: "Free" },
    description: "The essentials to provide your best work for clients.",
    features: ["Write & Publish", "Foodhini features", "Basic analytics"],
    mostPopular: false,
  },
  {
    name: "Brand Sponsorship",
    id: "sponsorship",
    href: "#",
    price: { monthly: "$69.99", annually: "$759.99" },
    description: "The essentials to provide your best work for clients.",
    features: ["$80 Off", "Up to 1,000 subscribers", "Basic analytics"],
    mostPopular: false,
  },
  {
    name: "bCommerce",
    id: "bCommerce",
    href: "#",
    price: { monthly: "$39.99", annually: "$429.88" },
    description: "The essentials to provide your best work for clients.",
    features: ["$50 Off", "Up to 1,000 subscribers", "Basic analytics"],
    mostPopular: false,
  },
  {
    name: "Cross-Promotion services",
    id: "cross-pro",
    href: "#",
    price: { monthly: "$29.00", annually: "$348" },
    description: "The essentials to provide your best work for clients.",
    features: ["5 products", "Up to 1,000 subscribers", "Basic analytics"],
    mostPopular: false,
  },
  {
    name: "Mentorship",
    id: "mentorship",
    href: "#",
    price: { monthly: "$19.99", annually: "$239.88" },
    description: "The essentials to provide your best work for clients.",
    features: ["5 products", "Up to 1,000 subscribers", "Basic analytics"],
    mostPopular: false,
  },
  {
    name: "Bundle",
    id: "all-products",
    href: "#",
    price: { monthly: "$158.97", annually: "$1700.00" },
    description: "The essentials to provide your best work for clients.",
    features: ["$200 Off", "Up to 1,000 subscribers", "Basic analytics"],
    mostPopular: false,
  },
  // ...other tiers
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function PricingForBloggers() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <div className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-1 text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Tools to Help You Generate, Publish contents & Income from Your Blog
          </p>
        </div>
        <div className="mt-16 flex justify-center">
          <fieldset aria-label="Payment frequency">
            <RadioGroup
              value={frequency}
              onChange={setFrequency}
              className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
            >
              {frequencies.map((option) => (
                <Radio
                  key={option.value}
                  value={option}
                  className="cursor-pointer rounded-full px-2.5 py-1 text-gray-500 data-[checked]:bg-red-600 data-[checked]:text-white"
                >
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          </fieldset>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular
                  ? "ring-2 ring-red-600"
                  : "ring-1 ring-gray-200",
                "rounded-3xl p-8"
              )}
            >
              <h3
                id={tier.id}
                className={classNames(
                  tier.mostPopular ? "text-red-600" : "text-gray-900",
                  "text-lg font-semibold leading-8"
                )}
              >
                {tier.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  {tier.price[frequency.value]}
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-600">
                  {frequency.priceSuffix}
                </span>
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "bg-red-600 text-white shadow-sm hover:bg-red-500"
                    : "text-red-600 ring-1 ring-inset ring-red-200 hover:ring-red-300",
                  "mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                )}
              >
                Buy plan
              </a>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-red-600"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingForBloggers;
