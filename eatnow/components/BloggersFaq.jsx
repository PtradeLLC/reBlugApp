"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from "next/link";

export default function BloggersFAQ() {
  const Questions = [
    "Who is this platform for, and why should I take it seriously?",
    "How much would this cost, what are your price points?",
    "What are the differences between Article Assistant (Basic and Advanced)?",
    "What is Foodhini, and why should I use it?",
  ];

  const Answers = [
    "While social media dominates the spotlight, blogging offers a deeper well of information and long-lasting value. Often seen as the older sibling, blogging deserves a comeback. That's why our platform prioritizes bloggers, giving them the tools to share their knowledge and insights in a meaningful way, help them grow their influence all the while monetizing their contents  . The platform is for bloggers, writers, and anyone who wants to share their life stories. You don’t necessarily have to be a writer to write your stories or have years full of experience, we have tools to guide you step by step as you start from a blank page.",
    "Writing and publishing blog articles on the platform is free. You may join right now and share your stories with the world at no cost. Use features that lets you articulate your thoughts, Article Assistant (Base model) tool, monetize your reach with 'Eat Now, Pay Never' tool, minimize technical challenges you may be facing on other blogging platforms, and take advantage of our multi-platform publishing feature. However, premium features that helps you improve article engagement, establish your blog as a brand, grow your subscriber, Article Assistant (Advanced model), monetize your content in multiple ways, secure brand sponsorship, utilize blogging-to-podcasting feature, and reach a larger audience through cross-platform publishing are available for paid plans. Check out our Pricing page for more details.",
    "Article Assistant (Base model) is a free model that lets your readers ask questions about your blog articles on ReBlug. Your readers for example can ask about the certain terminologies, words, concepts you defined within the stories, and it will provide accurate answers while the readers are still on the page - No need for them to navigate away to another site for answers. The base model can also be used for research on articles to help readers better understand what your article is about while trying to derive values and insights. The Article Assistant (Advanced model) does everything that the base model does and more, it also provides additional features such as 'Accept Sponsorship from brands', 'Double up as Sales agent for use in our bCommerce feature enabled on the page', nudges readers to subscribe to your blog, collect reader information in any case they want to contact you or have questions that goes beyond your article.",
    "The concept of Foodhini is to develop a tool that serves as liaison between brand partners and community members. Foodhini connects brands who are eager to reach new audiences and are willing to invest heavily in doing so with members. We want to reward you for your activity on the platform! You'll be compensated for every interaction with our brand partners starting from day one. We believe it's a Win-win situation as brands benefit from organic content sharing and real experiences, while you get rewarded for your participation. To jumpstart your experience, we're providing a 'no-commitment' $30 deposit in a virtual card for you, and you may use this as form of payment to get started with tools such as 'Eat Now, Pay Never', and we encourage you to place food orders from local restaurants listed on the platform as these restaurants provides incentives that aren't available on other food delivery platforms(e.g. Get notified to pick up free deserts, coffee, ice cream or get VIP treatments if you decide to dine in at their location - These are part of our agreement when we partnered and onboarded them on the platform). The $30 is roughly the average cost of an order from local restaurants and food providers listed on the platform. You may save to stack up the funds or spend it online as you see fit.",
  ];

  return (
    <div className="px-8">
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
      <span className="flex justify-center items-center text-md my-3">
        <p className="mx-1">More questions?</p>
        <Link
          className="flex justify-center items-center w-60 h-10 rounded-md text-md my-3 border"
          href="https://cal.com/rebug-chrisb/30min"
        >
          Schedule a meeting today
        </Link>
      </span>
    </div>
  );
}
