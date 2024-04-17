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
import dynamic from 'next/dynamic';
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
    { name: "Bloggers", href: "#", title: "Messaging Platform", id: 3, icon: "/images/Bloggers.png", bground: "#A18072", category: "Blogger" }
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
                        brandLogo: data?.brandLogo || null,
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

    return (
        <>
            <Suspense fallback={<Loading />}>
                <div className="min-h-full overflow-hidden flex justify-center bg-white py-16 sm:py-16">
                    <span className="w-full">
                        <DashLay />
                    </span>
                </div >
            </Suspense >
        </>
    );
}
export default Dashboard;
