import Link from "next/link";

const FoodiesComponent = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="hidden lg:absolute lg:inset-0 lg:block"
      >
        <svg
          fill="none"
          width={640}
          height={784}
          viewBox="0 0 640 784"
          className="absolute left-1/2 top-0 -translate-y-8 translate-x-64 transform"
        >
          <defs>
            <pattern
              x={118}
              y={0}
              id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                fill="currentColor"
                width={4}
                height={4}
                className="text-gray-200"
              />
            </pattern>
          </defs>
          <rect
            y={72}
            fill="currentColor"
            width={640}
            height={640}
            className="text-gray-50"
          />
          <rect
            x={118}
            fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
            width={404}
            height={784}
          />
        </svg>
      </div>

      <div className="relative pb-16 pt-6 sm:pb-24 lg:pb-32">
        <main className="mx-auto mt-16 max-w-7xl px-4 px-6 sm:mt-24 lg:mt-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
              <h1>
                <span className="block text-base font-semibold text-gray-500 sm:text-lg lg:text-base xl:text-lg">
                  Introducing
                </span>
                <span className="mt-1 block text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                  <span className="block text-gray-900">The concept of</span>
                  <span className="block text-red-600">Foodhini</span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Foodhini is the link that connects brands with bloggers,
                bloggers with chefs, chefs with foodies. Learn how Foodhini can
                help you win as a brand, blogger or if you provide services in
                the food & beverage industry.
              </p>
              <div className="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
                <Link
                  href="/foodhini"
                  className="mt-3 w-full rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:inline-flex sm:w-auto sm:flex-shrink-0 sm:items-center"
                >
                  Learn more
                </Link>
              </div>
            </div>
            <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
              <svg
                fill="none"
                width={640}
                height={784}
                viewBox="0 0 640 784"
                aria-hidden="true"
                className="absolute left-1/2 top-0 origin-top -translate-x-1/2 -translate-y-8 scale-75 transform sm:scale-100 lg:hidden"
              >
                <defs>
                  <pattern
                    x={118}
                    y={0}
                    id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      fill="currentColor"
                      width={4}
                      height={4}
                      className="text-gray-200"
                    />
                  </pattern>
                </defs>
                <rect
                  y={72}
                  fill="currentColor"
                  width={640}
                  height={640}
                  className="text-gray-50"
                />
                <rect
                  x={118}
                  fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
                  width={404}
                  height={784}
                />
              </svg>
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <button
                  type="button"
                  className="relative block w-full overflow-hidden rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <img
                    alt=""
                    src="/images/foodini/foodini_2.jpeg"
                    className="w-full"
                  />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FoodiesComponent;
