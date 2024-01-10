import { Fragment, useState, useEffect, createContext, Suspense, useRef } from 'react';
import { Dialog, Menu } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import {
    Bars3BottomLeftIcon,
    CogIcon,
    HomeIcon,
    WrenchScrewdriverIcon,
    FilmIcon,
    RectangleStackIcon,
    Squares2X2Icon,
    UserGroupIcon,
    XMarkIcon,
    ServerStackIcon,
    MegaphoneIcon,
} from '@heroicons/react/24/outline';
import { Popover, Transition } from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const SideBarNarrow = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const currentPath = window.location.pathname; // Get the current path

    const sidebarNavigation = [
        { name: 'Home', href: '/dashboard', icon: HomeIcon },
        { name: 'Database', href: '/dashboard/userdb', icon: ServerStackIcon },
        { name: 'Marketing', href: '#', icon: MegaphoneIcon },
        { name: 'Bloggers', href: '#', icon: UserGroupIcon },
        { name: 'Tools', href: '#', icon: WrenchScrewdriverIcon },
        { name: 'Resources', href: '#', icon: RectangleStackIcon },
        { name: 'Profile', href: '/profile', icon: CogIcon },
    ].map(item => ({
        ...item,
        current: item.href === currentPath,
    }));


    return (
        <div>
            {/* Narrow sidebar */}
            <div>
                <div className="hidden w-28 overflow-y-auto border border-l-0 border-gray-200 md:block">
                    <div className="flex w-full flex-col py-6">
                        <div className="mt-6 w-full flex-1 space-y-1 px-2">
                            {sidebarNavigation.map((item) => (
                                <a key={item.name} href={item.href} className={classNames(
                                    item.current ? 'bg-[#2D3250] text-white' : 'text-[#424769] hover:bg-[#7077A1] hover:text-white',
                                    'group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium'
                                )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    <item.icon className={classNames(
                                        item.current ? 'text-white' : 'text-[#232D3F] group-hover:text-white',
                                        'h-6 w-6'
                                    )} aria-hidden="true" />
                                    <span className="mt-2">{item.name}</span>
                                </a>
                            ))}

                        </div>
                    </div>
                </div>


                {/* Mobile menu */}
                <Transition.Root show={mobileMenuOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-20 md:hidden" onClose={setMobileMenuOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-slate-700 pb-4 pt-5">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute right-0 top-1 -mr-14 p-1">
                                            <button
                                                type="button"
                                                className="flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                <span className="sr-only">Close sidebar</span>
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="mt-5 h-0 flex-1 overflow-y-auto px-2">
                                        <nav className="flex h-full flex-col">
                                            <div className="space-y-1">
                                                {sidebarNavigation.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-slate-800 text-white'
                                                                : 'text-slate-100 hover:bg-slate-800 hover:text-white',
                                                            'group flex items-center rounded-md py-2 px-3 text-sm font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        <item.icon
                                                            className={classNames(
                                                                item.current ? 'text-white' : 'text-slate-300 group-hover:text-white',
                                                                'mr-3 h-6 w-6'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        <span>{item.name}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            <div className="w-14 flex-shrink-0" aria-hidden="true">
                                {/* Dummy element to force sidebar to shrink to fit close icon */}
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
        </div>
    )
}

export default SideBarNarrow