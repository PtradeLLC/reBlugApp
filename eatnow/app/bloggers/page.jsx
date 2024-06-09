"use client";
import BloggerFAQ from "../../components/BloggersFaq";

const features = [
  {
    name: "Knowledge Base Functionality",
    description:
      "Your blog articles become a knowledge base, empowering Article Assistant to conduct research, look up sources, and provide accurate information based on reader queries. This not only enhances the credibility of your content but also positions you as a go-to source for valuable insights.",
  },
  {
    name: "eCommerce Features",
    description:
      "Earn revenue by selling products based on your blog's niche. Use 'bCommerce' feature allow you to sell products directly to your readers without inventory management, product sourcing.... We will provide the product and inventory management features, AI tools trained to provide sales and support to your readers.",
  },
  {
    name: "Brand Sponsorship Opportunities",
    description:
      "Monetize your blog with ease by enabling brand sponsorship features. Article Assistant facilitates seamless engagement between you and potential sponsors, opening up new revenue streams for your blog. Build strategic partnerships and enhance your brand collaborations effortlessly.",
  },
  {
    name: "Discover Like-minded Bloggers",
    description:
      "Leverage the power of community collaboration by engaging with fellow bloggers in the directory. Explore opportunities for guest posts, collaborative projects, and cross-promotions, amplifying your content and reaching a wider audience.",
  },
  {
    name: "Run tasks for Foodhini",
    description:
      "'Foodhini Says' are tasks designed to help brands achieve their marketing goals by completing specific actions. In return for completing these tasks, we along with our brand partners will issue a virtual card in your dashboard, and fund it regularly as you run the tasks for Foodhini . This mutually beneficial arrangement allows brands to effectively reach their target audience while managing expenses strategically.",
  },
  {
    name: "Tool for Research and Insights",
    description:
      "Put power in your readers hands by giving them the tool to interact with Article Assistant for research, support, and insights - all done right on the page. With subscription and premium model enabled, you can grab the codes and install the tool on your own external blog pages.",
  },
];

export default function Bloggers() {
  return (
    <div className="bg-white">
      <div className="apply-margin mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div id="maap">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Unleash the Potential of Article Assistant{" "}
          </h2>
          <h3 className="mt-4 text-gray-500">
            Imagine having a powerful ally by your side, one that not only
            enhances the user experience on your blog but also empowers you with
            cutting-edge tools to streamline your content creation and
            engagement strategies.
          </h3>
          <p className="mt-4 text-gray-500">
            Article Assistant is not just a tool; it's your virtual companion in
            the world of blogging, enriching your content and engaging your
            audience in ways you never thought possible. Here's how it can
            transform your blogging experience:
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8 lg:mt-[-322px]">
          <img
            src="/images/mamamia.jpg"
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="/images/mcommerce.jpg"
            alt="Mobile Commerce."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="/images/messaging.jpg"
            alt="Platform Messaging."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="/images/pileo2.png"
            alt="Mobile commerce."
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
      <div>
        <BloggerFAQ />
      </div>
    </div>
  );
}
