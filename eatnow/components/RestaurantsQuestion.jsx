import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from "next/link";

export default function RestaurantsFaq() {
  const Questions = [
    "You might wonder why you should list your menu offerings with us when there are apps like Seamless, UberEats, and GrubHub. What makes us different?",
    "How do we make money if your users are not paying anything out of pocket?",
    "So who is paying for this, it seems expensive?",
    "How do we get started?",
    "How big is your food service business client base, and why does it feel like we are being rushed to sign up?",
    "So what happens if your list in my town or city has reached the threshold of 5,000 members?",
  ];

  const Answers = [
    "That's a great question. Our membership is growing rapidly because our app is free to download, and users can order food without paying anything out of pocket. Unlike other apps like Seamless, UberEats, and GrubHub, where users have to pay for their food, our service is completely free for them. This means you'll receive a high volume of food orders through our platform.",
    "Nothing changes in the way you get paid. Each of our members receives a virtual debit card upon registration, which is preloaded with funds. When members order food, they use this virtual card as their form of payment, and you charge for your services as usual.",
    "Great question. We provide an initial fund of $30 (based on the average order prices on the platform) to our members with no strings attached, allowing them to order food within this budget without worrying about repayment. Subsequent funds are raised and provided by our brand partners based on members participation on various campaigns.",
    "You can get started by signing up for an account or logging in if you already have one, and then setting up store front for your food service business. Our list of registered food service business is growing rapidly, so we encourage you to register as soon as possible. We are excited to have you join us!",
    "We are currently expanding our food service business client-base. As a new player in the market, we are initially limiting registration to 5,000 members for now in each city and town across the US, Canada, and Mexico to avoid overwhelming our infrastructure and resources. For example, we can host up to 5,000 providers in cities like Los Angeles, New York, and San Francisco, as well as in smaller towns. This is temporary measure and will be expanded in the next cycle.",
    "If the threshold of 5,000 members is reached in a town or city, we will close registration for that location. However, we will reopen it in the next cycle as we allocate more funds to our backend infrastructure and resources.",
  ];

  return (
    <>
      <div className="bg-slate-50 rounded ml-4 mr-24 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex justify-center items-center col-span-1">
            <img
              src="/images/restaurants.jpg"
              alt="Restaurants images"
              className="rounded-lg"
            />
          </div>
          <div className="px-10 pt-8 md:col-span-2">
            <span className="text-lg my-3 font-bold">The Tool</span>
            <div className="text-md my-3">
              Leveraging the established "Buy Now, Pay Later" (BNPL) model, "Eat
              Now, Pay Never" emerges as a disruptive marketing tool. This
              innovative strategy streamlines the food ordering process by
              allowing our members to make no payment out of pocket for their
              food orders. The financial responsibility is addressed by the
              platform, and its brand partners looking to market products or
              services to our engaged user base. We encourage members to use
              funds disbursed by our platform to pay for their food orders via
              virtual debit cards we preloaded with funds.
            </div>
          </div>
        </div>
        <div className="text-md my-3">
          <span className="font-bold">Still got questions?</span>
          <br />
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
        </div>
      </div>
      <div>
        <span className="flex justify-center items-center text-md my-3">
          <p className="mx-1 text-xs">Questions?</p>
          <Link
            className="flex justify-center items-center w-60 h-10 rounded-md text-md my-3 border"
            href="https://cal.com/rebug-chrisb/30min"
          >
            Schedule a meeting today
          </Link>
        </span>
      </div>
    </>
  );
}
