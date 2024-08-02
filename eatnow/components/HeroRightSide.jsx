import Link from "next/link";

const RightSide = () => {
  return (
    <section className="max-w-[450px] h-[450px] bg-red-500 rounded-full p-2 mt-4 mx-auto px-4 md:px-8">
      <div className="space-y-3 text-center p-9">
        <svg
          className="flex w-32 mx-auto text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
          />
        </svg>

        {/* <img
          className="flex w-16 mx-auto"
          src={`/images/staticmetrics.png`}
          alt="blog-metrics"
        /> */}
        <h3 className="font-barlow-condensed text-3xl text-white font-bold">
          77% of internet users report reading blog posts on a regular basis
        </h3>
      </div>
      <div className="mx-2 px-3 text-white flex flex-col justify-center items-center">
        <span className="mt-[-37px]">
          <h4 className="my-3 font-semibold">Is yours one of them?</h4>
          <a
            href="#blog-tool"
            className="block mt-5 px-5 mb-2 py-3 rounded-md text-white w-48 bg-black hover:bg-gray-500 active:bg-gray-700 duration-150 outline-none shadow-md focus:shadow-none focus:ring-2 ring-offset-2 ring-red-600 sm:ml-3 lg:w-auto"
          >
            Learn More
          </a>
        </span>
      </div>
    </section>
  );
};

export default RightSide;
