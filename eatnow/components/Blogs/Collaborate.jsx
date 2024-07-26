import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Collaborate = ({ isOpen, onClose }) => {
  const chartRefs = useRef({});
  const modalRef = useRef(null);

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
                ]), // Adjust this data accordingly
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
                ]), // Adjust this data accordingly
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
            labels: ["UpVotes", "Comments", "Shares"],
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

      // Destroy any existing charts before creating new ones
      Object.values(chartRefs.current).forEach((chart) => chart.destroy());

      charts.forEach((chart) => {
        const canvas = document.getElementById(chart.id);
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            // Store the new chart instance in the ref
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
      // Optional: Cleanup charts when the modal is closed
      Object.values(chartRefs.current).forEach((chart) => chart.destroy());
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
            {/* Modal content */}
            <div className="p-4 bg-slate-50">
              {/* Modal header */}
              <div className="flex items-start justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold">My Reach</h3>
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
              {/* Modal body */}
              <div className="p-4 space-y-6">
                {/* Section 1: Charts */}
                <div className="mb-14">
                  <h4 className="text-lg font-medium">Total Reach</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="p-4 bg-white rounded-lg shadow">
                      <h5 className="text-base font-medium mb-2">Facebook</h5>
                      <canvas id="facebookChart"></canvas>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow">
                      <h5 className="text-base font-medium mb-2">Newsletter</h5>
                      <canvas id="newsletterChart"></canvas>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow">
                      <h5 className="text-base font-medium mb-2">
                        Email Campaign
                      </h5>
                      <canvas id="emailChart"></canvas>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow">
                      <h5 className="text-base font-medium mb-2">Twitter</h5>
                      <canvas id="twitterChart"></canvas>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow">
                      <h5 className="text-base font-medium mb-2">Medium</h5>
                      <canvas id="mediumChart"></canvas>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow">
                      <h5 className="text-base font-medium mb-2">ReBlug</h5>
                      <canvas id="reBlugChart"></canvas>
                    </div>
                  </div>
                </div>
              </div>
              {/* Section 2: Form */}
              <div className="collabo">
                <h4 className="text-lg font-medium">Let's Collaborate</h4>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="brandName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Brand Name
                    </label>
                    <input
                      type="text"
                      id="brandName"
                      name="brandName"
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="productName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="productName"
                      name="productName"
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                      defaultValue={""}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                      defaultValue={""}
                    />
                  </div>
                </form>
              </div>
              {/* Modal footer */}
              <div className="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b">
                <button
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={onClose}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collaborate;
