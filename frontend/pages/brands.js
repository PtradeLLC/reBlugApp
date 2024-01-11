import Link from 'next/link'


const features = [
  { name: 'Article Assistant', description: 'Article Assistant is a game-changer for brands looking to elevate their website`s user experience. This AI-powered tool enables brands to install and enable conversational chatbots seamlessly on their website`s blog pages. ' },
  { name: 'Email Conversational Tool', description: 'Create engaging email campaigns with interactive chatbots that allow users to provide feedback, answer surveys, and even make purchases directly through the email. This level of interactivity sets your brand apart and encourages user participation.' },
  { name: 'Bloggers Directory', description: ' Identify and collaborate with bloggers and writers whose audience aligns with your target demographic. Build strategic alliances to leverage their influence for product reviews, sponsored content, and brand endorsements.' },
  { name: 'Social blogging', description: 'Extend your brand`s reach through social blogging by tapping into the blogger`s existing audience as well as ones earned through "six degrees of separation". Benefit from the organic sharing of content and experiences, reaching a wider audience and driving traffic to your website.' },
]


export default function Brands() {

  return (
    <div className="bg-white">
      <div className="apply-margin mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div id="maap">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Unlocking Growth with AI-Powered SaaS Tools</h2>
          <h3 className="mt-4 text-gray-500">
            In the dynamic landscape of digital marketing, brands and companies are continually seeking innovative solutions to enhance their online presence, engage their audience, and drive growth. Our suite of SaaS marketing tools is designed to empower brands and startup companies, providing them with cutting-edge solutions that redefine the way they connect with their target audience.
          </h3>
          <p className="mt-4 text-gray-500">
            Let's delve into the key features of our offerings.
          </p>
          <dl className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
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
      <div className="mx-auto mt-4">
        <div className="mx-auto flex justify-center items-center">
          <div className="">
            <Link
              href="/register"
              className="p-4 w-60 inline-flex bg-red-500 h-9 items-center justify-center gap-x-3 rounded border border-transparent py-4 text-sm font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
