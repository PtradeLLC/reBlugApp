"use client";
import Steps from "./StepperWorks";

const BrandInfo = () => {
  const plan = {
    name: "Email Conversational Tool.",
    desc: "The Average Open and Click Rates for email marketing are 41.31% and 3.01%, respectively. So much for a communication tool, right? Our analysis suggests there are room for improvement in these metrics. This unique AI-powered tool enables brands to send both transactional and marketing emails, and recipients to engage in inquiries about the email content, brand products, or services by interacting with an AI-powered chatbot embedded within the email body.",
    isMostPop: true,
    features: [
      "Poor Subject Lines",
      "Irrelevant Content",
      "Unresponsive Emails",
      "List Hygiene Issues",
      "Poor Email Design",
      "Device Compatibility Issues",
      "Misaligned Audience Targeting",
      "Lack of Personalization",
      "Weak Source",
      "Low-Quality Email Content",
    ],
  };

  const features = [
    {
      name: "Real-time Engagement",
      desc: "Designed for precision communication, this tool offers an easy way to connect with potential customers on our platform. With its real-time engagement features, you can interact with customers instantly, promoting your products or services more effectively.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      ),
    },
    {
      name: "Real-time Reporting",
      desc: "Receive detailed reports on your campaign's performance as members engage in real time. These reports provide insights into customer interactions, helping you track engagement metrics, understand user behavior, and optimize your marketing strategies for better results.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
          />
        </svg>
      ),
    },
    {
      name: "AI-Powered Insights",
      desc: "AI-powered insights on your campaign's performance as members engage. These insights provide comprehensive data on customer interactions, helping you track engagement metrics, understand user behavior, and optimize your marketing strategies for better results.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          />
        </svg>
      ),
    },
    {
      name: "Real-time feedback",
      desc: "Members quickly and easily send their feedback on products or services directly through the platform, ensuring you capture their thoughts when they are most engaged.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      <section id="brand-info" className="relative py-8">
        <div className="max-w-screen-xl mx-auto text-gray-600 md:px-8">
          <div className="relative max-w-xl space-y-3 px-4 md:px-0">
            <h3 className="text-slate-600 font-semibold">
              Brand Marketing Tools
            </h3>
            <p className="text-gray-800 text-2xl font-semibold sm:text-3xl font-barlow-condensed">
              Consumer Focused Marketing
            </p>
            <div className="max-w-xl">
              <p>
                Take the guess work out of your marketing. Launch and Deliver
                targeted campaigns to an audience waiting to be reached. Our
                consumer-focused tools and strategies will help you reach your
                target audience precisely and efficiently. This tools are great
                for product launch, product/service feedback, subscription,
                promotions and surveys.
              </p>
            </div>
          </div>
          <div className="mt-7">
            <p className="text-xl text-gray-800 font-semibold sm:text-xl">
              Pay Per Task
            </p>
            <p className="text-sm text-gray-800 font-semibold sm:text-sm">
              B2C
            </p>
          </div>
          <div className="mt-8 justify-between gap-8 md:flex">
            <ul className="flex-1 max-w-md space-y-10 px-4 md:px-0">
              {features.map((item, idx) => (
                <li key={idx} className="flex gap-x-3">
                  <div className="flex-none w-12 h-12 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-800 font-medium">
                      {item.name}
                    </h4>
                    <p className="text-gray-600 mt-2 md:text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex-1 flex flex-col border-y mt-6 md:max-w-xl md:rounded-xl md:border md:border-x-none md:shadow-lg md:mt-0">
              <div className="p-4 py-8 border-b md:p-8">
                <div className="justify-between flex">
                  <div className="max-w-xs">
                    <span className="text-xl text-gray-800 font-semibold sm:text-xl">
                      {plan.name}
                    </span>
                    <p className="font-semibold">B2B</p>
                    <p className="mt-3 sm:text-sm">{plan.desc}</p>
                  </div>
                </div>
                <button className="mt-4 px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-slate-600 hover:bg-slate-500 active:bg-slate-700">
                  More Information
                </button>
              </div>
              <ul className="p-4 space-y-3 sm:grid sm:grid-cols-2 md:block md:p-8 lg:grid">
                <div className="pb-2 col-span-2 text-gray-800 font-medium">
                  <p>Addressing pain-points by solving these issues:</p>
                </div>
                {plan.features.map((featureItem, idx) => (
                  <li key={idx} className="flex items-center gap-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-slate-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {featureItem}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div>
        <Steps />
      </div>
    </div>
  );
};

export default BrandInfo;
