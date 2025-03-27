"use client";
import React, { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { account } from "../app/appwrite";
import Link from "next/link";

const includedFeatures = [
  "One-click installation",
  "Chat assistant for your blog visitors",
  "Fine-tuned for in-article research",
  "Customizable for your brand/website",
  "Uses the article's content as a knowledge base",
  "Connect authors and readers with a single click",
  "From quick summaries to in-depth answers",
  "On-going support and updates",
  "Gather insights from your readers",
  "Latest updates with no subscription fees",
];

export default function Products() {
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
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-balance sm:text-6xl mt-20">
            Products
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Choose between one-time product or flexible subscriptions below.
            One-time purchases offer full features; subscriptions provide
            ongoing access to updates and benefits. Explore our options below.!
            🚀
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-3xl font-semibold tracking-tight text-gray-900">
              AI-powered Article Assistant
            </h3>
            <p className="mt-6 text-base/7 text-gray-600">
              Enhance each blog post with our AI-powered Article Assistant,
              turning it into an interactive research tool. Readers can dive
              deep into topics, verify facts, and interact with the content—all
              without leaving the page.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm/6 font-semibold text-red-600">
                What’s included
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm/6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
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
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">
                  Pay once, own it forever
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-semibold tracking-tight text-gray-900">
                    $24.99
                  </span>
                  <span className="text-sm/6 font-semibold tracking-wide text-gray-600">
                    USD
                  </span>
                </p>
                {user ? (
                  <Link
                    href="#"
                    className="mt-10 block w-full rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Buy Now
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="mt-10 block w-full rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Begin with a free Access
                  </Link>
                )}

                {!user ? (
                  <p className="mt-6 text-xs/5 text-gray-600">
                    You may make a one-time payment or sign up for a
                    subscription after login.
                  </p>
                ) : (
                  <p className="mt-6 text-xs/5 text-gray-600">
                    Install and use this product on your own website or blog.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
