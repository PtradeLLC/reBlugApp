import Link from "next/link";

const RightSide = () => {
  return (
    <section className="max-w-[500px] h-[500px] bg-red-500 rounded-full p-2 mt-4 mx-auto px-4 md:px-8">
      <div className="space-y-3 text-center p-9">
        <img
          className="flex w-16 mx-auto"
          src={`/images/staticmetrics.png`}
          alt="blog-metrics"
        />
        <h3 className="font-barlow-condensed text-3xl text-white font-bold">
          77% of internet users report reading blog posts on a regular basis
        </h3>
      </div>
      <div className="mx-2 px-3 text-white flex flex-col justify-center items-center">
        <span className="mt-[-24px]">
          <h4 className="my-3 font-semibold">Is yours one of them?</h4>
          <button className="mt-3 px-5 mb-2 py-3 rounded-md text-white w-48 bg-gray-700 hover:bg-gray-500 active:bg-gray-700 duration-150 outline-none shadow-md focus:shadow-none focus:ring-2 ring-offset-2 ring-red-600 sm:mt-0 sm:ml-3 lg:w-auto">
            Run a Quick Check
          </button>
          <a
            href="#blog-tool"
            className="block py-2 px-4 text-center text-white font-medium bg-red-600 duration-150 hover:bg-red-700 active:bg-red-700 rounded-lg shadow-lg hover:shadow-none"
          >
            Are you a Blogger?
          </a>
        </span>
      </div>
    </section>
  );
};

export default RightSide;
