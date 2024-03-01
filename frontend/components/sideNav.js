import { Fragment, useState, useEffect, createContext, Suspense, useRef } from 'react'
import { Dialog, Menu } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Link from "next/link";
import { useSession } from 'next-auth/react';
import EmailTabs from "./EmailTabs";
import MaapTabs from "./MaapTabs";
import MarketTabs from "./MarketCampTab";
import Image from "next/image";
import Loading from "./Loading";
import DashConvTool from "./EmailMarkForm";
import CampaignSummary from "./CampaignSummary";
import Team from "./TeamMembers";
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import TeamComponent from "./TeamComponent";
import WelcomeModal from "./verfication-mod";
import { Avatar } from 'flowbite-react';
import dynamic from 'next/dynamic';
import IntegrationsCatalog from "./integrations";
import Integration from "./integrations";
import Roadmap from './Roadmap';
import BlogTabs from './BlogTab';


const MixedChart = dynamic(() => import('./Charts/OpenClick'), { ssr: false });
const CircleChart = dynamic(() => import('./Charts/Delivered'), {
    ssr: false,
});

const navigation = [
    { id: 1, name: "Home", href: "/dashboard", current: true },
    { id: 2, name: "Profile", href: "/profile", current: false },
    { id: 3, name: "Resources", href: "/resources", current: false },
];
const userNavigation = [
    { id: 1, name: "Your Profile", href: "/profile" },
    { id: 2, name: "Settings", href: "#" },
    { id: 3, name: "Sign out", href: "#" },
];

const cards = [
    { name: "Tool", href: "#", title: "Email Conversational", id: 1, icon: "/images/convotool.png", bground: "#A18072", category: "Tool" },
    { name: "Bloggers", href: "#", title: "Bloggers Panel", id: 3, icon: "/images/creators.png", bground: "#A18072", category: "Tool" },
    { name: "Marketing", href: "#", title: "Automate Marketing", id: 2, icon: "/images/automate.png", bground: "#A18072", category: "Marketing" }
];

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
    { id: 1, name: "Processed", num: 0, change: '0%', changeType: 'increase', icon: "" },
    { id: 2, name: "Delivered", num: 0, change: '0%', changeType: 'increase', icon: "" },
    { id: 3, name: "Opened", num: 0, change: '0%', changeType: 'increase', icon: "/images/barchart.png" },
    { id: 4, name: "Clicked", num: 0, change: '0%', changeType: 'increase', icon: "/images/piechart.png" },
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
    { id: 1, name: "Distributions", num: 0 },
    { id: 2, name: "Total Upvote", num: 0 },
    { id: 3, name: "Total reBlog", num: 0 },
    { id: 4, name: "New SignUp", num: 0 },
    { id: 5, name: "Sponsorship", num: 0 },
    // { id: 5, name: "Sponsorship", num: 0 },
    // { id: 5, name: "Sponsorship", num: 0 },
]

const UserContext = createContext();


export default function DashLay() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data: session, status } = useSession();
    const [errors, setErrors] = useState('');
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [selectedKpi, setSelectedKpi] = useState("undefined");
    // const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [show, setShow] = useState(false);
    const [dataChange, setDataChange] = useState("");
    const [dataColor, setDataColor] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [email, setEmail] = useState("");

    // Retrieve session information using useSession
    // const { data: session, status } = useSession();
    const [userData, setUserData] = useState(null);
    const [user, setUser] = useState(null);
    const [userSession, setUserSession] = useState(null);
    const managerName = session?.user?.name || `${user?.firstName} ${user?.lastName}`;
    const managerImage = session?.user?.image ?? (user?.profileImage ?? "/images/brand.png");
    const managerRole = session?.user?.role || `${user?.role}` || "Manager";
    const [refreshList, setRefreshList] = useState(false);
    const [isVerified, setIsVerified] = useState(true);
    const prevSessionRef = useRef(session);
    const [userFirstName, setUserFirstName] = useState('');
    const [recentUpdates, setRecentUpdates] = useState([]);
    const [prevRecentUpdatesLength, setPrevRecentUpdatesLength] = useState(0);
    const [isIntegrationsCatalogVisible, setIsIntegrationsCatalogVisible] = useState(false);
    const [userInfo, setUserInfo] = useState(null);


    const handleRefreshList = () => {
        setRefreshList(!refreshList);
    };

    const handleIntegrateButtonClick = () => {
        setIsIntegrationsCatalogVisible(true);
    };

    const handleClick = () => {
        setOpenModal(true);
    };

    const handleModalClick = () => {
        setShow(true);
    };

    const kpi = (title) => {
        const renderKpiContent = (action) => (
            <div key={`${action.id}-${title} `} className={classNames(
                action.id === 1 ? "rounded-tl-lg grid col-span-2 bg-[#F1F6F9] sm:rounded-tr-none" : "",
                action.id === 2 ? "bg-[#ECECEC] p-0" : "",
                action.id === emailAction.length - 2 ? "sm:rounded-bl-lg bg-[#EEEEEE] text-black pt-3 pb-3 mt-3" : "",
                action.id === emailAction.length - 1 ? " bg-[#F0F0F0] sm:rounded-bl-none pt-3 pb-3 mt-3" : "",
                "group relative p-6"
            )}>
                <h3 className="text-lg font-medium p-1">
                    {action.name === "Start your campaign" ? (
                        <button type="button" onClick={handleClick}>
                            {action.name}
                        </button>
                    ) : (
                        <span>
                            {action.name !== "Start your campaign" && <span className="flex justify-end items-end"> {action.icon && <Image src={action.icon} alt="chart icon" width={24} height={24} />}</span>}
                            {action.name}: <span className="font-bold text-4xl">{action.num}</span>
                            <p className={classNames(
                                action.num > 0 && action.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                                'ml-2 flex items-baseline text-sm font-semibold text-end'
                            )}>
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
                    {/*  */}
                    {action.name === "Processed" && (
                        <span className="w-full">
                            <MixedChart className="w-full" />
                            <button className="flex justify-end items-end p-1" type="button" onClick={handleClick}><p className=" flex justify-center items-center mx-2 text-sm text-right p-1">
                                <span className="relative mx-1 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75">
                                    </span>
                                </span>
                                Get Live analytics/insight
                            </p></button>
                        </span>
                    )}
                    {action.name === "Delivered" && (
                        <span className="w-full">
                            <CircleChart className="w-full" />
                            <button type="button" onClick={handleClick}>
                                <p className=" flex justify-center items-center mx-2 text-sm text-right p-1">
                                    <span className="relative mx-1 flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75">
                                        </span>
                                    </span>
                                    Get Live analytics/insight
                                </p>
                            </button>
                        </span>
                    )}
                </div>
            </div>
        );

        if (title === "Email Conversational") {
            return emailAction.map((action) => renderKpiContent(action));
        } else if (title === "Automate Marketing") {
            return automationAction.map((action) => renderKpiContent(action));
        } else if (title === "Bloggers Panel") {
            return marketingAction.map((action) => renderKpiContent(action));
        } else {
            return null;
        }
    };




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/fetchUser');

                if (response.ok) {
                    // Parse the response data
                    const jsonData = await response.json();

                    setUserInfo(jsonData);
                } else {
                    console.error('Failed to fetch data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();


    }, []);

    // md:w-full

    return (
        <div className='flex sm:justify-center md:justify-start'>
            <div className="">
                {/* Content area */}
                <div className="flex flex-col overflow-hidden">
                    {/* Main content */}
                    <div className="mobile-main flex overflow-hidden">
                        <main className="index-main  pb-8 lg:mt-8">
                            {/* lg:max-w-[110rem] , max-w-3xl */}
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <h1 className="sr-only">Profile</h1>

                                <div className="grid grid-cols-1 items-start gap-4 lg:gap-8">

                                    <div className="grid grid-cols-1 gap-4 lg:col-span-2 sm:mt-6.5">

                                        <section aria-labelledby="profile-overview-title">
                                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                                <h2 className="sr-only" id="profile-overview-title">
                                                    Profile Overview
                                                </h2>
                                                <div className="bg-[#f4f4f4] p-6">
                                                    <div className="sm:flex sm:items-center sm:justify-between">
                                                        <div className="sm:flex mr-1 sm:space-x-5">
                                                            <div className="flex-shrink-0">
                                                                {loading ? <Loading /> : <img
                                                                    className="mx-auto h-20 w-20 rounded-full border"
                                                                    src={session?.user?.image || user?.image || "/images/brand.png"}
                                                                    alt="profile image"
                                                                />}
                                                            </div>
                                                            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                                                <h2 className="text-2xl font-semibold text-gray-900">
                                                                    Welcome {userInfo?.firstName}
                                                                </h2>
                                                                <Link href={"/profile"}> <h4>
                                                                    Brand: {user?.brandName && `${user?.brandName}`}{' '}
                                                                    {!user?.brandName && 'Not set. Want to use as brand or agency?'}
                                                                </h4>
                                                                    <span className="text-xs">Edit Profile | image | name</span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="mt-5 m-auto flex justify-center sm:mt-0 w-[200px] h-[50px]">
                                                            <Link
                                                                href={'/dashboard/userdb'}
                                                                className="flex items-center justify-center rounded-md bg-emerald-100 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-emerald-50 hover:text-gray-800"
                                                            >
                                                                <Image className="mx-1" src="/images/brand.png" width={20} height={20} alt="as brand" />Integrate with apps
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    <div className="mt-2 grid sm:mx-auto md:mx-auto sm:grid-cols-1 grid-cols-1 gap-5 lg:grid-cols-3 items-center w-full">
                                                        {cards.map((card) => (
                                                            <button
                                                                key={card.id}
                                                                type="button"
                                                                onClick={() => { setSelectedComponent(card.title); setSelectedKpi(card.title) }}
                                                                className="font-medium mx-auto md:mx-auto text-[#0f172a] hover:text-black flex items-center space-x-1"
                                                            >
                                                                <div
                                                                    className={`overflow-hidden h-[50px]  w-[200px] flex justify-center items-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
                                                                >
                                                                    <div className="">
                                                                        <div className="flex text-sm text-center items-center">

                                                                            <Image src={card.icon} alt="icon" width={30} height={30} />
                                                                            <span>{card.title}</span>

                                                                        </div>
                                                                        <span className="text-xs block text-center">{card.category}</span>
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <section className={`mt-4 ${selectedComponent === "Automate Marketing" ? "pointer-events-none blur-md backdrop-blur-md cursor-not-allowed" : ""} `}>
                                            {selectedKpi && (
                                                <div className={`${selectedComponent ? `divide-y mt-4 divide-gray-200 overflow-hidden rounded-lg bg-white shadow sm:grid sm:grid-cols-3  sm:gap-px sm:divide-y-0` : ""} `}>
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
                                        <section className={`mt - 4 ${selectedComponent === "Automate Marketing" ? "blur-md backdrop-blur-md pointer-events-none cursor-not-allowed" : ""} `}>
                                            {selectedComponent === "Email Conversational" && <EmailTabs />}
                                            {selectedComponent === "Automate Marketing" && <MarketTabs />}
                                            {selectedComponent === "Bloggers Panel" && <BlogTabs />}
                                        </section>
                                    </div>

                                </div>
                            </div>
                            <span className="mt-3 px-2">
                                <DashConvTool openModal={openModal} setOpenModal={setOpenModal} />
                            </span>
                            <span>
                                {show && <Team email={email} setEmail={setEmail} show={show} setShow={setShow} setEmailSent={setEmailSent} emailSent={emailSent} />}
                            </span>
                            <span>
                                {recentUpdates && recentUpdates.length > 0 && (
                                    <WelcomeModal
                                        session={session}
                                        brandName={user?.brandName}
                                        managerRole={managerRole}
                                        brandLogo={user.brandLogo}
                                        image={managerImage}
                                        email={email}
                                        firstName={user?.firstName}
                                        lastName={user?.lastName}
                                        openModal={openModal}
                                        setOpenModal={setOpenModal}
                                        recentUpdates={recentUpdates}
                                    />
                                )}
                            </span>
                            {isIntegrationsCatalogVisible && (<>
                                <IntegrationsCatalog onClose={() => setIsIntegrationsCatalogVisible(false)} />
                                <Integration
                                    user
                                    brandName={user?.brandName}
                                    managerRole={managerRole}
                                    brandLogo={user?.brandLogo}
                                    image={managerImage}
                                    email={email}
                                    firstName={user?.firstName}
                                    lastName={user?.lastName}
                                />
                            </>

                            )}
                        </main>

                        {/* Secondary column (hidden on smaller screens) */}
                        <aside className="hidden w-96 overflow-y-auto border-l border-t border-gray-200 bg-white lg:block">
                            <section aria-labelledby="quicklinks-title">
                                <div className="grid grid-cols-1 gap-4 border-r">
                                    <section aria-labelledby="recent-hires-title">
                                        <div className="overflow-hidden bg-white shadow">
                                            <div className="p-6">
                                                <span className="flex">
                                                    <div className="flex">
                                                        <Image className="h-[17px] w-[20px] justify-center items-center" src={"/images/team.png"} width={25} height={18} alt="team members" />
                                                        <h2 className="text-base font-medium text-gray-900" id="recent-hires-title"> Team Members </h2>
                                                    </div>
                                                </span>
                                                <div className="mt-6 flow-root items-center">
                                                    <div className="items-center">
                                                        <span className="flex items-center truncate text-sm font-medium mx-2 text-gray-900">
                                                            {loading && <Loading className="ml-2" />}
                                                            <img className="rounded w-7" src={managerImage} alt='profileImage' />
                                                            <span className="truncate mx-1 font-bold my-1 text-sm text-gray-900">{userInfo?.firstName}</span>
                                                            <span className="mx-1 flex items-center">
                                                                <button className="mx-1" onClick={handleRefreshList}>Refresh</button>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                                                </svg>
                                                            </span>
                                                        </span>
                                                        <span className="mx-1 font-thin my-1 text-sm text-gray-900">{userInfo?.role.toLowerCase()}</span>
                                                    </div>
                                                    <TeamComponent refreshList={refreshList} />
                                                </div>

                                                <div className="mt-6">
                                                    <button
                                                        type="button"
                                                        onClick={handleModalClick}
                                                        className="flex w-full items-center justify-center rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    >
                                                        Add Team Member
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <div className="overflow-hidden border-r bg-white shadow">
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
                                {/* <div className='mt-1 border-r'>
                                    <Roadmap />
                                </div> */}
                            </section>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    )
}
