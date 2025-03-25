const posts = [
  {
    name: "What is SaaS? Software as a Service Explained",
    desc: "Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other people.",
    img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    orderNow: "Order now",
    location: "1 Mile",
    type: "Restaurant",
  },
  {
    name: "A Quick Guide to WordPress Hosting",
    desc: "According to him, â€œI'm still surprised that this has happened. But we are surprised because we are so surprised.â€More revelations.",
    img: "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    orderNow: "Order now",
    location: "4 Miles",
    type: "Chef",
  },
  {
    name: "7 Promising VS Code Extensions Introduced in 2022",
    desc: "I hope I remembered all the stuff that they needed to know. They're like, 'okay,' and write it in their little reading notebooks.",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    orderNow: "Order now",
    location: "3.7 Miles",
    type: "Food Truck",
  },
  {
    name: "How to Use Root C++ Interpreter Shell to Write C++ Programs",
    desc: "The powerful gravity waves resulting from the impact of the planets' moons â€” four in total â€” were finally resolved in 2015 when gravitational.",
    img: "https://images.unsplash.com/photo-1617529497471-9218633199c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    orderNow: "Order now",
    location: "5 Miles",
    type: "Chef",
  },
  {
    name: "7 Promising VS Code Extensions Introduced in 2022",
    desc: "I hope I remembered all the stuff that they needed to know. They're like, 'okay,' and write it in their little reading notebooks.",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    orderNow: "Order now",
    location: "1 Mile",
    type: "Restaurant",
  },
  {
    name: "How to Use Root C++ Interpreter Shell to Write C++ Programs",
    desc: "The powerful gravity waves resulting from the impact of the planets' moons â€” four in total â€” were finally resolved in 2015 when gravitational.",
    img: "https://images.unsplash.com/photo-1617529497471-9218633199c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    orderNow: "Order now",
    location: "3 Miles",
    type: "Food Truck",
  },
];

const Restaurants = () => {
  return (
    <section className="py-2 mt-4">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl font-normal text-slate-700 mb-2">
          Newly Added
        </h2>
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((items, key) => (
            <li
              className="w-full mx-auto group sm:max-w-sm p-2 rounded-sm shadow-md bg-zinc-50 "
              key={key}
            >
              <a location={items.location}>
                <img
                  src={items.img}
                  loading="lazy"
                  alt={items.name}
                  className="w-full rounded-lg"
                />
                <div className="mt-3 space-y-2 border-t-small pt-3">
                  <h3 className="text-lg text-black duration-150 group-hover:text-gray-500 font-medium line-clamp-1">
                    {items.name}
                  </h3>
                  <p className="text-gray-900 text-sm duration-150 group-hover:text-gray-500 font-medium line-clamp-3">
                    {items.desc}
                  </p>
                  <span className="text-gray-900 text-sm duration-150 group-hover:text-gray-500 font-medium grid grid-cols-3 justify-between items-center">
                    <p className="flex w-27 h-7 font-normal">
                      {items.location}
                    </p>
                    <span className="text-gray-900 flex w-27 h-7 font-normal">
                      <img
                        className="w-4 h-4"
                        src="https://img.icons8.com/ios/16/undefined/restaurant.png"
                      />{" "}
                      {items.type}
                    </span>
                    <button className="flex py-1 text-xs justify-between items-center w-27 h-7 m-auto text-center hover:text-gray-700 px-4 text-slate-900 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex">
                      <img
                        src="https://img.icons8.com/ios/16/undefined/shopping-cart--v1.png"
                        className="w-4 h-4 mr-[3px]"
                        alt="cart"
                      />
                      {items.orderNow}
                    </button>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Restaurants;
