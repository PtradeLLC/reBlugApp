const stats = [
  { id: 1, name: "App Store", image: "/images/foodini/appleimg.webp" },
  { id: 2, name: "Google Play", image: "/images/foodini/gplay.png" },
  { id: 3, name: "Microsoft Store", image: "/images/foodini/micsoft.png" },
];

export default function AppStore() {
  return (
    <div className="bg-[#e8eef1] mt-5 py-24 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by bloggers & Writers.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Together, let's make AI efficient, creative, and useful for
              marketing, storytelling, and journalism.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden justify-center items-center rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col mx-auto p-8 bg-gray-700/5 w-full lg:bg-none"
              >
                <img
                  src={stat.image}
                  className="w-[48%] rounded-md m-auto order-first text-3xl font-semibold tracking-tight text-gray-900"
                />
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
