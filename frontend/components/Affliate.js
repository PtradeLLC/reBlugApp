import React from "react";
import Image from "next/image";
import Link from "next/link"

const clickRate = [
  { 'Timing and Frequency': " Launch and send unintrusive AI-Powered Email marketing campaign using Email Email ChatBot." },
  { 'Poor Subject Lines': " Conversation Email Tool scans web and social media for recipients' latest posts, dynamically crafting subject lines." },
  { 'Irrelevant Content': " Segment and Identify quality leads based on keywords and connected social metrics." },
  { 'Unresponsive Emails': " Deploy Email ChatBot to answer questions, provide support with Email Email ChatBot." },
  { 'List Hygiene Issues': "  Regularly clean email list by removing inactive subscribers. Encourage engagement through re-engagement campaigns." },
  { 'Poor Email Design': " Our tool comes with beautifully designed email templates developed to balance text and images." },
];
const openRate = [
  { 'Emails Labeled as Spam': " Our Tool is configured to avoid spammy practices, using a clear sender name, authenticating  emails, and adhere to email marketing best practices." },
  { 'Lack of Personalization': " Conversation Email Tool personalizes emails by using the recipient's name, engages recipients based on public social data, referencing social media posts." },
  { 'Misaligned Audience Targeting': " Email list based on demographics, behavior, or preferences conducted by various LLM models. Send targeted and relevant content to improve engagement." },
  { 'Low-Quality Email Content:': " The tool creates high-quality, relevant, and valuable content that aligns with the expectations of your recipients." },
  { 'Device Compatibility Issues': " The tool comes with responsive design templates to ensure that your emails look good and function well on desktops, tablets, and mobile devices." },
  { 'Weak Source': " Import your contact list, combine with ours or let AI generate a list of emails based on your input that are most qualified to respond to your campaign." },
];

export default function Affiliate() {
  return (
    <div id="email-tool" className="sm:py-16">
      <div className="relative isolate">
        <div className="mx-auto max-w-[85rem] sm:px-6">
          <div className="mx-auto flex flex-col sm:gap-8 px-6 py-10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:py-5 xl:gap-x-10 xl:px-10">
            <div className="h-14">
              <Image
                className="h-50 w-full flex-none rounded-2xl object-cover lg:aspect-square lg:max-w-sm"
                src="/images/emailmar.jpg"
                alt="tool-image"
                width={400}
                height={50}
              />
            </div>
            <div className="w-full gap-8 mt-56 lg:mt-0">
              <h2 className="text-2xl font-bold tracking-tight text-black sm:text-4xl">
                Marketing: <span className="text-slate-700 font-thin">Email Marketing</span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-black">
                <span className="underline font-thin"><Link target="_blank" href="https://www.mailerlite.com/blog/compare-your-email-performance-metrics-industry-benchmarks">According to MailerLite&apos;s Email marketing benchmarks</Link></span>, the Average Open and Click Rates for email marketing are 41.31% and 3.01%, respectively.
                So much for a communication tool, right?<br /> Our analysis suggests there is room for improvement in these metrics. Despite the estimated email marketing revenue reaching almost $12.33 billion in 2024, the average/click rate ratios are not particularly impressive. These are solutions we&apos;re proposing:
              </p>
              <p className="mt-3 mb-1 text-red-600 font-semibold">Separating Concerns for Open | Click Rates:</p>
              <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-2 xl:gap-x-8 my-1">
                <span className="overflow-hidden rounded-xl border border-gray-20">
                  <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-4">
                    <p className="font-medium italic ">Addressing Key Open Rate Concerns:</p>
                  </div>
                  {clickRate.map((benefitObject, index) => {
                    const key = Object.keys(benefitObject)[0];
                    const value = benefitObject[key];
                    if (key && value) {
                      return (
                        <li key={index} className="px-2 py-2">
                          <span className="font-semibold">Issue:</span> {key}<br /><span className="font-semibold">Our Solution:</span>{value}
                        </li>
                      );
                    }
                    return null;
                  })}

                </span>
                <span className="overflow-hidden rounded-xl border border-gray-20">
                  <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-4">
                    <p className="font-medium italic ">Addressing Key Click Rate Concerns:</p>
                  </div>
                  {openRate.map((benefitObject, index) => {
                    const key = Object.keys(benefitObject)[0];
                    const value = benefitObject[key];
                    if (key && value) {
                      return (
                        <li key={index} className="px-2 py-2">
                          <span className="font-semibold">Issue:</span> {key}<br /><span className="font-semibold">Our Solution:</span>{value}
                        </li>
                      );
                    }
                    return null;
                  })}
                </span>
              </ul>
              <div className="mt-10 flex">
                <Link
                  href={'/login'}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  Even better, Give it a Spin<span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1318/752] w-[82.375rem] flex-none opacity-25"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
