"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ConnectedPayment from "./ConnectPayments";
import Link from "next/link";

const MonetizeBlog = () => {
  const [openModal, setOpenModal] = useState(false);

  //   const handleUserType = () => {
  //     if (setModalOpen) {
  //       setModalOpen(true);
  //     } else {
  //       console.error(
  //         "setModalOpen function is not defined or passed correctly."
  //       );
  //     }
  //   };

  return (
    <div className="flex justify-center">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Opportunities awaits
            </h2>
            <p className="text-gray-500 sm:text-xl dark:text-gray-400">
              Our goal is to offer you various opportunities to monetize your
              blog. While we explore different methods to help you earn from
              your blog and its content, your active participation is essential.
            </p>
            <p className="text-gray-500 sm:text-xl dark:text-gray-400">
              Below are some of the many ways your blog can make money on
              ReBlug.
            </p>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18.458 3.11A1 1 0 0 1 19 4v16a1 1 0 0 1-1.581.814L12 16.944V7.056l5.419-3.87a1 1 0 0 1 1.039-.076ZM22 12c0 1.48-.804 2.773-2 3.465v-6.93c1.196.692 2 1.984 2 3.465ZM10 8H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6V8Zm0 9H5v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Foodhini Says
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Enable notifications to be alerted when brand partners need your
                help. Foodhini is designed to help you monetize your
                participation on our platform. To start, we've added $30 to your
                account via a virtual card. You can use this fund through our
                'Eat Now, Pay Never' feature to order meals from local
                restaurants. Your virtual card will be funded as you continue to
                complete various tasks.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
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
                    strokeWidth="2"
                    d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Brand Sponsorship
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Nothing beats getting a big check from brands seeking media
                partnerships with talented bloggers like you. ReBlug connects
                you with brands looking for long-term marketing collaborations.
                We secure opportunities with brands targeting various niches on
                our platform and are excited to introduce them to you. We'll do
                the intro, provide the tech, you keep 100% returns on your
                investment.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                <span className="italic">b</span>Commerce
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Selling products online can be challenging if you're not
                familiar with eCommerce and how it works.{" "}
                <span className="italic">b</span>
                Commerce goes further to help you succeed. We maximize your
                product's visibility and provide an AI tool for in-article
                support, doubling as your personal sales agent. Sell your own
                products or ones related to your contents that we've sourced
                from our partners.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
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
                    d="M19 7h1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h11.5M7 14h6m-6 3h6m0-10h.5m-.5 3h.5M7 7h3v3H7V7Z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Cross-Promotion services
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                If you have a large readership, offering Cross-Promotion
                services is a great way to monetize your reach. Collaborate with
                other bloggers in your niche who need help growing their
                audience by promoting their blogs for a fee. Use your loyal fan
                base to support them, and we'll help you package this service so
                you can charge for it.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg
                  className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Mentorship
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Your blogging expertise can be highly rewarding. Many novice
                bloggers and writers want to improve their skills to share their
                stories and monetize them on ReBlug. Offer a mentorship program
                to guide and support active beginners. We bring the tools to
                help you teach how to publish compelling articles.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                MarketPlace (Beta)
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Imagine an online portal that helps you effortlessly earn
                passive income. Portal where brands are actively seeking media
                partnership, and uses AI tools to identify and tailor
                opportunities for you. The AI negotiates with brands based on
                requirements you set, bids on your behalf so that all you have
                to do is review and sign the contract. No more trying to outbid
                other folks for gigs, AI can take care of that for you now.
              </p>
            </div>
          </div>
          <div className="mt-9 flex justify-center items-center bg-stone-600 rounded-md text-white h-9 w-32">
            <Link href={"/account"}>Get started now</Link>
          </div>
        </div>
      </section>
      <div>
        {/* {openModal && (
          <ConnectedPayment openModal={openModal} setOpenModal={setOpenModal} />
        )} */}
      </div>
    </div>
  );
};

export default MonetizeBlog;
