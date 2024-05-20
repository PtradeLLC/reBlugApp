import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function WhyENPN() {
  const Questions = [
    "You might wonder why you should list your restaurant with us when there are apps like Seamless, UberEats, and GrubHub. What makes us different?",
    "How do we make money if your users are not paying anything out of pocket?",
    "So who is paying for this, it seems expensive.",
  ];

  const Answers = [
    "That's a great question. Our membership is growing rapidly because our app is free to download, and users can order food without paying anything out of pocket. Unlike other apps like Seamless, UberEats, and GrubHub, where users have to pay for their food, our service is completely free for them. This means you'll receive a high volume of food orders through our platform.",
    "Nothing changes in the way you get paid. Each of our members receives a virtual credit card upon registration, which is preloaded with funds. When members order food, they use this virtual card as their form of payment, and you charge their account as usual.",
    "Great question. We provide an initial fund of $30 (based on the average order prices on the platform) to our members with no strings attached, allowing them to order food within this budget without worrying about repayment. Subsequent funds are raised and provided by our brand partners based on members participation as well as donations from our community.",
  ];

  return (
    <>
      <div className="text-xl font-bold my-3">
        Here are some of the questions we receive.
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
    </>
  );
}
