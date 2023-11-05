import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="hero">
      <main>
        <div className="relative isolate">
          <div
            className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
            aria-hidden="true"
          >
            <div
              className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
              }}
            />
          </div>
          <div className="overflow-hidden items-baseline pb-6 mb-1 border-b border-slate-200">
            <div className="mx-auto max-w-7xl px-6 pb-6 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="w-full max-w-xl lg:shrink-1 xl:max-w-2xl sm:mt-[37px] md:mt-[37px] lg:mt-[-203px]">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 ">
                    Using software and technologies to streamline and automate marketing tasks, so
                    that brands can reach more customers and sell more products or services through
                    social media and AI.
                  </h1>
                  <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                    <span className="font-extrabold text-red-500">Just Launched!: </span>
                    Email Conversational Tool, an AI powered marketing tool that
                    enhances communication between brand Marketers, Sales
                    professionals and their clients/customers by injecting
                    'conversational AI chatbot' into the body of an email
                    and/or newsletter.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6 width-[250px]">
                    <Link
                      href="/tools"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      How it works <span aria-hidden="true">→</span>
                    </Link>
                    <Link
                      href="/tools"
                      className="flex justify-center items-center rounded-md bg-red-600 px-3.5 text-center w-[200px] h-[52px] py-2.5 sm:text-sm items-center font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                      Conversational Tool
                    </Link>
                  </div>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <Image
                        src="/images/camgirl.png"
                        alt=""
                        width={100}
                        height={24}
                        priority
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <Image
                        src="/images/workout.png"
                        alt="ecommerce-image"
                        width={100}
                        height={24}
                        priority
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <Image
                        src="/images/prodone.png"
                        alt="influencer-image"
                        width={100}
                        height={24}
                        priority
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <Image
                        src="/images/prodtwo.png"
                        alt="social-media"
                        width={100}
                        height={24}
                        priority
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <Image
                        src="/images/mamba.png"
                        alt="influencer"
                        width={100}
                        height={24}
                        priority
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
