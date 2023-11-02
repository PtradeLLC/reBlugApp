import { Fragment, useState, createContext, Suspense } from "react";
import { Popover, Transition } from "@headlessui/react";
import withAuth from "../api/withAuth";
import { useUserData } from '@nhost/nextjs';
import Link from "next/link";
import EmailTabs from "../../components/EmailTabs";
import MaapTabs from "../../components/MaapTabs";
import MarketTabs from "../../components/MarketCampTab";
import Image from "next/image";
import Kpi from "../../components/Kpi";
import Loading from "./loading";
import DashConvTool from "../../components/EmailMarkForm";
import CampaignSummary from "../../components/CampaignSummary";
import Team from "../../components/TeamMembers";
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';


const navigation = [
    { id: 1, name: "Home", href: "/", current: true },
    { id: 2, name: "Profile", href: "/profile", current: false },
    { id: 3, name: "Resources", href: "#", current: false },
];
const userNavigation = [
    { id: 1, name: "Your Profile", href: "/profile" },
    { id: 2, name: "Settings", href: "#" },
    { id: 3, name: "Sign out", href: "#" },
];

const cards = [
    { name: "Tool", href: "#", title: "Email Conversational", id: 1, icon: "/images/convotool.png", bground: "#A18072", category: "Tool" },
    { name: "Marketing", href: "#", title: "Automate Marketing", id: 2, icon: "/images/automate.png", bground: "#A18072", category: "Marketing" },
    { name: "Creators", href: "#", title: "Messaging Platform", id: 3, icon: "/images/creators.png", bground: "#A18072", category: "Creator" }
];

const teamMembers = [
    {
        id: 1,
        name: "",
        handle: "",
        avatarUrl: "",
        href: "",
    },
];


// absolute inset-0 rounded-xl   Checkout later

const quicklinks = [
    {
        id: 1,
        title: "Email Conversational Tool",
        href: "#",
        preview:
            "An AI-powered marketing tool that helps businesses improve their email communication by embedding a chatbot into their emails and newsletters. This allows recipients to interact with a knowledge-based chatbot that answers questions and provide support, help with fundraising, sales, marketing, and more.",
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

// emailCharts
const emailAction = [
    { id: 1, name: "Processed", num: 0, change: '12%', changeType: 'increase', icon: "" },
    { id: 2, name: "Delivered", num: 0, change: '2%', changeType: 'increase', icon: "" },
    { id: 3, name: "Opened", num: 0, change: '9%', changeType: 'increase', icon: "/images/barchart.png" },
    { id: 4, name: "Clicked", num: 0, change: '2%', changeType: 'increase', icon: "/images/piechart.png" },
    { id: 5, name: "Start your campaign" },
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
    const userId = user.id;
    const [openModal, setOpenModal] = useState(false);
    const [show, setShow] = useState(false);
    const [dataChange, setDataChange] = useState("");
    const [dataColor, setDataColor] = useState("");
    const [teamCount, setTeamCount] = useState([{ user }]);
    const [team, setTeam] = useState("There are no members of your team here");
    const [email, setEmail] = useState({ userId: userId, userEmail: "" });
    const [emailSent, setEmailSent] = useState(false);

    const handleClick = () => {
        setOpenModal(true);
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!isEmailValid(email.userEmail)) {
    //         setEmailMessage("Please enter a valid email address.");
    //         return;
    //     };

    //     try {
    //         const baseUrl = "/api/team-members";
    //         const response = await fetch(baseUrl, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(email)
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }

    //         console.log("EMAIL", email);

    //         setEmailMessage("Invite sent successfully!");
    //         setEmailSent(true);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //         setEmailMessage("An error occurred while sending the invite.");
    //     }
    // };

    const handleModalClick = () => {
        setShow(true);
    };

    const kpi = (title) => {
        if (title === "Email Conversational") {
            return emailAction.map((action) => (
                <Suspense fallback={<Loading />}>
                    <div key={`${action.id}-${title}`} className={classNames(
                        action.id === 1
                            ? "rounded-tl-lg grid col-span-2 bg-[#F1F6F9] sm:rounded-tr-none"
                            : "",
                        action.id === 2 ? "bg-[#ECECEC]" : "",
                        action.id === emailAction.length - 2
                            ? "sm:rounded-bl-lg bg-[#EEEEEE] text-black pt-3 pb-3"
                            : "",
                        action.id === emailAction.length - 1
                            ? " bg-[#F0F0F0] sm:rounded-bl-none pt-3 pb-3"
                            : "",
                        "group relative p-6"
                    )}>
                        <h3 className="text-lg font-medium">
                            {action.name === "Start your campaign" ? (
                                <button type="button" onClick={handleClick}>
                                    {action.name}
                                </button>
                            ) : (
                                <span>
                                    {action.name !== "Start your campaign" && <span className="flex justify-end items-end"> {action.icon && <Image src={action.icon} alt="chart icon" width={24} height={24} />}</span>}
                                    {action.name}: <span className="font-bold text-4xl">{action.num}</span>
                                    <p
                                        className={classNames(
                                            action.num > 0 && action.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                                            'ml-2 flex items-baseline text-sm font-semibold text-end'
                                        )}
                                    >
                                        {action.num > 0 && action.changeType === 'increase' ? (
                                            <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-end text-green-500" aria-hidden="true" />
                                        ) : (
                                            <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-end text-red-500" aria-hidden="true" />
                                        )}

                                        <span className="sr-only"> {action.num > 0 && action.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                                        {action.change}
                                    </p>
                                </span>
                            )}
                        </h3>

                        <div>
                            {action.name === "Processed" && (
                                <span className="w-full">
                                    <Kpi name={action.name} />
                                    <button className="flex justify-end items-end" type="button" onClick={handleClick}><p className="text-sm text-right">Expand to get insight</p></button>
                                </span>
                            )}
                            {action.name === "Delivered" && (
                                <span className="w-full">
                                    <Kpi name={action.name} />
                                    <button type="button" onClick={handleClick}><p className="text-sm text-right">Expand to get insight</p></button>
                                </span>
                            )}
                        </div>
                    </div>
                </Suspense>
            ));
        } else if (title === "Automate Marketing") {
            return automationAction.map((action) => (
                <div key={`${action.id}-${title}`} className={classNames(
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
                    "group relative p-6"
                )}>
                    <h3 className="text-lg font-medium">
                        {/* EDIT THIS  */}
                        <button type="button" onClick={handleClick} className="focus:outline-none">
                            {action.name}: <span className="font-bold text-4xl">{action.num}</span>
                        </button>
                    </h3>
                </div>
            ));
        } else if (title === "Messaging Platform") {
            return marketingAction.map((action) => (
                <div key={`${action.id}-${title}`} className={classNames(
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
                        {/* EDIT THIS  */}
                        <button type="button" onClick={handleClick} className="focus:outline-none">
                            {action.name}: <span className="font-bold text-4xl">{action.num}</span>
                        </button>
                    </h3>
                </div>
            ))
        }
        else {
            return null;
        }
    };

    return (
        <>
            <Suspense fallback={<Loading />}>
                <UserContext.Provider value={user}>
                    <div className="min-h-full overflow-hidden bg-white py-16 sm:py-16">
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
                                                <div className="bg-[#f4f4f4] p-6">
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
                                                                <Link href={"/profile"}><span className="text-xs">Edit Profile</span></Link>
                                                            </div>
                                                        </div>
                                                        <div className="mt-5 flex justify-center sm:mt-0">
                                                            <Link
                                                                href={"/profile"}
                                                                className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                            >
                                                                Use as Brand or Agency
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-3">
                                                        {cards.map((card) => (
                                                            <div
                                                                key={card.id}
                                                                className={`overflow-hidden h-[60px] flex justify-center items-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 `}
                                                            >
                                                                <div className={`px-5 py-3`}>
                                                                    <div className="flex text-sm text-center items-center">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => { setSelectedComponent(card.title); setSelectedKpi(card.title) }}
                                                                            className="font-medium text-[#0f172a] hover:text-black flex items-center space-x-1"
                                                                        >
                                                                            <Image src={card.icon} alt="icon" width={30} height={30} />
                                                                            <span>{card.title}</span>
                                                                        </button>
                                                                    </div>
                                                                    <span className="text-xs block text-center">{card.category}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                </div>
                                            </div>
                                        </section>
                                        <section className={`mt-4 ${selectedComponent === "Automate Marketing" || selectedComponent === "Messaging Platform" ? "pointer-events-none blur-md backdrop-blur-md cursor-not-allowed" : ""}`}>
                                            {selectedKpi && (
                                                <div className={`${selectedComponent ? `divide-y mt-4 divide-gray-200 overflow-hidden rounded-lg bg-white shadow sm:grid sm:grid-cols-3 lg:gap-4 sm:gap-px sm:divide-y-0` : ""}`}>
                                                    <h2 className="sr-only">
                                                        Summary
                                                    </h2>
                                                    {selectedComponent ? kpi(selectedComponent)
                                                        :
                                                        <div>
                                                            <CampaignSummary selectedComponent={selectedComponent} openModal={openModal} setOpenModal={setOpenModal} />
                                                        </div>
                                                    }
                                                </div>
                                            )}
                                        </section>
                                        <section className={`mt-4 ${selectedComponent === "Automate Marketing" || selectedComponent === "Messaging Platform" ? "blur-md backdrop-blur-md pointer-events-none cursor-not-allowed" : ""}`}>
                                            {selectedComponent === "Email Conversational" && <EmailTabs />}
                                            {selectedComponent === "Automate Marketing" && <MarketTabs />}
                                            {selectedComponent === "Messaging Platform" && <MaapTabs />}
                                        </section>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        <section aria-labelledby="recent-hires-title">
                                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                                <div className="p-6">
                                                    <span className="flex">
                                                        <div className="flex">
                                                            <Image src="/images/team.png" width={25} height={25} alt="team members" />
                                                            <h2
                                                                className="text-base font-medium text-gray-900"
                                                                id="recent-hires-title"
                                                            >
                                                                Team Members
                                                            </h2>
                                                        </div>
                                                    </span>
                                                    <div className="mt-6 flow-root">
                                                        <ul role="list" className="-my-5 divide-y divide-gray-200">
                                                            {teamCount.length > 0 ? teamCount.map((person) => (
                                                                <li key={person.user.handle} className="py-4">
                                                                    <div className="flex items-center space-x-4">
                                                                        <div className="flex-shrink-0">
                                                                            <img
                                                                                className="h-8 w-8 rounded-full"
                                                                                src={person.user.avatarUrl}
                                                                                alt="profile image"
                                                                            />
                                                                        </div>
                                                                        <div className="min-w-0 flex-1">
                                                                            <p className="truncate text-sm font-medium text-gray-900">
                                                                                {person?.user?.displayName}
                                                                            </p>
                                                                            <p className="truncate text-sm text-gray-500">
                                                                                {"@" + person.user.displayName.split(" ").join("_")}
                                                                            </p>
                                                                        </div>
                                                                        <div>
                                                                            <a
                                                                                href={person.user.href}
                                                                                className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                                            >
                                                                                View
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )) : <div>
                                                                <span>{team}</span>
                                                            </div>}
                                                        </ul>
                                                    </div>
                                                    <div className="mt-6">
                                                        <button
                                                            type="button"
                                                            onClick={handleModalClick}
                                                            className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                        >
                                                            Add Team Member
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <section aria-labelledby="quicklinks-title">
                                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                                <div className="p-6">
                                                    <span className="flex">
                                                        <div className="flex space-x-1">
                                                            <Image src="/images/link.png" width={15} height={15} alt="quick links" />
                                                            <h2 className="text-base font-medium text-gray-900" id="quicklinks-title">
                                                                Quick Link
                                                            </h2>
                                                        </div>
                                                    </span>

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
                                    </div>
                                </div>
                            </div>
                            <span className="mt-3 px-2">
                                <DashConvTool openModal={openModal} setOpenModal={setOpenModal} />
                            </span>
                            <span>
                                {show && <Team email={email} setEmail={setEmail} userId={userId} show={show} setShow={setShow} setEmailSent={setEmailSent} emailSent={emailSent} />}
                            </span>
                        </main>
                    </div>
                </UserContext.Provider>
            </Suspense>
        </>

    );
}

export default withAuth(Dashboard);


