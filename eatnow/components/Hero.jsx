import { useState } from "react";
import Image from "next/image";

export default () => {
  const [state, setState] = useState(false);

  return (
    <>
      <section className="py-10">
        <div className="max-w-screen-xl mx-auto text-slate-900 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
          <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
            <h1 className="text-sm text-slate-900 font-medium">
              Serving a growing community of restaurants & foodies.
            </h1>
            <h2 className="text-3xl text-slate-900 font-extrabold md:text-5xl">
              Eat Now, Pay <span className="text-rose-800">Never.</span>
            </h2>
            <p className="text-xl font-medium text-slate-900">
              Food is essential for life, but it can be expensive even when we
              can afford it. Now, imagine enjoying delicious, freshly prepared
              meals from your favorite local restaurants or private chefs at no
              cost to you. Yes, completely free!
              <br />
              We even pick up&nbsp;
              <span className="">delivery fee.</span>
              <br />
              <br />
              Now, that is truly priceless. Feeling a little hungry?
            </p>
            <div className="gap-x-1 space-y-3 sm:space-y-0 sm:flex-col md:space-x-1">
              <a
                href="#foodini"
                className="flex py-2 text-medium w-62 h-10 m-auto text-center hover:text-gray-300 px-4 text-slate-900 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex"
              >
                Let's eat
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="flex justify-center items-center w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex-none mt-14 md:mt-0 md:max-w-xl">
            <Image
              src="/images/mamamia.jpg"
              className=" md:rounded-tl-[108px]"
              alt="hero-image"
              width="1080"
              height="900"
            />
          </div>
        </div>
        <div className="mt-14 px-4 md:px-8">
          <p className="text-center text-sm text-slate-900 font-thin">
            Ordering from the best restaurants
          </p>
          <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-6 mt-6">
            <Image
              src="/images/halalguys.webp"
              alt="halal_guys"
              width="40"
              height="20"
            />
            <Image
              src="/images/kfc.png"
              alt="kfc"
              width="40"
              height="20"
              className="rounded"
            />
            <Image
              src="/images/mcdee.jpeg"
              alt="mcdonalds"
              width="40"
              height="20"
              className="rounded"
            />
            <Image
              src="/images/chick.jpeg"
              alt="chicfil-a"
              width="40"
              height="20"
              className="rounded"
            />
          </div>
        </div>
        <hr className="border border-gray-300 mt-9 mx-auto w-1/4" />
      </section>
    </>
  );
};
