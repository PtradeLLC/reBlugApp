import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from "next/link";

export default function WhyBrandENPN() {
  const Questions = [
    "As we are trying to launch a campaign for our product, what should we expect in order to get high returns on our investment?",
    "How much would this cost, what are your price points?",
    "So we have a campaign to launch and budget to work with, how do we get started?",
    "How long will it take to launch our campaign and get results?",
  ];

  const Answers = [
    "As artificial intelligence continues to revolutionize various industries, we are constantly adding new features to help you identify, target, and convert your ideal customers. To achieve high returns on investment, we customize each campaign with a unique incentive system tailored to your target audience, rather than using a 'one size fits all' approach. We launch, track and analyze your tailored campaign and performance to ensure your overall goals are met. Thanks to our innovative system, you can expect to see high returns on your investment from the very first day your campaign launches.",
    "A few factors affects our pricing - Factor such as blogger acquisition, meaning the cost to identify, target, and acquire the ideal blogger for your brand. Each blogger runs their own unique community on reBlug based on their selected niche and can get your message out to as many people as you want to target. To put this into perspective, if your goal is to have a hundred people share, post, and talk about your product or services within their communities will cost you based on a few factors such as number of members and their followers you'd like to target. Regardless of these factors, you can expect to get high returns on your investment. Schedule a meeting with us to learn more, and get more details on our pricing.",
    "Before we determine how to allocate your budget, we need to decide if the campaign is best suited for the 'Eat Now, Pay Never' tool or if it's better launched with other tools on the platform. For instance, the Eat Now, Pay Never tool is ideal for achieving high volume and outcomes in a relatively short period of time. On the other hand, tools like 'Blogging' are more long-term with steady but continuous returns over time. Let's get on a call to discuss the options",
    "Launching an effective campaign typically takes about 3 weeks to set up. Once launched, results start coming in immediately. You'll have access to a client dashboard to monitor your campaign's progress in real-time.",
  ];

  return (
    <div className="bg-slate-50 rounded ml-4 mr-24 mt-12">
      <div className="px-10 pt-8 ">
        <span className="text-lg my-3 font-bold">Frequently Asked</span>
        <div className="text-md my-3">
          Here are some of the notable questions we have been asked:
        </div>
        <Accordion variant="splitted">
          {Questions.map((question, index) => (
            <AccordionItem
              key={index}
              aria-label={`Accordion ${index + 1}`}
              title={question}
            >
              {Answers[index]}
            </AccordionItem>
          ))}
        </Accordion>
        <span className="flex justify-center w-full items-center text-md my-3">
          <p className="mx-1 text-xs">Questions?</p>
          <Link
            className="flex justify-center items-center w-60 h-10 rounded-md text-md my-3 border"
            href="https://cal.com/rebug-chrisb/30min"
          >
            Schedule a meeting today
          </Link>
        </span>
      </div>
    </div>
  );
}
