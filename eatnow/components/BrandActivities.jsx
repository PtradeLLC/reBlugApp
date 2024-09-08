import { useState } from "react";

// Initial tabs data with default counts
const initialTabs = [
  { name: "Email Marketing", href: "#", count: 0, current: true },
  { name: "Social Marketing", href: "#", count: 0, current: false },
  { name: "Your Clients", href: "#", count: 0, current: false },
  { name: "Partners", href: "#", count: 0, current: false },
  { name: "Payments", href: "#", count: 0, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BrandActivity() {
  // State to manage the tabs dynamically
  const [tabs, setTabs] = useState(initialTabs);

  // Function to update the current tab
  const handleTabChange = (selectedTabName) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        current: tab.name === selectedTabName,
      }))
    );
  };

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to update the current tab */}
        <select
          id="tabs"
          name="tabs"
          defaultValue={tabs.find((tab) => tab.current).name}
          onChange={(e) => handleTabChange(e.target.value)}
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                aria-current={tab.current ? "page" : undefined}
                onClick={() => handleTabChange(tab.name)}
                className={classNames(
                  tab.current
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700",
                  "flex whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium"
                )}
              >
                {tab.name}
                {tab.count !== undefined ? (
                  <span
                    className={classNames(
                      tab.current
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-900",
                      "ml-3 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block"
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-4">
          {/* Display message for the current tab */}
          {tabs.map(
            (tab) =>
              tab.current && (
                <p className="" key={tab.name}>
                  You currently have {tab.count} campaign
                  {tab.count !== 1 ? "s" : ""}.
                </p>
              )
          )}
        </div>
      </div>
    </div>
  );
}
