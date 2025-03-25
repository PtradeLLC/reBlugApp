import { useState } from "react";
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import BrandsActivity from "./RecentActivities/BrandsActivity";

const SummaryComponentBox = () => {
  const [showSummary, setShowSummary] = useState(null);

  const days = [
    {
      date: "Today",
      dateTime: "2023-03-22",
      transactions: [
        {
          id: 1,
          invoiceNumber: "00012",
          href: "#",
          amount: "$7,600.00 USD",
          tax: "$500.00",
          status: "Paid",
          client: "Reform",
          description: "Website redesign",
          icon: ArrowUpCircleIcon,
        },
        {
          id: 2,
          invoiceNumber: "00011",
          href: "#",
          amount: "$10,000.00 USD",
          status: "Withdraw",
          client: "Tom Cook",
          description: "Salary",
          icon: ArrowDownCircleIcon,
        },
        {
          id: 3,
          invoiceNumber: "00009",
          href: "#",
          amount: "$2,000.00 USD",
          tax: "$130.00",
          status: "Overdue",
          client: "Tuple",
          description: "Logo design",
          icon: ArrowPathIcon,
        },
      ],
    },
    {
      date: "Yesterday",
      dateTime: "2023-03-21",
      transactions: [
        {
          id: 4,
          invoiceNumber: "00010",
          href: "#",
          amount: "$14,000.00 USD",
          tax: "$900.00",
          status: "Paid",
          client: "SavvyCal",
          description: "Website redesign",
          icon: ArrowUpCircleIcon,
        },
      ],
    },
  ];
  const clients = [
    {
      id: 1,
      name: "Tuple",
      imageUrl: "https://tailwindui.com/img/logos/48x48/tuple.svg",
      lastInvoice: {
        date: "December 13, 2022",
        dateTime: "2022-12-13",
        amount: "$2,000.00",
        status: "Overdue",
      },
    },
    {
      id: 2,
      name: "SavvyCal",
      imageUrl: "https://tailwindui.com/img/logos/48x48/savvycal.svg",
      lastInvoice: {
        date: "January 22, 2023",
        dateTime: "2023-01-22",
        amount: "$14,000.00",
        status: "Paid",
      },
    },
    {
      id: 3,
      name: "Reform",
      imageUrl: "https://tailwindui.com/img/logos/48x48/reform.svg",
      lastInvoice: {
        date: "January 23, 2023",
        dateTime: "2023-01-23",
        amount: "$7,600.00",
        status: "Paid",
      },
    },
  ];

  const navigation = [
    { name: "Home", href: "#" },
    { name: "Invoices", href: "#" },
    { name: "Clients", href: "#" },
    { name: "Expenses", href: "#" },
  ];
  const secondaryNavigation = [
    { name: "Last 7 days", href: "#", current: true },
    { name: "Last 30 days", href: "#", current: false },
    { name: "All-time", href: "#", current: false },
  ];
  const stats = [
    {
      name: "Revenue",
      value: "$405,091.00",
      change: "+4.75%",
      changeType: "positive",
    },
    {
      name: "Overdue invoices",
      value: "$12,787.00",
      change: "+54.02%",
      changeType: "negative",
    },
    {
      name: "Outstanding invoices",
      value: "$245,988.00",
      change: "-1.39%",
      changeType: "positive",
    },
    {
      name: "Expenses",
      value: "$30,156.00",
      change: "+10.18%",
      changeType: "negative",
    },
  ];
  const statuses = {
    Paid: "text-green-700 bg-green-50 ring-green-600/20",
    Withdraw: "text-gray-600 bg-gray-50 ring-gray-500/10",
    Overdue: "text-red-700 bg-red-50 ring-red-600/10",
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      {showSummary ? (
        <>
          <BrandsActivity />
          <div className="grid grid-cols-2 gap-4 justify-center items-center">
            <div className="">
              <div className="w-full mb-3 h-[200px] shadow-xl">{"dkd"}</div>
              <div className="w-full h-[200px] shadow-xl">{"jd"}</div>
            </div>
            <div className="">
              <div className="w-full mb-3 h-[200px] shadow-xl">{"dkd"}</div>
              <div className="w-full h-[200px] shadow-xl">{"ks"}</div>
            </div>
          </div>
        </>
      ) : (
        "You have no active campaign. Launch one today."
      )}
    </>
  );
};

export default SummaryComponentBox;
