"use client";
import React, { useState, useEffect } from "react";
import Products from "../../components/AllProducts";
import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { account } from "../appwrite";

const tiers = [
  {
    name: "Personal",
    id: "tier-personal",
    href: "/login",
    priceMonthly: "$29",
    description:
      "The perfect plan if you're just getting started with our product.",
    features: [
      "AI-powered Article Assistant",
      "eCommerce Features",
      "Brand Sponsorship Opportunities",
      "Bloggers community",
      "Bloggers Tool for Research and Insights",
      "Email support",
    ],
    featured: true,
  },
  {
    name: "Team",
    id: "tier-team",
    href: "/login",
    priceMonthly: "$99",
    description: "All the features of the Personal plan, plus:",
    features: [
      "Priority support",
      "Single sign-on",
      "Enterprise integrations",
      "Custom reporting tools",
    ],
    featured: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const page = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
        setLoading(false); // Set loading to false after fetching user
      } catch (error) {
        console.log("Error fetching user:", error);
        setLoading(false); // Set loading to false even if fetching fails
      }
    };

    getUser();
  }, [user]);

  return (
    <div>
      <Products />
      {/* <SubscriptionProd /> */}
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "relative bg-white shadow-2xl"
                : "bg-white/60 sm:mx-8 lg:mx-0",
              tier.featured
                ? ""
                : tierIdx === 0
                  ? "rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none"
                  : "sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl",
              "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
            )}
          >
            <h3 id={tier.id} className="text-base/7 font-semibold text-red-600">
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-semibold tracking-tight text-gray-900">
                {tier.priceMonthly}
              </span>
              <span className="text-base text-gray-500">/month</span>
            </p>
            <p className="mt-6 text-base/7 text-gray-600">{tier.description}</p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm/6 text-gray-600 sm:mt-10"
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
            {user ? (
              <Link
                href={"#"}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? "bg-red-600 text-white shadow hover:bg-red-500"
                    : "text-red-600 ring-1 ring-inset ring-red-200 hover:ring-red-300",
                  "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:mt-10"
                )}
              >
                Subscribe now
              </Link>
            ) : (
              <Link
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? "bg-red-600 text-white shadow hover:bg-red-500"
                    : "text-red-600 ring-1 ring-inset ring-red-200 hover:ring-red-300",
                  "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:mt-10"
                )}
              >
                Login to get started
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
