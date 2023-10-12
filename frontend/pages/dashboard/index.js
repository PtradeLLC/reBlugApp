import { Fragment, useState, createContext } from "react";
import { Popover, Transition } from "@headlessui/react";
import withAuth from "../api/withAuth";
import { useUserData } from '@nhost/nextjs';
import { FaceIcon, ImageIcon, SizeIcon } from '@radix-ui/react-icons'
import Link from "next/link";

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
    { name: "Marketing", href: "#", amount: "Email Conversational Tool", id: 1, icon: "SizeIcon", bground: "#A18072" },
    { name: "Marketing", href: "#", amount: "Campaign Automation", id: 2, icon: "SizeIcon", bground: "#A18072" },
    { name: "Creators", href: "#", amount: "Messaging Platform", id: 3, icon: "SizeIcon", bground: "#A18072" }
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
            "Turn chats into sales with our conversational AI commerce. Let chatbot provide answers to your customers and handle sales on your behalf in a personalized shopping environment. Connect with clients in real time to promote new initiatives, update customers on key happenings all within the email.",
    },
    {
        id: 2,
        title: "Marketing Automation",
        href: "#",
        preview:
            "Let this Ai powered tool analyze trends, plan, and launch your campaign...",
    },
    {
        id: 3,
        title: "Messaging as a Platform",
        href: "#",
        preview: "Creators can ....",
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const actions = [
    { id: 1, name: "KPI-ONE" },
    { id: 2, name: "KPI-TWO" },
    { id: 3, name: "KPI-THREE" },
];

const UserContext = createContext();

const Dashboard = function ({ children }) {
    const [errors, setErrors] = useState('');
    const user = useUserData();
    return (
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
                                            <div className="px-12 lg:px-0">

                                                <div className="mx-auto w-full max-w-xs lg:max-w-md">
                                                    <label htmlFor="search" className="sr-only">
                                                        Search
                                                    </label>
                                                    <div className="relative text-gray-400 focus-within:text-gray-600">
                                                        <input
                                                            id="search"
                                                            className="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-gray-600 placeholder:text-gray-600 focus:bg-white focus:text-gray-900 ring-1 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                                                            placeholder="Search"
                                                            type="search"
                                                            name="search"
                                                        />
                                                    </div>
                                                </div>
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
                                                        <div className="flex-shrink-0">
                                                            {/* <img
                                                                className="h-10 w-10 rounded-full"
                                                                src={image || profileImage}
                                                                alt="profile image"
                                                            /> */}
                                                        </div>
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
                                                        <span className="text-sm">Edit</span>
                                                    </div>
                                                </div>
                                                <div className="mt-5 flex justify-center sm:mt-0">
                                                    <a
                                                        href="#"
                                                        className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    >
                                                        Add Team Member
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-3">
                                                {cards.map((card) => (
                                                    <div
                                                        key={card.id}
                                                        // className={`overflow-hidden rounded-lg ${card.id === 1 ? 'bg-yellow-400' : card.id === 2 ? 'bg-blue-500' : card.id === 3 ? 'bg-blue-900' : null} shadow`}
                                                        className={`overflow-hidden rounded-lg shadow bg-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 `}
                                                    >
                                                        <div className={`px-5 py-3 bg-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 `}>
                                                            <div className="text-sm text-center">
                                                                <Link
                                                                    href={card.href}
                                                                    className="font-medium text-[#0f172a] hover:text-gray-400"
                                                                >
                                                                    <span className="mx-2">{card.name}<br /></span>
                                                                    <span className="font-bold">{card.amount}</span>

                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {/* <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-1 sm:divide-x sm:divide-y-0">
                                            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-3">

                                                {cards.map((card) => (
                                                    <div
                                                        key={card.id}
                                                        className="overflow-hidden rounded-lg bg-white shadow"
                                                    >
                                                        <div className="p-5">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0"></div>
                                                                <div className="ml-5 w-0 flex-1">
                                                                    <dl>
                                                                        <dt className="truncate text-sm font-medium text-gray-500">
                                                                            {card.name}
                                                                        </dt>
                                                                        <dd>
                                                                            <div className="text-lg font-medium text-gray-900">
                                                                                {card.amount}
                                                                            </div>
                                                                        </dd>
                                                                    </dl>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-50 px-5 py-3">
                                                            <div className="text-sm text-center">
                                                                <a
                                                                    href={card.href}
                                                                    className="font-medium text-gray-700 hover:text-gray-900"
                                                                >
                                                                    Click
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div> */}
                                    </div>
                                </section>
                                <section aria-labelledby="quick-links-title">
                                    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-3 sm:gap-px sm:divide-y-0">
                                        <h2 className="sr-only" id="quick-links-title">
                                            Quick links
                                        </h2>
                                        {actions.map((action, actionIdx) => (
                                            <div
                                                key={action.id}
                                                className={classNames(
                                                    actionIdx === 0
                                                        ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                                                        : "",
                                                    actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                                                    actionIdx === actions.length - 2
                                                        ? "sm:rounded-bl-lg"
                                                        : "",
                                                    actionIdx === actions.length - 1
                                                        ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                                                        : "",
                                                    "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500"
                                                )}
                                            >
                                                <div className="mt-8">
                                                    <h3 className="text-lg font-medium">
                                                        <a
                                                            href={action.href}
                                                            className="focus:outline-none"
                                                        >

                                                            <span
                                                                className="absolute inset-0"
                                                                aria-hidden="true"
                                                            />
                                                            {action.name}
                                                        </a>
                                                    </h3>
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        Doloribus dolores nostrum quia qui natus officia
                                                        quod et dolorem. Sit repellendus qui ut at
                                                        blanditiis et quo et molestiae.
                                                    </p>
                                                </div>
                                                <span
                                                    className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        className="h-6 w-6"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                                    </svg>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
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
                                                Quick Links
                                            </h2>
                                            <div className="mt-6 flow-root">
                                                <ul
                                                    role="list"
                                                    className="-my-5 divide-y divide-gray-200"
                                                >
                                                    {quicklinks.map((quicklink) => (
                                                        <li key={quicklink.id} className="py-5">
                                                            <div className="relative focus-within:ring-2 focus-within:ring-gray-500">
                                                                <h3 className="text-sm font-semibold text-gray-800">
                                                                    <a
                                                                        href={quicklink.href}
                                                                        className="hover:underline focus:outline-none"
                                                                    >
                                                                        <span
                                                                            className="absolute inset-0"
                                                                            aria-hidden="true"
                                                                        />
                                                                        {quicklink.title}
                                                                    </a>
                                                                </h3>
                                                                <p className="mt-1  text-sm text-gray-600">
                                                                    {quicklink.preview}
                                                                </p>
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
                                                    Visit
                                                </a>
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
                </main>
            </div>
        </UserContext.Provider>
    );
}

export default withAuth(Dashboard);


