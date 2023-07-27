import { useState } from "react";

export default function Creators() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <main>
        <div className="mx-auto mt-32 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-white/5  px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Why Messaging as a Platform?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-900">
              Messaging has evolved far beyond simple text conversations; it has
              become a powerful tool for content creators to connect with their
              followers in a more personalized and interactive way.
            </p>
            <div className="mx-auto mt-20 grid max-w-lg grid-cols-3 justify-center items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 sm:gap-y-14 lg:max-w-4xl lg:grid-cols-3">
              <img
                className="col-span-2 max-h-16 w-full object-contain lg:col-span-1"
                src="/images/bgone.png"
                alt="Transistor"
                width={158}
                height={48}
              />

              <img
                className="col-span-2 max-h-16 w-full object-contain lg:col-span-1"
                src="/images/bgtwo.png"
                alt="Tuple"
                width={158}
                height={48}
              />

              <img
                className="col-span-2 col-start-2 max-h-16 w-full object-contain sm:col-start-auto lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg"
                alt="Statamic"
                width={158}
                height={48}
              />
            </div>
            <div
              className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl"
              aria-hidden="true"
            >
              <div
                className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
                style={{
                  clipPath:
                    "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-32 overflow-hidden sm:mt-40">
          <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
              <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  What's in for you
                </h2>
                <p className="mt-2 text-xl leading-8 text-gray-600">
                  With Messaging as a Platform (MaaP), you can transform your
                  social media presence into a personalized, immersive
                  experience that keeps your audience engaged on a deeper level.
                </p>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  Since everything is done via text messaging, you can engage
                  with all of your audience in real-time through interactive and
                  conversational messaging.
                </p>
              </div>
              <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                  <img
                    src="/images/pileo2.png"
                    alt=""
                    className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 sm:mt-20 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How it works
            </h2>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Designed to be intuitive and user-friendly, manage your messaging
              platform efficiently with more time to focus on creating
              exceptional content.
            </p>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
            <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-50 p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start">
              <p className="flex-none text-3xl font-bold tracking-tight text-gray-900">
                SMS
              </p>
              <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p className="text-lg font-semibold tracking-tight text-gray-900">
                  Get a personal SMS number
                </p>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  Sign up for a ForgedMart account, and get your free SMS
                  number.
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-200 p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-14">
              <p className="flex-none text-3xl font-bold tracking-tight text-black">
                Invite everyone.
              </p>
              <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p className="text-lg font-semibold tracking-tight text-black">
                  Your free SMS number is one you can publicly share on social
                  media with your audience.
                </p>
                <p className="mt-2 text-base leading-7 text-gray-700">
                  Using this number followers can connect by sending you and
                  each other messages via text, share media assets, and if you
                  don't want to receive messages at any point in time - put it
                  on silent, your personalized chatbot would take over on your
                  behalf.
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-300 p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-10">
              <p className="flex-none text-3xl font-bold tracking-tight text-black">
                Create on your term
              </p>
              <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p className="text-lg font-semibold tracking-tight text-black">
                  Audience as a Group
                </p>
                <div className="mt-2 text-base leading-7 text-gray-900">
                  Your audience joins as a group, and you can use all the
                  features your phone allows:
                  <ul className="bg-slate-500 p-4 text-white rounded-md">
                    <li>Go live with FaceTime</li>
                    <li>Share videos</li>
                    <li>Share images</li>
                  </ul>
                  Plus a few more:
                  <ul className="bg-slate-500 p-4 text-white rounded-md">
                    <li>Commerce features</li>
                    <li>Represent Brands</li>
                    <li>Accept donations for content well done</li>
                    <li>Affiliates partnership</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
