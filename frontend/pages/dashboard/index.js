import { Fragment, useState, useEffect, createContext, Suspense } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useSession } from 'next-auth/react';
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
import { useRouter } from 'next/navigation';
import TeamComponent from "../../components/TeamComponent";
import WelcomeModal from "../../components/verfication-mod";
import { Avatar } from 'flowbite-react';
import dynamic from 'next/dynamic';

const MixedChart = dynamic(() => import('../../components/Charts/OpenClick'), { ssr: false });
const CircleChart = dynamic(() => import('../../components/Charts/Delivered'), {
    ssr: false,
});

const navigation = [
    { id: 1, name: "Home", href: "/", current: true },
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
    { name: "Marketing", href: "#", title: "Automate Marketing", id: 2, icon: "/images/automate.png", bground: "#A18072", category: "Marketing" },
    { name: "Creators", href: "#", title: "Messaging Platform", id: 3, icon: "/images/creators.png", bground: "#A18072", category: "Creator" }
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
    { id: 1, name: "Processed", num: 0 },
    { id: 2, name: "Delivered", num: 0 },
    { id: 3, name: "Opened", num: 0 },
    { id: 4, name: "Clicked", num: 0 },
    { id: 5, name: "Received", num: 0 },
]

const UserContext = createContext();

const Dashboard = function ({ children }) {

    const [errors, setErrors] = useState('');
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [selectedKpi, setSelectedKpi] = useState("undefined");
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [show, setShow] = useState(false);
    const [dataChange, setDataChange] = useState("");
    const [dataColor, setDataColor] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [email, setEmail] = useState("");

    // Retrieve session information using useSession
    const { data: session, status } = useSession();
    const [user, setUser] = useState('');
    const managerName = session?.user?.name || `${user.firstName} ${user.lastName}`;
    const managerImage = session?.user?.image || user.image || "/images/brand.png";
    const managerRole = session?.user?.role || user.role || "User";
    const [refreshList, setRefreshList] = useState(false);
    const [isVerified, setIsVerified] = useState(true);

    const handleRefreshList = () => {
        setRefreshList(!refreshList);
    };

    useEffect(() => {
        if (session) {
            setOpen(true);
        }
    }, [session]);

    useEffect(() => {
        if (status === 'loading') {
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch("/api/fetchUser");
                if (response.ok) {

                    const data = await response.json();


                    setUser(data);
                    let fetchedTeam = data.team || [];
                    console.log(fetchedTeam);

                    // Check if the current user is not already in the team.
                    const currentUserInTeam = fetchedTeam.some(member => member.user.id === user?.id);

                    // If not in the team, add the current user as the default team member.
                    if (!currentUserInTeam) {
                        const currentUser = {
                            user: {
                                id: user.id,
                                name: `${user.firstName} ${user.lastName} || ${session.user.name}`,
                                image: `${user.image} || ${session.user.image}`,
                            },
                            role: "Manager",
                        };

                        // Set the current user as the default team member
                        fetchedTeam = [currentUser, ...fetchedTeam];
                    }
                    // setTeamCount(fetchedTeam);
                } else {
                    console.error("Error fetching user:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching user:", error.message);
            }
        };

        if (session && session.user) {
            fetchData();
        } else {
            console.log("There's no session");
            router.push('/login');
        }
    }, [status, session, router]);

    if (status === 'loading' || !session) {
        return <div className="flex justify-center items-center w-full h-full"><Loading /></div>;
    }

    // Rest of the component body
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
                action.id === emailAction.length - 2 ? "sm:rounded-bl-lg bg-[#EEEEEE] text-black pt-3 pb-3" : "",
                action.id === emailAction.length - 1 ? " bg-[#F0F0F0] sm:rounded-bl-none pt-3 pb-3" : "",
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
                            <MixedChart />
                            <button className="flex justify-end items-end p-1" type="button" onClick={handleClick}><p className="text-sm text-right">Expand to get insight</p></button>
                        </span>
                    )}
                    {action.name === "Delivered" && (
                        <span className="w-full">
                            <CircleChart />
                            <button type="button" onClick={handleClick}><p className="text-sm text-right p-1">Expand to get insight</p></button>
                        </span>
                    )}
                </div>
            </div>
        );


        if (title === "Email Conversational") {
            return emailAction.map((action) => renderKpiContent(action));
        } else if (title === "Automate Marketing") {
            return automationAction.map((action) => renderKpiContent(action));
        } else if (title === "Messaging Platform") {
            return marketingAction.map((action) => renderKpiContent(action));
        } else {
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

                                    <Transition.Root show={open} as={Fragment}>
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
                                                                    <Image
                                                                        src="/images/Mart.png"
                                                                        alt="ForgedMart Logo"
                                                                        width={100}
                                                                        height={24}
                                                                        priority
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
                                                                        Hello {session?.user?.name || user?.brandName},
                                                                    </div>
                                                                    <div className="truncate text-sm font-medium text-gray-500">
                                                                        {session?.user?.email || user?.email}
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
                            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-[110rem] lg:px-8">
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
                                                                {loading ? <Loading /> : <img
                                                                    className="mx-auto h-20 w-20 rounded-full border"
                                                                    src={session.user?.image || user?.image || "/images/brand.png"}
                                                                    alt="profile image"
                                                                />}
                                                            </div>
                                                            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                                                <h2 className="text-2xl font-semibold text-gray-900">
                                                                    Welcome {session?.user?.name || `${user?.firstName} ${user?.lastName} `}
                                                                </h2>
                                                                <Link href={"/profile"}> <h4>Brand: {session?.user?.name && !user.brandName ? 'Want to use as brand or agency?' : user.brandName}</h4>
                                                                    <span className="text-xs">Edit Profile | image | name</span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="mt-5 flex justify-center sm:mt-0">
                                                            <Link
                                                                href={"/profile"}
                                                                className="flex items-center justify-center rounded-md bg-emerald-100 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-emerald-50 hover:text-gray-800"
                                                            >
                                                                <Image className="mx-1" src="/images/brand.png" width={20} height={20} alt="as brand" />Integrate with apps
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    <div className="mt-2 grid sm:mx-auto md:mx-auto sm:grid-cols-1 grid-cols-1 gap-5 lg:grid-cols-3 items-center">
                                                        {cards.map((card) => (
                                                            <button
                                                                type="button"
                                                                onClick={() => { setSelectedComponent(card.title); setSelectedKpi(card.title) }}
                                                                className="font-medium mx-auto md:mx-auto text-[#0f172a] hover:text-black flex items-center space-x-1"
                                                            >
                                                                <div
                                                                    key={card.id}
                                                                    className={`overflow-hidden h-[60px] flex justify-center items-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
                                                                >
                                                                    <div className="px-4 py-3">
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
                                        <section className={`mt-4 ${selectedComponent === "Automate Marketing" || selectedComponent === "Messaging Platform" ? "pointer-events-none blur-md backdrop-blur-md cursor-not-allowed" : ""} `}>
                                            {selectedKpi && (
                                                <div className={`${selectedComponent ? `divide-y mt-4 divide-gray-200 overflow-hidden rounded-lg bg-white shadow sm:grid sm:grid-cols-3 lg:gap-4 sm:gap-px sm:divide-y-0` : ""} `}>
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
                                        <section className={`mt - 4 ${selectedComponent === "Automate Marketing" || selectedComponent === "Messaging Platform" ? "blur-md backdrop-blur-md pointer-events-none cursor-not-allowed" : ""} `}>
                                            {selectedComponent === "Email Conversational" && <EmailTabs />}
                                            {selectedComponent === "Automate Marketing" && <MarketTabs />}
                                            {selectedComponent === "Messaging Platform" && <MaapTabs />}
                                        </section>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 lg:w-[451px]">
                                        <section aria-labelledby="recent-hires-title">
                                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                                <div className="p-6">
                                                    <span className="flex">
                                                        <div className="flex">
                                                            <Image className="h-[17px] w-[20px] justify-center items-center" src={"/images/team.png"} width={25} height={18} alt="team members" />
                                                            <h2 className="text-base font-medium text-gray-900" id="recent-hires-title"> Team Members </h2>
                                                        </div>
                                                    </span>
                                                    <div className="mt-6 flow-root">
                                                        <div className="flex items-center">
                                                            <span className="flex truncate text-sm font-medium mx-2 text-gray-900">
                                                                {/* <Image src={managerImage} width={25} height={25} alt="profile image" /> */}
                                                                {loading ? <Loading /> : <Avatar className="mx-auto h-25 w-25 rounded-full" img={managerImage} rounded bordered />}
                                                                <span className="truncate mx-1 font-bold my-1 text-sm text-gray-900">{managerName} - {managerRole.toLowerCase()}</span>
                                                                {/* Hide on condition */}
                                                                <span className="mx-1 flex items-center">
                                                                    <button className="mx-1" onClick={handleRefreshList}>Refresh list</button>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                                                    </svg>
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <TeamComponent refreshList={refreshList} />
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
                                {show && <Team email={email} setEmail={setEmail} show={show} setShow={setShow} setEmailSent={setEmailSent} emailSent={emailSent} />}
                            </span>
                            <span>
                                <WelcomeModal openModal={openModal} setOpenModal={setOpenModal} />
                            </span>
                        </main>
                    </div >
                </UserContext.Provider >
            </Suspense >
        </>
    );
}
export default Dashboard;


