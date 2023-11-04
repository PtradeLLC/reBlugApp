import Image from "next/image";
import Link from "next/link";
import MobilePlatform from "./MobilePlatform";

export default function Influencer({ openModal, setOpenModal }) {
  return (
    <>
      <div className="overflow-hidden bg-white py-16 lg:w-[93%]">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8 lg:max-w-full ">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-full lg:flex-none lg:gap-y-8">
            <div className="lg:col-end-1  lg:w-full lg:max-w-lg lg:pb-8">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Influencers and Creators
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
                <li>Take complete control of your platform</li>
                <li>Monetize content on your own terms</li>
                <li>Represent brand partners through subtle advertisement</li>
                <li>Your content view and subscription is NEVER based on platform algorithm</li>
                <li>Never again beg for likes or subscriptions</li>
                <li>No app to download, just your regular text redesigned & configured as a platform </li>
                <li>We help you launch your own consumer brands or promote affiliate products from leading brands</li>
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

              {/* <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end h-full">
                <video autoPlay loop muted playsInline className="w-full h-full object-contain">
                  <source src="https://res.cloudinary.com/publictrades/video/upload/q_96,vc_auto/v1699085129/z82rryxouroqgfjajatm.mp4" type="video/mp4" />
                </video>
                <Image
                  src="/images/iphoneimage.png"
                  alt=""
                  width={385}
                  height={600}
                  className="aspect-[7/5] w-full max-w-none rounded-2xl bg-gray-50 object-contain h-full"
                />
              </div> */}
              <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:items-start lg:justify-end lg:gap-x-8">
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
                    className="aspect-[4/3] w-[7rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <MobilePlatform />
        </div> */}
        <div className="mt-2 flex justify-center text-center">
          <Link
            href="/creators"
            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
          >
            Try this tool<span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </>
  );
}
