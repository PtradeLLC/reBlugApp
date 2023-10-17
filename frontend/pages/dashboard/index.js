import { Fragment, useState, createContext } from "react";
import { Popover, Transition } from "@headlessui/react";
import withAuth from "../api/withAuth";
import { useUserData } from '@nhost/nextjs';
import { FaceIcon, ImageIcon, SizeIcon } from '@radix-ui/react-icons'
import Link from "next/link";
import EmailTabs from "../../components/EmailTabs";
import MaapTabs from "../../components/MaapTabs";
import MarketTabs from "../../components/MarketCampTab";
import Kpi from "../../components/Kpi";
import Loading from "../../components/Loading";
import DashConvTool from "../../components/DashEmailMar";
import CampaignSummary from "../../components/CampaignSummary";

const navigation = [
    { name: "Home", href: "#", current: true },
    { name: "Profile", href: "/profile", current: false },
    { name: "Resources", href: "#", current: false },
];
const userNavigation = [
    { name: "Your Profile", href: "/profile" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
];

const cards = [
    { name: "Marketing", href: "#", title: "Email Conversational", id: 1, icon: "SizeIcon", bground: "#A18072" },
    { name: "Marketing", href: "#", title: "Campaign Automation", id: 2, icon: "SizeIcon", bground: "#A18072" },
    { name: "Creators", href: "#", title: "Messaging Platform", id: 3, icon: "SizeIcon", bground: "#A18072" }
];

const stats = [
    { label: "Vacation days left", value: 12 },
    { label: "Sick days left", value: 4 },
    { label: "Personal days left", value: 2 },
];
const recentHires = [
    {
        name: "Leonard Krasner",
        handle: "leonardkrasner",
        imageUrl:
            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        href: "#",
    },
    {
        name: "Floyd Miles",
        handle: "floydmiles",
        imageUrl:
            "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        href: "#",
    },
    {
        name: "Emily Selman",
        handle: "emilyselman",
        imageUrl:
            "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        href: "#",
    },
    {
        name: "Kristin Watson",
        handle: "kristinwatson",
        imageUrl:
            "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        href: "#",
    },
];
const quicklinks = [
    {
        id: 1,
        title: "Email Conversational Tool",
        href: "#",
        preview:
            "An AI-powered marketing tool that helps businesses improve their email communication by embedding a chatbot into their emails and newsletters. This allows recipients to interact with a knowledge-based chatbot that answers questions and provide support, help with fundraising, sales, marketing, and more.",
    },
    {
        id: 2,
        title: "Marketing Automation",
        href: "#",
        preview:
            "This AI-powered tool can help you with every stage of your marketing campaign, from analyzing trends to planning and launching your campaign. It can help you to Identify your target audience and their needs, Research your competition, Understand the latest marketing trends, Develop a marketing strategy that is tailored to your specific goals, Create and distribute engaging marketing content, Track and measure the results of your campaigns",
    },
    {
        id: 3,
        title: "Messaging as a Platform",
        href: "#",
        preview: "Messaging platforms are the new frontier for creators. They give you the power to connect with your audience on a deeper level, build stronger relationships, and boost engagement. With Messaging as a Platform (MaaP), you can create personalized and interactive messaging experiences that will keep your fans coming back for more. Create exclusive content and experiences for your fans who sign up for messaging notifications all without depending on any social media network.",
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

// emailCharts
const emailAction = [
    { id: 1, name: "Processed", num: 0 },
    { id: 2, name: "Delivered", num: 0 },
    { id: 3, name: "Opened", num: 0 },
    { id: 4, name: "Clicked", num: 0 },
    { id: 5, name: "Start a campaign", num: "" },
];

// automated charts
const automationAction = [
    { id: 1, name: "Processed", num: 0 },
    { id: 2, name: "Delivered", num: 0 },
    { id: 3, name: "Opened", num: 0 },
    { id: 4, name: "Clicked", num: 0 },
    { id: 5, name: "Received", num: 0 },
];

//marketing charts
const marketingAction = [
    { id: 1, name: "Processed", num: 0 },
    { id: 2, name: "Delivered", num: 0 },
    { id: 3, name: "Opened", num: 0 },
    { id: 4, name: "Clicked", num: 0 },
    { id: 5, name: "Received", num: 0 },
]

const UserContext = createContext();

const Dashboard = function ({ children }) {
    const [errors, setErrors] = useState('');
    const user = useUserData();
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [selectedKpi, setSelectedKpi] = useState("undefined");
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleClick = () => {
        setOpenModal(true);
    };


    const kpi = (title) => {
        if (title === "Email Conversational") {
            return emailAction.map((action) => (
                <div key={action.id} className={classNames(
                    action.id === 1
                        ? "rounded-tl-lg grid col-span-2 bg-[#A8DF8E] sm:rounded-tr-none"
                        : "",
                    action.id === 2 ? "bg-[#EAD7BB]" : "",
                    action.id === emailAction.length - 2
                        ? "sm:rounded-bl-lg bg-[#159895] text-white"
                        : "",
                    action.id === emailAction.length - 1
                        ? " bg-[#EEEEEE] sm:rounded-bl-none"
                        : "",
                    "group relative p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500"
                )}>
                    <h3 className="text-lg font-medium">
                        <Link href="" className="focus:outline-none">
                            {action.name}: <span className="font-bold text-4xl">{action.num}</span>
                        </Link>
                    </h3>
                    <div>
                        {action.name === "Processed" && (
                            <span className="w-full">
                                <Kpi name={action.name} />
                                <Link href={""}><p className="text-sm">Get Insight details</p></Link>
                            </span>
                        )}
                        {action.name === "Delivered" && (
                            <span className="w-full">
                                <Kpi name={action.name} />
                                <Link href={""}><p className="text-sm">Get Insight details</p></Link>
                            </span>
                        )}
                    </div>
                </div>
            ));
        } else if (title === "Campaign Automation") {
            return automationAction.map((action) => (
                <div key={action.id} className={classNames(
                    action.id === 1
                        ? "rounded-tl-lg grid col-span-2 bg-yellow-500 sm:rounded-tr-none"
                        : "",
                    action.id === 2 ? "bg-emerald-300" : "",
                    action.id === automationAction.length - 2
                        ? "sm:rounded-bl-lg bg-[#D2E0FB] text-black"
                        : "",
                    action.id === automationAction.length - 1
                        ? " bg-[#ffeecb] sm:rounded-bl-none"
                        : "",
                    "group relative p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500"
                )}>
                    <h3 className="text-lg font-medium">
                        <Link href="" className="focus:outline-none">
                            {action.name}: <span className="font-bold text-4xl">{action.num}</span>
                        </Link>
                    </h3>
                    <div>
                        {/* {action.name === "Delivered" && (
                            <span className="w-full">
                                <Kpi name={action.name} />
                            </span>
                        )} */}
                    </div>
                </div>
            ));
        } else if (title === "Messaging Platform") {
            return marketingAction.map((action) => (
                <div key={action.id} className={classNames(
                    action.id === 1
                        ? "rounded-tl-lg grid col-span-2 bg-yellow-500 sm:rounded-tr-none"
                        : "",
                    action.id === 2 ? "bg-red-300" : "",
                    action.id === marketingAction.length - 2
                        ? "sm:rounded-bl-lg bg-slate-700 text-white"
                        : "",
                    action.id === marketingAction.length - 1
                        ? " bg-lime-300 sm:rounded-bl-none"
                        : "",
                    "group relative p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500"
                )}>
                    <h3 className="text-lg font-medium">
                        <Link href="" className="focus:outline-none">
                            {action.name}: <span className="font-bold text-4xl">{action.num}</span>
                        </Link>
                    </h3>
                    <div>
                        <span className="font-bold text-4xl">{action.num}</span>
                        {/* {action.name === "Delivered" && (
                            <span className="w-full">
                                <Kpi name={action.name} />
                            </span>
                        )} */}
                    </div>
                </div>
            ))
        }
        else {
            return null;
        }
    };

    return (
        <>
            {loading ? (
                <div className="flex justify-center blur-md items-center">
                    <Loading />
                </div>
            ) : (
                <UserContext.Provider value={user}>
                    <div className="min-h-full overflow-hidden bg-white py-24 sm:py-32">
                        <Popover as="header" className=" pb-24">
                            {({ open }) => (
                                <>
                                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                                        <div className="relative flex flex-wrap items-center justify-center lg:justify-between">

                                            <div className="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20">
                                                <div className="lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">

                                                    <div className="hidden lg:col-span-2 lg:block">
                                                        <nav className="flex space-x-4">
                                                            {navigation.map((item) => (
                                                                <a
                                                                    key={item.name}
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        item.current ? "text-black" : "text-black",
                                                                        "rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10"
                                                                    )}
                                                                    aria-current={item.current ? "page" : undefined}
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            ))}
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Transition.Root as={Fragment}>
                                        <div className="lg:hidden">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="duration-150 ease-out"
                                                enterFrom="opacity-0"
                                                enterTo="opacity-100"
                                                leave="duration-150 ease-in"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
                                            </Transition.Child>

                                            <Transition.Child
                                                as={Fragment}
                                                enter="duration-150 ease-out"
                                                enterFrom="opacity-0 scale-95"
                                                enterTo="opacity-100 scale-100"
                                                leave="duration-150 ease-in"
                                                leaveFrom="opacity-100 scale-100"
                                                leaveTo="opacity-0 scale-95"
                                            >
                                                <Popover.Panel
                                                    focus
                                                    className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                                                >
                                                    <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                                        <div className="pb-2 pt-3">
                                                            <div className="flex items-center justify-between px-4">
                                                                <div>
                                                                    <img
                                                                        className="h-8 w-auto"
                                                                        src="/images/Mart.png"
                                                                        alt="ForgedMart"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="mt-3 space-y-1 px-2">
                                                                {navigation.map((item) => (
                                                                    <a
                                                                        key={item.name}
                                                                        href={item.href}
                                                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                                                    >
                                                                        {item.name}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="pb-2 pt-4">
                                                            <div className="flex items-center px-5">
                                                                <div className="ml-3 min-w-0 flex-1">
                                                                    <div className="truncate text-base font-medium text-gray-800">
                                                                        Hello {user?.displayName},
                                                                    </div>
                                                                    <div className="truncate text-sm font-medium text-gray-500">
                                                                        {user?.email}
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                                                >
                                                                    <span className="sr-only">
                                                                        View notifications
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="mt-3 space-y-1 px-2">
                                                                {userNavigation.map((item) => (
                                                                    <a
                                                                        key={item.name}
                                                                        href={item.href}
                                                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                                                    >
                                                                        {item.name}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Popover.Panel>
                                            </Transition.Child>
                                        </div>
                                    </Transition.Root>
                                </>
                            )}
                        </Popover>
                        <main className="-mt-24 pb-8">
                            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                                <h1 className="sr-only">Profile</h1>

                                <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">

                                    <div className="grid grid-cols-1 gap-4 lg:col-span-2">

                                        <section aria-labelledby="profile-overview-title">
                                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                                <h2 className="sr-only" id="profile-overview-title">
                                                    Profile Overview
                                                </h2>
                                                <div className="bg-white p-6">
                                                    <div className="sm:flex sm:items-center sm:justify-between">
                                                        <div className="sm:flex sm:space-x-5">
                                                            <div className="flex-shrink-0">
                                                                <img
                                                                    className="mx-auto h-20 w-20 rounded-full"
                                                                    src={user?.avatarUrl}
                                                                    alt="profile image"
                                                                />
                                                            </div>
                                                            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                                                <h2 className="text-2xl font-semibold text-gray-900">
                                                                    Welcome {user?.displayName}
                                                                </h2>
                                                                <Link href={"/profile"}><span className="text-xs">Brand or Agency? Edit Profile</span></Link>
                                                            </div>
                                                        </div>
                                                        <div className="mt-5 flex justify-center sm:mt-0">
                                                            <button
                                                                onClick={""}
                                                                className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                            >
                                                                Add Team Member
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-3">
                                                        {cards.map((card) => (
                                                            <div
                                                                key={card.id}
                                                                className={`overflow-hidden rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 `}
                                                            >
                                                                <div className={`px-5 py-3`}>
                                                                    <div className="text-sm text-center">
                                                                        <button
                                                                            onClick={() => { setSelectedComponent(card.title); setSelectedKpi(card.title) }}
                                                                            className="font-medium text-[#0f172a] hover:text-black"
                                                                        >
                                                                            <span className="mx-2">{card.title}<br /></span>
                                                                            <span className="font-bold">{card.name}</span>
                                                                            <span className="absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"><card.icon /></span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <section className={`mt-4 ${selectedComponent === "Campaign Automation" || selectedComponent === "Messaging Platform" ? "blur-sm" : ""}`}>
                                            {selectedKpi && (
                                                <div className="divide-y mt-4 divide-gray-200 overflow-hidden rounded-lg bg-white shadow sm:grid sm:grid-cols-3 lg:gap-4 sm:gap-px sm:divide-y-0">
                                                    <h2 className="sr-only" id="quick-links-title">
                                                        Summary
                                                    </h2>
                                                    {selectedComponent ? kpi(selectedComponent) : <CampaignSummary />}
                                                </div>
                                            )}
                                        </section>
                                        <section className={`mt-4 ${selectedComponent === "Campaign Automation" || selectedComponent === "Messaging Platform" ? "blur-sm" : ""}`}>
                                            {selectedComponent === "Email Conversational" && <EmailTabs />}
                                            {selectedComponent === "Campaign Automation" && <MarketTabs />}
                                            {selectedComponent === "Messaging Platform" && <MaapTabs />}
                                        </section>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        <section aria-labelledby="quicklinks-title">
                                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                                <div className="p-6">
                                                    <h2
                                                        className="text-base font-medium text-gray-900"
                                                        id="quicklinks-title"
                                                    >
                                                        Quick Link
                                                    </h2>
                                                    <div className="mt-6 flow-root">
                                                        <ul
                                                            role="list"
                                                            className="-my-5 divide-y divide-gray-200"
                                                        >
                                                            {quicklinks.map((quicklink) => (
                                                                <li key={quicklink.id} className="py-5">
                                                                    <div className="relative">
                                                                        <h3 className="text-sm font-semibold text-gray-800">
                                                                            {quicklink.title}
                                                                        </h3>
                                                                        <p className="mt-1  text-sm text-gray-600">
                                                                            {quicklink.preview}
                                                                        </p>
                                                                        <div className="mt-6">
                                                                            <button
                                                                                onClick={handleClick}
                                                                                className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                                            >
                                                                                Get Started
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <section aria-labelledby="recent-hires-title">
                                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                                <div className="p-6">
                                                    <h2
                                                        className="text-base font-medium text-gray-900"
                                                        id="recent-hires-title"
                                                    >
                                                        Team Members
                                                    </h2>
                                                    <div className="mt-6 flow-root">
                                                        <ul
                                                            role="list"
                                                            className="-my-5 divide-y divide-gray-200"
                                                        >
                                                            {recentHires.map((person) => (
                                                                <li key={person.handle} className="py-4">
                                                                    <div className="flex items-center space-x-4">
                                                                        <div className="flex-shrink-0">
                                                                            {/* <img
                                                                        className="h-8 w-8 rounded-full"
                                                                        src={image || profileImage}
                                                                        alt=""
                                                                    /> */}
                                                                        </div>
                                                                        <div className="min-w-0 flex-1">
                                                                            <p className="truncate text-sm font-medium text-gray-900">
                                                                                {user?.name}
                                                                            </p>
                                                                            <p className="truncate text-sm text-gray-500">
                                                                                {"@" + person.handle}
                                                                            </p>
                                                                        </div>
                                                                        <div>
                                                                            <a
                                                                                href={person.href}
                                                                                className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                                            >
                                                                                View
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="mt-6">
                                                        <a
                                                            href="#"
                                                            className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                        >
                                                            Click
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <span className="mt-3">
                                {<DashConvTool openModal={openModal} setOpenModal={setOpenModal} />}
                            </span>
                        </main>
                    </div>
                </UserContext.Provider>
            )}
        </>

    );
}

export default withAuth(Dashboard);


