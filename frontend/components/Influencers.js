import Image from "next/image";
import MobilePlatform from "./MobilePlatform";

export default function Influencer() {
  return (
    <>
      <div className="overflow-hidden bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
            <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Influencers and Creators
              </h2>
              <p className="mt-6 text-xl leading-8 text-gray-600">
                Tired of spending countless hours creating and scheduling
                content for your social media accounts?
              </p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Look no further than our AI-powered tool to automate content
                creation and posting on social media. With our tool, you can
                easily generate high-quality content that&apos;s tailored to
                your audience, and schedule it to be posted at the optimal times
                for maximum engagement. You can train it to create and post
                content exactly how you would say it to your audience based on
                your previous posts, schedule it, and take a break. Try our tool
                today and experience the power of AI automation for yourself on
                social media.
              </p>
              <p className="mt-6 leading-7 text-xl font-bold">
                Problems this tool is addressing
              </p>
              <ul className="mt-6 text-base leading-7 text-gray-600 list-disc ml-3">
                <li>The pressure of keeping an image</li>
                <li>Online hate and abuse</li>
                <li>Burnout</li>
              </ul>
            </div>
            <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
              <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                <Image
                  src="/images/grl-eating.jpeg"
                  alt=""
                  width={400}
                  height={400}
                  className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                />
              </div>
              <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                  <Image
                    src="/images/guy.png"
                    alt=""
                    width={400}
                    height={400}
                    className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                  <Image
                    src="/images/fashion.png"
                    alt=""
                    width={400}
                    height={400}
                    className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                  <Image
                    src="/images/vidgirl.png"
                    alt=""
                    width={400}
                    height={400}
                    className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <MobilePlatform />
        </div>
        <div className="mt-2 flex justify-center text-center">
          <a
            href="#"
            className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Try this tool<span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </>
  );
}
