import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from "next/link";

export default function WhyENPN() {
  const Questions = [
    "You might wonder why you should list your food service business with us when there are apps like Seamless, UberEats, and GrubHub. What makes us different?",
    "How do we make money if your users are not paying anything out of pocket?",
    "So who is paying for this, it seems expensive?",
    "How do we get started?",
    "How big is your food service business client base, and why does it feel like we are being rushed to sign up?",
    "So what happens if your list in my town or city has reached the threshold of 5,000 members?",
  ];

  const Answers = [
    "That's a great question. Our membership is growing rapidly because our app is free to download, and users can order food without paying anything out of pocket. Unlike other apps like Seamless, UberEats, and GrubHub, where users have to pay for their food, our service is completely free for them. This means you'll receive a high volume of food orders through our platform.",
    "Nothing changes in the way you get paid. Each of our members receives a virtual debit card upon registration, which is preloaded with funds. When members order food, they use this virtual card as their form of payment, and you charge for your services as usual.",
    "Great question. We provide an initial fund of $30 (based on the average order prices on the platform) to our members with no strings attached, allowing them to order food within this budget without worrying about repayment. Subsequent funds are raised and provided by our brand partners based on members participation as well as donations from our community.",
    "You can get started by signing up for an account or logging in if you already have one, and then setting up your food service business. Our list of registered food service business is growing quickly, so we encourage you to register as soon as possible. We are excited to have you join us!",
    "We are currently expanding our food service business client-base. As a new player in the market, we are initially limiting registration to 5,000 members for now in each city across the US, Canada, and Mexico to avoid overwhelming our infrastructure and resources. For example, we can host up to 5,000 members in cities like Los Angeles, New York, and San Francisco, as well as in smaller towns.",
    "If the threshold of 5,000 members is reached in a town or city, we will close registration for that location. However, we will reopen it in the next cycle as we allocate more funds to our backend infrastructure.",
  ];

  return (
    <div className="px-8">
      <span className="text-lg my-3 font-bold">The Tool</span>
      <div className="text-md my-3">
        Modeled after the "Buy Now, Pay Later" concept,{" "}
        <span className="italic">Eat Now, Pay Never</span> is a marketing tool
        that lets users order food without paying anything out of pocket.
      </div>
      <div className="text-md my-3">
        Here are some of the notable questions we have been asked.
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
      <Link
        className="flex justify-center items-center w-40 h-10 rounded-md text-md my-3 border"
        href="/login"
      >
        Sign Up / Login
      </Link>
    </div>
  );
}
