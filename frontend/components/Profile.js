import { Fragment, useState, createContext } from 'react';
import { Disclosure, Menu, RadioGroup, Switch, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    CreditCardIcon,
    KeyIcon,
    SquaresPlusIcon,
    UserCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { useUserData } from '@nhost/nextjs';

const user = {
    name: 'Lisa Marie',
    email: 'lisamarie@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Dashboard', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Applicants', href: '#' },
    { name: 'Company', href: '#' },
]
const userNavigation = [
    { name: 'Your Profile', href: '#profile-info' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]
const subNavigation = [
    { name: 'Profile', href: '#profile-info', icon: UserCircleIcon, current: false },
    { name: 'Password', href: '#', icon: KeyIcon, current: false },
    { name: 'Plan & Billing', href: '#plans', icon: CreditCardIcon, current: false },
    { name: 'Integrations', href: '#', icon: SquaresPlusIcon, current: false },
]
const plans = [
    { name: 'Startup', priceMonthly: 29, priceYearly: 290, limit: 'Up to 5 active job postings' },
    { name: 'Brands', priceMonthly: 99, priceYearly: 990, limit: 'Up to 25 active job postings' },
    { name: 'Agency', priceMonthly: 99, priceYearly: 990, limit: 'Up to 25 active job postings' },
    { name: 'Enterprise', priceMonthly: 249, priceYearly: 2490, limit: 'Unlimited active job postings' },
]
const payments = [
    {
        id: 1,
        date: '1/1/2020',
        datetime: '2020-01-01',
        description: 'Business Plan - Annual Billing',
        amount: 'CA$109.00',
        href: '#',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const UserContext = createContext();

export default function ProfilePg() {
    const [selectedPlan, setSelectedPlan] = useState(plans[0]);
    const [annualBillingEnabled, setAnnualBillingEnabled] = useState(false);
    const user = useUserData();

    return (
        <UserContext.Provider value={user}>
            <div className="h-full">
                <Disclosure as="header" className="bg-white shadow">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
                                <div className="relative flex h-16 justify-between">
                                    <div className="relative flex items-center lg:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                    <div className="hidden lg:relative lg:ml-4 lg:flex lg:items-center">
                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-4 flex-shrink-0">
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {userNavigation.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) => (
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                                <nav className="hidden lg:flex lg:space-x-8 lg:py-2" aria-label="Global">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 hover:text-gray-900"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </nav>
                            </div>

                            <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
                                <div className="space-y-1 px-2 pb-3 pt-2">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-gray-900"
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                                <div className="border-t border-gray-200 pb-3 pt-4">
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <main className="mx-auto max-w-7xl pb-10 lg:px-8 lg:py-12">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                        <aside className="px-2 py-6 sm:px-6 lg:col-span-3 lg:px-0 lg:py-0">
                            <nav className="space-y-1">
                                {subNavigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-50 text-orange-600 hover:bg-white'
                                                : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                                            'group flex items-center rounded-md px-3 py-2 text-sm font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500',
                                                '-ml-1 mr-3 h-6 w-6 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                        <span className="truncate">{item.name}</span>
                                    </a>
                                ))}
                            </nav>
                        </aside>

                        {/* Profile Information */}

                        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-white">Personal Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-400">
                                    Use a permanent address where you can receive mail.
                                </p>
                            </div>

                            <form id='profile-info' className="md:col-span-2">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                    <div className="col-span-full flex items-center gap-x-8">
                                        <img
                                            src={user?.avatarUrl}
                                            alt={user?.displayName}
                                            className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                                        />
                                        <div>
                                            <button
                                                type="button"
                                                className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                                            >
                                                Change avatar
                                            </button>
                                            <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-white">
                                            First name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-white">
                                            Last name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                                            Username
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-500">
                                                <span className="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
                                                    example.com/
                                                </span>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    autoComplete="username"
                                                    className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="janesmith"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="timezone" className="block text-sm font-medium leading-6 text-white">
                                            Timezone
                                        </label>
                                    </div>
                                </div>

                                <div className="mt-8 flex">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Password reset */}
                        <div id='pass-reset' className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-white">Change password</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-400">
                                    Update your password associated with your account.
                                </p>
                            </div>

                            <form className="md:col-span-2">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-white">
                                            Current password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="current-password"
                                                name="current_password"
                                                type="password"
                                                autoComplete="current-password"
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-white">
                                            New password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="new-password"
                                                name="new_password"
                                                type="password"
                                                autoComplete="new-password"
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-white">
                                            Confirm password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="confirm-password"
                                                name="confirm_password"
                                                type="password"
                                                autoComplete="new-password"
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </UserContext.Provider>
    )
}
