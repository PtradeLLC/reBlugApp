"use client";
import WhyBrandENPN from "../../components/ENPNBrands";

const features = [
  {
    name: "Eat Now, Pay Never",
    description:
      "Modeled after the 'Buy Now, Pay Later' concept, 'Eat Now, Pay Never' is a marketing tool on reBlug that allows members to order food without paying anything out of pocket. Whether running an enterprise, a midsize company, or a startup, you can use this tool to increase sales, launch new product, promote existing product, raise product awareness, fundraising, and acquire new customers. By working with 'Foodhini', you can leverage the power and reach of our community to amplify your campaign like never before.",
  },
  {
    name: "Article Assistant",
    description:
      "Article Assistant is a game-changer for brands looking to elevate their websites user experience. This AI-powered tool enables brands to install and enable conversational ChatBots seamlessly on their websites blog pages, giving readers the full power to ask questions, get support, drive sales and subscriptions, seek insights, and attain complete understanding of the content. Grab and install the Article Assistant on your blog page today, and let it engage with your readers in real-time.",
  },
  {
    name: "Email Chatbot",
    description:
      "Create engaging email campaigns with AI-powered interactive Email ChatBots that allow recipients to provide feedback, answer surveys, and even make purchases directly through the email. This level of interactivity sets your brand apart and encourages user participation, engagement and retention.",
  },
  {
    name: "Concept of Foodhini",
    description:
      "'Foodhini Says' are tasks designed to help brands achieve their marketing goals by tasking members to complete specific actions brought forth by 'Foodhini'. In return for completing these tasks, we issue a virtual card, and fund it regularly as incentives to the members, but the ultimate goal is to accomplish marketing goals for our partners. This mutually beneficial arrangement allows brands to effectively reach their target audience while managing expenses strategically.",
  },
  {
    name: "Social blogging",
    description:
      "Extend your brand's reach through social blogging by tapping into blogger's power of reach. Through 'six degrees of separation', benefit from the organic sharing of content and experiences, reaching a wider audience and driving traffic on a long term basis to your website.",
  },
  {
    name: "Bloggers Network",
    description:
      "Identify and collaborate with bloggers and writers whose audience and niche aligns with your target demographic. Build strategic alliances to leverage their influence for product reviews, feedback, sponsored content, brand recognition and endorsements.",
  },
];

export default function Bloggers() {
  return (
    <div className="bg-white">
      <div className="apply-margin mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div id="maap">
          <h2 className="font-barlow-condensed text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Unlocking Growth with AI-Powered SaaS Tools{" "}
          </h2>
          <h3 className="mt-4 text-gray-500">
            In the dynamic landscape of digital marketing, brands and companies
            are continually seeking innovative solutions to enhance their online
            presence, engage their audience, and drive growth. Our suite of SaaS
            marketing tools is designed to empower brands and startup companies,
            providing them with cutting-edge solutions that redefine the way
            they connect with their target audience. Let's delve into the key
            features of our offerings.
          </h3>
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
            src="/images/pile2.png"
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
        <WhyBrandENPN />
      </div>
    </div>
  );
}
