import React, { useState } from "react";
import EmailTool from "../components/Email_Tool";
import EmailConvTool from "../components/Session_Email";

const features = [
  {
    name: "Knowledge Base",
    description:
      "Your email recipients can chat with an AI chatbot in the email body to get answers about your brand, products, and services. The chatbot is trained based on your documents to provide information about your company, uploaded products and services. Recipients can get the information and help they need without having to contact your customer support team if they choose not to.",
    // icon: BookOpenIcon,
  },
  {
    name: "Products and Services.",
    description:
      "Upload your product info, and let AI chatbot close sales on your behalf. Customers can get instant answers to product inquiries in your email campaigns and if need be, they can connect with a human representative if they need more help or want to learn more about your products and services.",
    // icon: BuildingStorefrontIcon,
  },
  {
    name: "Connect more tools",
    description:
      "You can integrate with your existing customer engagement and sales software, such as Zendesk, Salesforce, and Talkdesk. There is no need to rip and replace your existing software.",
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
                  <div key={feature.name} className="relative pl-9">
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
              src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
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
