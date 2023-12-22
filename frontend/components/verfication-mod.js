import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Loading from "./Loading";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { recapEventState } from '../atoms/recapState';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function WelcomeModal({ setOpenModal, recentUpdates, email, firstName, lastName, managerRole, image, session }) {
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [recap, setRecap] = useRecoilState(recapEventState);

    // Example function that adds recap
    const addRecap = () => {
        setRecap((prev) => [...prev, `someRecapContent`])
    }

    const closeModal = () => {
        setOpenModal(false);
    };

    // Check if there are any events in the recap array
    if (recap.length === 0) {
        return <p>You haeve no recent summary</p>;
    }

    return (
        <Transition.Root show={open} as={Fragment}>

            <Dialog as="div" className="relative z-10"
                onClose={closeModal}
            >
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <h2 id="slide-over-heading" className="text-base font-semibold leading-6 text-gray-900">
                                                    Profile
                                                </h2>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-red-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="absolute -inset-2.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Main */}
                                        <div>
                                            <div className="pb-1  sm:pb-6">
                                                <div>
                                                    <span className='bg-[#ECFCFF] flex py-2 flex-col justify-center items-center'>
                                                        <div className="relative  w-[200px] h-[200px]">
                                                            {loading ? <Loading /> : <img
                                                                className="absolute h-full w-full border ring-2 ring-gray-300 dark:ring-gray-500 rounded-full object-cover"
                                                                src={session.user?.image || image || "/images/brand.png"}
                                                                alt="profile image"
                                                            />}
                                                        </div>
                                                    </span>
                                                    <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                                                        <div className="sm:flex-1">
                                                            <div>
                                                                <div className="flex items-center">
                                                                    <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{firstName}{' '}{lastName}</h3>
                                                                    <span className="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                                                                        <span className="sr-only">Online</span>
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm text-gray-500">{managerRole}</p>
                                                            </div>
                                                            <div className="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">
                                                                <Link href={"/profile"} type="button" className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:flex-1">
                                                                    Update Profile
                                                                </Link>
                                                                <button type="button" onClick={() => setOpen(false)}
                                                                    className="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                                >
                                                                    Go to Dashboard
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-4 pb-5 pt-5 sm:px-0 sm:pt-0">
                                                <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 font-bold sm:flex-shrink-0">Since your last visit</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                            {/* {recap.map((event, index) => (
                                                                <div key={index}>
                                                                    <h2>Event Name: {event.eventName}</h2>
                                                                    <p>Event Description: {event.eventDesc}</p>
                                                                </div>
                                                            ))} */}
                                                        </dd>
                                                    </div>
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Campaign History</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                            {history ?
                                                                <p className="font-semibold">
                                                                    History
                                                                </p> : "You have no recent history"
                                                            }
                                                        </dd>
                                                    </div>
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">My Number</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                            {phoneNumber ?
                                                                <p className="font-semibold">
                                                                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16.344 12.168-1.4-1.4a1.98 1.98 0 0 0-2.8 0l-.7.7a1.98 1.98 0 0 1-2.8 0l-2.1-2.1a1.98 1.98 0 0 1 0-2.8l.7-.7a1.981 1.981 0 0 0 0-2.8l-1.4-1.4a1.828 1.828 0 0 0-2.8 0C-.638 5.323 1.1 9.542 4.78 13.22c3.68 3.678 7.9 5.418 11.564 1.752a1.828 1.828 0 0 0 0-2.804Z" />
                                                                    </svg>
                                                                    Number
                                                                </p> :
                                                                <>
                                                                    <span className='flex'>
                                                                        <svg class="w-[15px] h-[15px] mx-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16.344 12.168-1.4-1.4a1.98 1.98 0 0 0-2.8 0l-.7.7a1.98 1.98 0 0 1-2.8 0l-2.1-2.1a1.98 1.98 0 0 1 0-2.8l.7-.7a1.981 1.981 0 0 0 0-2.8l-1.4-1.4a1.828 1.828 0 0 0-2.8 0C-.638 5.323 1.1 9.542 4.78 13.22c3.68 3.678 7.9 5.418 11.564 1.752a1.828 1.828 0 0 0 0-2.804Z" />
                                                                        </svg>
                                                                        <p>You have no number</p>
                                                                    </span>
                                                                    <button type="button" class="text-gray-900 mx-1 mt-1 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 me-2 mb-2">

                                                                        Claim your number now
                                                                    </button>
                                                                </>
                                                            }
                                                        </dd>
                                                    </div>
                                                    {/* <div>
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Birthday</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                            <time dateTime="1988-06-23">June 23, 1988</time>
                                                        </dd>
                                                    </div> */}
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
