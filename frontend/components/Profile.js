import { Fragment, useState, createContext, useRef, useCallback } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { UserCircleIcon, LockClosedIcon, XMarkIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import { useSession } from "next-auth/react";
import AvatarUploadPage from './fileUploadComponent';

const navigation = [
    { name: 'Profile Information', href: '#personal', icon: IdentificationIcon, current: false },
    { name: 'Password', href: '#pass', icon: LockClosedIcon, current: false },
    { name: 'Account', href: '#account', icon: UserCircleIcon, current: false },
    // { name: 'Usage', href: '#', icon: ChartBarSquareIcon, current: false },
]
const teams = [
    { id: 1, name: 'Planetaria', href: '#', initial: 'P', current: false },
    { id: 2, name: 'Protocol', href: '#', initial: 'P', current: false },
    { id: 3, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const UserContext = createContext();

export default function ProfilePg() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session, status } = useSession();
    const inputFileRef = useRef(null);
    const [blob, setBlob] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        profileImage: null,
        brandName: '',
        brandLogo: null,
        email: '',
    });
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    //Password Updates
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const baseUrl = '/api/changepassword';

        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(passwordData),
            });

            if (response.ok) {
                // Optionally, you can handle success here
                console.log('Password changed successfully');
            } else {
                // Handle errors
                console.error('Error changing password');
            }
        } catch (error) {
            console.error('Error changing password', error);
        }
    };

    const { user } = session || {};

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // File Change
    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: file,
        }));

        reader.onload = (readerEvent) => {
            setImageTag((prevTags) => ({
                ...prevTags,
                [fieldName]: readerEvent.target.result,
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    //Form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const baseUrl = '/api/profileupdate';

        const formDataToSend = new FormData();

        // Append text fields to FormData
        formDataToSend.append('firstName', formData.firstName);
        formDataToSend.append('lastName', formData.lastName);
        formDataToSend.append('brandName', formData.brandName);
        formDataToSend.append('email', user.email);

        try {
            // Make the fetch request
            const response = await fetch(baseUrl, {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Response from server:', data);
            } else {
                console.error('Error updating profile:', await response.text());
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <UserContext.Provider value={user}>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative xl:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-black" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 ring-1 ring-white/10">
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map((item) => (
                                                            <li key={item.name}>
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        item.current
                                                                            ? 'bg-white text-black'
                                                                            : 'text-slate-400 hover:text-black hover:bg-white',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                    )}
                                                                >
                                                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                                    {item.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                                <li>
                                                    <div className="text-xs font-semibold leading-6 text-slate-400">Your teams</div>
                                                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                        {teams.map((team) => (
                                                            <li key={team.name}>
                                                                <a
                                                                    href={team.href}
                                                                    className={classNames(
                                                                        team.current
                                                                            ? 'bg-white text-black'
                                                                            : 'text-slate-400 hover:text-black hover:bg-white',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                    )}
                                                                >
                                                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-white text-[0.625rem] font-medium text-slate-400 group-hover:text-black">
                                                                        {team.initial}
                                                                    </span>
                                                                    <span className="truncate">{team.name}</span>
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden xl:fixed xl:inset-y-0 xl:flex xl:w-72 xl:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 ring-1 ring-white/5">
                        <div className="flex h-16 shrink-0 items-center">
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-white text-black'
                                                            : 'text-slate-400 hover:text-black hover:bg-white',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                    )}
                                                >
                                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li>
                                    <div className="text-xs font-semibold leading-6 text-slate-400">Your teams</div>
                                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                                        {teams.map((team) => (
                                            <li key={team.name}>
                                                <a
                                                    href={team.href}
                                                    className={classNames(
                                                        team.current
                                                            ? 'bg-white text-black'
                                                            : 'text-slate-400 hover:text-black hover:bg-white',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                    )}
                                                >
                                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-white text-[0.625rem] font-medium text-slate-400 group-hover:text-black">
                                                        {team.initial}
                                                    </span>
                                                    <span className="truncate">{team.name}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="xl:pl-72">
                    <main className='mt-3'>
                        {/* Settings forms */}
                        <div id='personal' className="divide-y divide-white/5">
                            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 bg-white lg:px-8">
                                <div>
                                    <h2 className="text-base font-semibold leading-7 text-black">Profile Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-slate-400">
                                        Update your personal information.
                                    </p>
                                </div>
                                <div className='xs:mt-2 md:col-span-12'>
                                    {user?.email && <AvatarUploadPage email={user?.email} />}
                                </div>
                                <form className="md:col-span-2" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-black">
                                                First name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName || ''}
                                                    onChange={handleChange}
                                                    required
                                                    id="firstName"
                                                    placeholder='Updated your first name'
                                                    autoComplete="first-name"
                                                    className="block w-full rounded-md border bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-black">
                                                Last name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    id="lastName"
                                                    onChange={handleChange}
                                                    required
                                                    value={formData.lastName || ''}
                                                    placeholder='Updated your last name'
                                                    autoComplete="last-name"
                                                    className="block w-full rounded-md border bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                                                Email address
                                            </label>
                                            <span className='text-slate-500'>current email: {user?.email}</span>
                                        </div>

                                        <div id="brandCompany" className="col-span-full">
                                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-black">
                                                Brand | Company
                                            </label>
                                            <div className="mt-2">
                                                <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                                    <input
                                                        type="text"
                                                        name="brandName"
                                                        id="brandName"
                                                        onChange={handleChange}
                                                        required
                                                        value={formData.brandName || ''}
                                                        autoComplete="brandName"
                                                        className="flex-1 rounded-md border bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                                        placeholder="Update your Brand name"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pl-1 flex mt-2">
                                        <div className="flex w-44">
                                            <button type="submit" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                                Update Profile
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>

                <div id='pass' className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-black">Change password</h2>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                            Update your password associated with your account.
                        </p>
                    </div>

                    <form className="md:col-span-2" onSubmit={handlePasswordSubmit}>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-black">
                                    New password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="new-password"
                                        name="newPassword"
                                        type="password"
                                        placeholder="Your new password"
                                        autoComplete="new-password"
                                        required
                                        className="block w-full rounded-md border bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-black">
                                    Confirm password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="confirm-password"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm password"
                                        required
                                        autoComplete="new-password"
                                        className="block w-full rounded-md border bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                            </div>

                            <div className="mt-4 flex w-44">
                                <button type="submit" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                    Save Information
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div id='account' className="bg-slate-300 border border-b-slate-700 ring-neutral-600 rounded-md grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-black">Delete account</h2>
                        <p className="mt-1 text-sm leading-6 text-slate-900">
                            You can delete your account here. This action is not reversible.
                            All information related to this account will be deleted permanently.
                        </p>
                    </div>
                    <form className="flex items-start md:col-span-2">
                        <button
                            type="submit"
                            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                        >
                            Yes, delete my account
                        </button>
                    </form>
                </div>
            </div>
        </UserContext.Provider >
    )
}
