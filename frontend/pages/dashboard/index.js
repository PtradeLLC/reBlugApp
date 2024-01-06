import { Fragment, useState, useEffect, createContext, Suspense, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useSession } from 'next-auth/react';
import Link from "next/link";
import EmailTabs from "../../components/EmailTabs";
import MaapTabs from "../../components/MaapTabs";
import MarketTabs from "../../components/MarketCampTab";
import Image from "next/image";
import Kpi from "../../components/Kpi";
import Loading from "../../components/Loading";
import DashConvTool from "../../components/EmailMarkForm";
import CampaignSummary from "../../components/CampaignSummary";
import Team from "../../components/TeamMembers";
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import TeamComponent from "../../components/TeamComponent";
import WelcomeModal from "../../components/verfication-mod";
import { Avatar } from 'flowbite-react';
import dynamic from 'next/dynamic';
import IntegrationsCatalog from "../../components/integrations";
import Integration from "../../components/integrations";
import DashLay from "../../components/sideNav";


const MixedChart = dynamic(() => import('../../components/Charts/OpenClick'), { ssr: false });
const CircleChart = dynamic(() => import('../../components/Charts/Delivered'), {
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


    const handleRefreshList = () => {
        setRefreshList(!refreshList);
    };

    const handleIntegrateButtonClick = () => {
        setIsIntegrationsCatalogVisible(true);
    };

    useEffect(() => {
        if (session) {
            setOpen(true);
        }
    }, [session]);

    useEffect(() => {
        const fetchData = async () => {
            if (!session && !user || session.status === 'loading') {
                return <div className="flex justify-center items-center"><Loading /></div>;
            };

            if (session) {
                try {
                    const response = await fetch("/api/fetchUser");
                    const data = await response.json();

                    setUserData(data);
                    setUser(data);


                    const updatedUser = {
                        firstName: data?.first_name || user?.firstName,
                        lastName: data?.last_name || user?.lastName,
                        provider: data?.provider,
                        brandLogo: data?.brandLogo,
                        brandName: data?.brandName,
                        profileImage: data?.profileImage,
                        session: data?.session || [],
                        role: data?.role,
                    };

                    const firstSession = user?.session && user?.session.length > 0 ? user?.session[0] : null;
                    setUserData(firstSession ? firstSession.sessionToken : null);

                    const fetchedTeam = user?.team ?? [];

                    const currentUserInTeam = fetchedTeam.some(
                        (member) => member.user.id === updatedUser?.id
                    );

                    if (!currentUserInTeam) {
                        const currentUser = {
                            user: {
                                id: updatedUser?.id,
                                name: `${updatedUser?.firstName} ${updatedUser?.lastName} || ${session?.user?.name}`,
                                image: `${updatedUser?.image} || ${session?.user?.image}`,
                                role: `${updatedUser?.role}`,
                            },
                        };

                        fetchedTeam.unshift(currentUser);
                    }
                    // setTeamCount(fetchedTeam);

                    if (data?.recentUpdates) {
                        setPrevRecentUpdatesLength(data.recentUpdates);
                    }

                } catch (error) {
                    console.error("Error fetching user:", error.message);
                }

            }

        };

        fetchData();
    }, [status, session, router, refreshList]);

    useEffect(() => {
        // Check if there are new updates in the recentUpdates array
        if (recentUpdates.length > prevRecentUpdatesLength) {
            setOpenModal(true);
            setPrevRecentUpdatesLength(recentUpdates.length);
        }
    }, [recentUpdates]);


    if (status === 'loading') {
        return <div className="flex justify-center items-center h-screen"><Loading size="lg" /></div>;
    }

    if (!session || session.user === null) {
        router.push('/')
    }

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
        } else if (title === "Messaging Platform") {
            return marketingAction.map((action) => renderKpiContent(action));
        } else {
            return null;
        }
    };

    return (
        <>
            <Suspense fallback={<Loading />}>
                <div className="min-h-full overflow-hidden bg-white py-16 sm:py-16">
                    <DashLay />
                </div >
            </Suspense >
        </>
    );
}
export default Dashboard;


