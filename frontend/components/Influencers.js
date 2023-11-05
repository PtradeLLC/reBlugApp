import Image from "next/image";
import Link from "next/link";
import MobilePlatform from "./MobilePlatform";

export default function Influencer({ openModal, setOpenModal }) {
  return (
    <>
      <div className="overflow-hidden flex justify-center items-center flex-col bg-white py-2 lg:w-[93%]">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-4 lg:max-w-full ">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-full lg:flex-none lg:gap-y-8">
            <div className="lg:col-end-1  lg:w-full lg:max-w-lg lg:pb-8">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Dear Creators & Influencers,
              </h2>
              <p className="mt-6 text-xl leading-8 text-gray-600"></p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Ever wondered creating and delivering contents to your
                followers, growing & monetizing contents, but not on any social
                media platform?
                <br /> Escape the constraints of platform algorithms and connect
                with your audience on a local level through text messaging.
                Manage audience growth, content monetization while maintaining
                fruitful relationships with audience and brand sponsors.
              </p>
              <p className="mt-3 leading-7 text-xl font-bold">
                Messaging as a Platform
              </p>
              <ul className="mt-3 text-base leading-7 text-gray-600 list-disc ml-3">
                <li>Take complete control of your platform.</li>
                <li>Monetize content on your own terms.</li>
                <li>Represent brand partners through subtle promotions.</li>
                <li>Your content view and subscription is NEVER based on platform algorithm.</li>
                <li>Never again beg for likes or subscriptions.</li>
                <li>Train and activate your personal AI assistant.</li>
                <li>No app to download, just your regular text redesigned & configured as a platform.</li>
                <li>We help you launch your own consumer brand products or promote affiliate products from leading brands.</li><br />
                <span className="list-none"><li>We hope you see the value in this amazing Tool, and thanks for scrolling to this section.</li></span>
                <span className="list-none"><li>Sincerely, <br /> ForgedMart Team</li></span>
              </ul>
            </div>
            <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
              <div className="relative w-[385px] h-[600px] object-contain">
                <video autoPlay loop muted className="w-[385px] h-[570px] max-w-full object-contain">
                  <source src="/images/mobileassaplatform.mp4" type="video/mp4" />
                </video>

                <Image
                  src="/images/iphoneimage.png"
                  alt=""
                  width={385}
                  height={600}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 flex justify-center text-center w-full">
          <Link
            href="/creators"
            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
          >
            Find out more<span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </>
  );
}
