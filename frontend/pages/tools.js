import React, { useState } from "react";
import EmailTool from "../components/Email_Tool";

const features = [
  {
    id: 1,
    name: "Knowledge Base",
    description:
      "With Conversational Email Agent your email recipients can chat with an AI chatbot within the body of your email messages to get answers about your brand, products, and services. The chatbot is trained based on documents to provide information about your company, uploaded products and services. Recipients can get the information and the help they need without having to contact your customer support team if they choose not to or reach out to human counterparts if needed.",
    // icon: BookOpenIcon,
  },
  {
    id: 2,
    name: "Products and Services.",
    description:
      "Upload your product information, and let AI chatbot close sales and subscriptions on your behalf with our conversational AI commerce technology.",
    // icon: BuildingStorefrontIcon,
  },
  {
    id: 3,
    name: "Connect more tools",
    description:
      "Integrate and connect with your existing apps and tools you know and love.",
    // icon: LinkIcon,
  },
];

export default function Tools() {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(true);
  };

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Embed conversational AI Agent into your emails and newsletters.
                Help customers, sell products and service in real‑time within
                email messages.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.id} className="relative pl-9">
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleClick}
                className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
              >
                Click to try now
              </button>
            </div>
          </div>
          <div className="flex items-start justify-end lg:order-first">
            <img
              src="/images/emailToolPg.png"
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>
      <span className="mt-3">
        {<EmailTool openModal={openModal} setOpenModal={setOpenModal} />}
      </span>
    </div>
  );
}
