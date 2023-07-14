import { useState } from "react";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import Link from "next/link";

const invoice = {
  subTotal: "$8,800.00",
  tax: "$1,760.00",
  total: "$10,560.00",
  items: [
    {
      id: 1,
      title: "Finding and analyzing Trends",
      description: "description of an initial marketing plan.",
    },
  ],
};
const activity = [
  {
    id: 1,
    product: {
      name: "Retail store Partnership - ",
      desc: "Connect with local retail store partners interested in carrying your products. Our growing partner network consists of local retail stores nationwide. Boost your brand with increased in-store sales and capital for growth. Find out how",
      url: "",
    },
  },
  {
    id: 2,
    product: {
      name: "For Traditional Brands - ",
      desc: "Non-eCommerce brands can also take full advantage of our tools to gain insight, increase brand awareness, find product-market fit, and overall market trends. Give us a try today.",
      url: "",
    },
  },
];
const moods = [
  {
    name: "Excited",
    value: "excited",
    // icon: FireIcon,
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
  {
    name: "Loved",
    value: "loved",
    // icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-pink-400",
  },
  {
    name: "Happy",
    value: "happy",
    // icon: FaceSmileIcon,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "sad",
    // icon: FaceFrownIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Thumbsy",
    value: "thumbsy",
    // icon: HandThumbUpIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    name: "I feel nothing",
    value: null,
    // icon: XMarkIconMini,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join();
}

export default function Trial() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selected, setSelected] = useState(moods[5]);
  const [typed, setTyped] = useState(
    "Lawyers for disgraced Theranos founder Elizabeth Holmes objected to a restitution payment plan. Along with Ramesh Sunny Balwani, Holmes was ordered to pay $452,047,268 in restitution. Prosecutors want her to pay it back monthly post-release. Her lawyers said that won't be possible. won't be able to afford $250 a month restitution payments when she's released from  her attorneys argued. The disgraced Theranos founder was  of four fraud-related counts and was sentenced to a little more than 11 years in prison. Both she and her former boyfriend and business partner Ramesh Sunny Balwani were ordered to pay a collective $452 million in restitution. It's common for funds like these to never fully be paid out, But courts look for ways to collect some of the money, even if it comes in the form of assets. Assets that the government froze at the onset of a prosecution might be available for restitution, said Daniel Richman, a professor at Columbia Law School, and a former federal prosecutor in Manhattan. But generally, most restitution is never paid. This week, prosecutors proposed that Holmes pay it month-by-month upon her release, in $250 increments Prosecutors told a judge this week that the payment plan wasn't originally determined due to a clerical error, per Bloomberg. But Holmes' attorneys disagreed that the judge made a mistake, and said there's substantial evidence showing Ms. Holmes' limited financial resources and has appropriately treated Ms. Holmes and Mr. Balwani differently in sentencing, per Bloomberg. In a New York Timeast month, Holmes said she can't even pay her legal bills, adding, I have to work for the rest of my life to try to pay for it. An attorney for Holmes did not respond to Insider's request for comment. According to the original , Holmes and Balwani will have to pay $40 million to Walgreens, and $14.5 million to Safeway. They also owe $125 million in restitution to Rupert Murdoch, a Theranos investor. Read the original article on "
  );

  const [useCase, setUseCase] = useState("");
  const [formData, setFormData] = useState({
    product: "",
    useCaseTwo: "",
    useCase: "",
  });
  const [formInput, setFormInput] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = "/api/trendsResult";
      const postedDocs = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(postedDocs);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main>
        <div className="mx-auto mt-4 max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Brand Tools */}
            <div className="lg:col-start-3 lg:row-end-1">
              <h2 className="sr-only">Brand Tools</h2>
              <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                <dl className="flex flex-wrap">
                  <div className="flex-auto pl-6 pt-6">
                    <dt className="text-sm font-semibold leading-6 text-gray-900">
                      Visualizations
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-900">
                      Status: Processing
                    </dd>
                  </div>
                  <div className="flex-none self-end px-6 pt-4">
                    <dt className="sr-only">Visualizations</dt>
                    <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                      Download PDF
                    </dd>
                  </div>
                  <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                    <Image
                      src="/images/chart.png"
                      alt="chart-image"
                      width={400}
                      height={400}
                      className="aspect-[4/3] w-[100%] max-w-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Data Visualization</span>
                      <div
                        className="h-6 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd className="text-sm leading-6 text-gray-500">
                      <p>Evaluations</p>
                    </dd>
                  </div>
                </dl>
                <div className="mt-6 border-t border-gray-900/5 px-6 py-6"></div>
              </div>
            </div>

            {/* Tools */}
            <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
              <h2 className="font-semibold leading-6 text-2xl text-gray-900">
                Brand Tools
              </h2>
              <div className="mt-4 mb-4">
                <form onSubmit={handleSubmit}>
                  <label htmlFor="product" placeholder="Enter your product">
                    Product | Brand:
                  </label>
                  <input
                    id="product"
                    name="product"
                    type="text"
                    onChange={handleChange}
                    autoComplete="product"
                    value={formData.product}
                    required
                    className="min-w-0 ml-3 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="Enter Product or Brand"
                  />

                  <fieldset className="mt-6 mb-3">
                    <legend className="block text-sm font-medium leading-6 text-gray-900">
                      Select your use case:
                    </legend>
                    <div className="mt-2 rounded-md shadow-sm">
                      <div>
                        <label htmlFor="useCaseTwo" className="sr-only">
                          Select your use case
                        </label>
                        <select
                          id="useCaseTwo"
                          name="useCaseTwo"
                          value={formData.useCaseTwo}
                          onChange={handleChange}
                          autoComplete="useCaseTwo"
                          className="relative block px-2 bg-white w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option>Click to select</option>
                          <option>Want to launch a new product</option>
                          <option>Want to grow market share</option>
                          <option>Want to enter a new market</option>
                          <option>Want to drive sales</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="useCase" className="sr-only">
                          Enter your use case
                        </label>
                        <input
                          type="text"
                          name="useCase"
                          id="useCase"
                          value={formData.useCase}
                          onChange={handleChange}
                          autoComplete="useCase"
                          className="relative block w-full rounded-none rounded-b-md border-0 bg-transparent px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                          placeholder="Enter use case if not listed above or additional info"
                        />
                      </div>
                    </div>
                  </fieldset>
                  <button
                    type="submit"
                    className="flex-none mx-2 rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Get Started
                  </button>
                </form>
              </div>

              <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                  <dt className="font-semibold text-gray-900">
                    Analyzing buying Trends
                  </dt>
                  <dd className="mt-2 text-gray-500">
                    <span className="font-medium text-gray-500">
                      On standby
                    </span>
                  </dd>
                </div>
                <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                  <dt className="font-semibold text-gray-900">
                    Developing Marketing Plan
                  </dt>
                  <dd className="mt-2 text-gray-500">
                    <span className="font-medium text-gray-500">
                      On standby
                    </span>
                  </dd>
                </div>
                <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                  <dt className="font-semibold text-gray-900">
                    Crafting marketing materials
                  </dt>
                  <dd className="mt-2 text-gray-500">
                    <span className="font-medium text-gray-500">
                      On standby
                    </span>
                  </dd>
                </div>
              </dl>
              <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
                <colgroup>
                  <col className="w-full" />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead className="border-b border-gray-200 text-gray-900">
                  <tr>
                    <th scope="col" className="px-0 py-3 font-semibold">
                      Proposal
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {invoice.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="px-0 py-5 align-top">
                        <div className="truncate font-medium text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-gray-900 h-fit whitespace-pre-wrap overflow-auto">
                          <Typewriter
                            onInit={(typewriter) => {
                              typewriter
                                .typeString(`${typed}`)
                                .callFunction((state) => {
                                  state.elements.cursor.style.display = "none";
                                })
                                .start();
                            }}
                            options={{
                              delay: 2, //Controls the speed
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:col-start-3">
              {/* Activity feed */}
              <h2 className="text-sm font-semibold leading-6 text-gray-900">
                Other products and services:
              </h2>
              <ul role="list" className="mt-6 space-y-6">
                {activity.map((activityItem, activityItemIdx) => (
                  <li key={activityItem.id} className="relative flex gap-x-4">
                    <div
                      className={classNames(
                        activityItemIdx === activity.length - 1
                          ? "h-6"
                          : "-bottom-6",
                        "absolute left-0 top-0 flex w-6 justify-center"
                      )}
                    >
                      <div className="w-px bg-gray-200" />
                    </div>
                    {
                      <>
                        <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                          {activityItem.type === "paid" ? (
                            <div
                              className="h-6 w-6 text-red-600"
                              aria-hidden="true"
                            />
                          ) : (
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                          )}
                        </div>
                        <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                          <span className="font-medium text-gray-900">
                            <Link href={"#"}>{activityItem.product.name}</Link>
                          </span>{" "}
                          <Link href={"#"}>{activityItem.product.desc}</Link>
                        </p>
                      </>
                    }
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
