import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const Collaborate = ({ isOpen, onClose }) => {
  const chartRefs = useRef({});
  const modalRef = useRef(null);
  const [brandCollab, setBrandCollab] = useState({
    firstName: "",
    lastName: "",
    email: "",
    product: "",
    prodDesc: "",
    brandName: "",
    website: "",
    message: "",
  });

  const handleCollab = async (e) => {
    e.preventDefault();

    const baseUrl = "/api/blog/collaborate";

    console.log("BRANDCOLLAB", brandCollab);

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brandCollab),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setBrandCollab({
      firstName: "",
      lastName: "",
      email: "",
      product: "",
      prodDesc: "",
      brandName: "",
      website: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrandCollab((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getLastFiveMonths = () => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const now = new Date();
    const currentMonth = now.getMonth();
    const lastFiveMonths = [];

    for (let i = 4; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      lastFiveMonths.push(monthNames[monthIndex]);
    }

    return lastFiveMonths;
  };

  const getLastFiveMonthsData = (data) => {
    return data.slice(-5);
  };

  useEffect(() => {
    const initializeCharts = () => {
      const lastFiveMonths = getLastFiveMonths();

      const charts = [
        {
          id: "facebookChart",
          type: "bar",
          data: {
            labels: lastFiveMonths,
            datasets: [
              {
                label: "Facebook Reach",
                data: getLastFiveMonthsData([
                  1, 1, 3, 5, 2, 1, 2, 3, 4, 5, 6, 7,
                ]),
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          },
        },
        {
          id: "newsletterChart",
          type: "line",
          data: {
            labels: lastFiveMonths,
            datasets: [
              {
                label: "Newsletter Subscribers",
                data: getLastFiveMonthsData([
                  1, 2, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9,
                ]),
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                fill: true,
              },
            ],
          },
        },
        {
          id: "emailChart",
          type: "pie",
          data: {
            labels: ["Opened", "Clicked", "Unsubscribed"],
            datasets: [
              {
                label: "Email Campaign",
                data: [3, 1, 1],
                backgroundColor: [
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
        },
        {
          id: "twitterChart",
          type: "doughnut",
          data: {
            labels: ["Likes", "Retweets", "Replies"],
            datasets: [
              {
                label: "Twitter Engagement",
                data: [2, 3, 1],
                backgroundColor: [
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 205, 86, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
        },
        {
          id: "mediumChart",
          type: "radar",
          data: {
            labels: ["Read Time", "Shares", "Comments", "Views"],
            datasets: [
              {
                label: "Medium Post Performance",
                data: [1, 2, 2, 6],
                backgroundColor: "rgba(255, 159, 64, 0.2)",
                borderColor: "rgba(255, 159, 64, 1)",
                borderWidth: 1,
              },
            ],
          },
        },
        {
          id: "reBlugChart",
          type: "doughnut",
          data: {
            labels: ["ReBlug UpVotes", "Comments", "Shares"],
            datasets: [
              {
                label: "ReBlug Engagement",
                data: [400, 300, 200],
                backgroundColor: [
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 205, 86, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
        },
      ];

      Object.values(chartRefs.current).forEach((chart) => chart.destroy());

      charts.forEach((chart) => {
        const canvas = document.getElementById(chart.id);
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            chartRefs.current[chart.id] = new Chart(ctx, {
              type: chart.type,
              data: chart.data,
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        return `${context.dataset.label}: ${context.raw}`;
                      },
                    },
                  },
                },
              },
            });
          } else {
            console.error(`No 2D context found for canvas with id ${chart.id}`);
          }
        } else {
          console.error(`Canvas element with id ${chart.id} not found`);
        }
      });
    };

    if (isOpen) {
      initializeCharts();
    } else {
      Object.values(chartRefs.current).forEach((chart) => chart.destroy());
      chartRefs.current = {};
    }
  }, [isOpen]);

  return (
    <div>
      {isOpen && (
        <div
          id="twoSectionModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-2xl max-h-full bg-white rounded-lg shadow mt-40">
            <div className="p-4 bg-slate-50">
              <div className="flex items-start justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold">My Reach</h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  onClick={onClose}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button> */}
              </div>
              <div className="p-4">
                <div className="flex flex-wrap -mx-2">
                  <div className="w-full px-2 md:w-1/2">
                    <canvas id="facebookChart"></canvas>
                  </div>
                  <div className="w-full px-2 md:w-1/2">
                    <canvas id="newsletterChart"></canvas>
                  </div>
                  <div className="w-full px-2 md:w-1/2">
                    <canvas id="emailChart"></canvas>
                  </div>
                  <div className="w-full px-2 md:w-1/2">
                    <canvas id="twitterChart"></canvas>
                  </div>
                  <div className="w-full px-2 md:w-1/2">
                    <canvas id="mediumChart"></canvas>
                  </div>
                  <div className="w-full px-2 md:w-1/2">
                    <canvas id="reBlugChart"></canvas>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50">
              <div className="flex items-start justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold">Brand Collaboration</h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  onClick={onClose}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-4">
                <form className="space-y-4" onSubmit={handleCollab}>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={brandCollab.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={brandCollab.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={brandCollab.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="product"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Product
                    </label>
                    <input
                      type="text"
                      name="product"
                      id="product"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={brandCollab.product}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="prodDesc"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Product Description
                    </label>
                    <textarea
                      name="prodDesc"
                      id="prodDesc"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={brandCollab.prodDesc}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="brandName"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Brand Name
                    </label>
                    <input
                      type="text"
                      name="brandName"
                      id="brandName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={brandCollab.brandName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="website"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Website
                    </label>
                    <input
                      type="text"
                      name="website"
                      id="website"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={brandCollab.website}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={brandCollab.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collaborate;
