import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function WelcomeModal({ setOpenModal }) {
    const [open, setOpen] = useState(true)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10"
                onClose={() => {
                    setOpenModal(false);
                }}
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
                                                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
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
                                            <div className="pb-1 sm:pb-6">
                                                <div>
                                                    <div className="relative h-40 sm:h-56">
                                                        <img
                                                            className="absolute h-full w-full object-cover"
                                                            src="https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=600&q=80"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                                                        <div className="sm:flex-1">
                                                            <div>
                                                                <div className="flex items-center">
                                                                    <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">Ashley Porter</h3>
                                                                    <span className="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                                                                        <span className="sr-only">Online</span>
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm text-gray-500">@ashleyporter</p>
                                                            </div>
                                                            <div className="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                                                                >
                                                                    Message
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                                >
                                                                    Call
                                                                </button>
                                                                <div className="ml-3 inline-flex sm:ml-0">
                                                                    <Menu as="div" className="relative inline-block text-left">
                                                                        <Menu.Button className="relative inline-flex items-center rounded-md bg-white p-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                                            <span className="absolute -inset-1" />
                                                                            <span className="sr-only">Open options menu</span>
                                                                            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                                                        </Menu.Button>
                                                                        <Transition
                                                                            as={Fragment}
                                                                            enter="transition ease-out duration-100"
                                                                            enterFrom="transform opacity-0 scale-95"
                                                                            enterTo="transform opacity-100 scale-100"
                                                                            leave="transition ease-in duration-75"
                                                                            leaveFrom="transform opacity-100 scale-100"
                                                                            leaveTo="transform opacity-0 scale-95"
                                                                        >
                                                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                                <div className="py-1">
                                                                                    <Menu.Item>
                                                                                        {({ active }) => (
                                                                                            <a
                                                                                                href="#"
                                                                                                className={classNames(
                                                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                                    'block px-4 py-2 text-sm'
                                                                                                )}
                                                                                            >
                                                                                                View profile
                                                                                            </a>
                                                                                        )}
                                                                                    </Menu.Item>
                                                                                    <Menu.Item>
                                                                                        {({ active }) => (
                                                                                            <a
                                                                                                href="#"
                                                                                                className={classNames(
                                                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                                    'block px-4 py-2 text-sm'
                                                                                                )}
                                                                                            >
                                                                                                Copy profile link
                                                                                            </a>
                                                                                        )}
                                                                                    </Menu.Item>
                                                                                </div>
                                                                            </Menu.Items>
                                                                        </Transition>
                                                                    </Menu>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-4 pb-5 pt-5 sm:px-0 sm:pt-0">
                                                <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Bio</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                            <p>
                                                                Enim feugiat ut ipsum, neque ut. Tristique mi id elementum praesent. Gravida in tempus
                                                                feugiat netus enim aliquet a, quam scelerisque. Dictumst in convallis nec in bibendum
                                                                aenean arcu.
                                                            </p>
                                                        </dd>
                                                    </div>
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Location</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">New York, NY, USA</dd>
                                                    </div>
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Website</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">ashleyporter.com</dd>
                                                    </div>
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Birthday</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                            <time dateTime="1988-06-23">June 23, 1988</time>
                                                        </dd>
                                                    </div>
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



// import React, { useState, useRef, useEffect, Fragment } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import Image from "next/image";
// import { useRouter } from 'next/router';
// import { useSession } from 'next-auth/react';
// import Link from 'next/link';

// const WelcomeModal = ({ setOpenModal, verifiedUser }) => {
//     const [open, setOpen] = useState(true);
//     const cancelButtonRef = useRef(null);
//     const { data: session } = useSession();
//     const user = session.user;
//     const name = user.name;
//     const email = user.email;
//     const question = 'What is the percentage of email marketing open and click rates for non-profit and for profit organizations based on data?';
//     const first_word = name.split(' ')[0];
//     const [verifyUser, setVerifyUser] = useState();

//     const handleClick = async () => {
//         const baseUrl = '/api/auth/authVerificationset';
//         try {
//             const response = await fetch(baseUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: email, question: question })
//             });

//             const data = await response.json();

//             if (data.message === 'User is verified') {
//                 setOpen(false);
//                 setVerifyUser(data.user.isVerified);
//             } else {
//                 console.error('There was an error:', JSON.stringify(data, null, 2));
//             }
//         } catch (error) {
//             console.error('Fetch failed:', error);
//         }
//     };

//     return (
//         <Transition.Root show={open} as={React.Fragment}>
//             <Dialog
//                 as="div"
//                 className="fixed inset-0 z-10 overflow-y-auto bg-slate-500 bg-opacity-75"
//                 initialFocus={cancelButtonRef}
//                 onClose={() => {
//                     setOpenModal(false);
//                 }}
//             >
//                 <div className="fixed bg-opacity-75 inset-0 z-10 overflow-y-auto">
//                     <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                         <Transition.Child
//                             as={Fragment}
//                             enter="ease-out duration-300"
//                             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                             enterTo="opacity-100 translate-y-0 sm:scale-100"
//                             leave="ease-in duration-200"
//                             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                         >
//                             <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
//                                 <div>
//                                     <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
//                                         <Image
//                                             src={"/images/Marttwainxyz.png"}
//                                             alt="logo"
//                                             width={50}
//                                             height={50}
//                                         />
//                                     </div>
//                                     <div className="mt-3 text-center sm:mt-5">
//                                         <Dialog.Title
//                                             as="h3"
//                                             className="text-base flex justify-start text-left font-semibold leading-6 text-gray-700"
//                                         >
//                                             {first_word}, did you know the average email open rates is this low?
//                                         </Dialog.Title>
//                                         <div className="mt-2">
//                                             <ul className="list-disc">
//                                                 {<>
//                                                     <li className="text-sm flex justify-start text-left text-gray-500">Non-Profit:<br />
//                                                         Open Rate: Average open rate is 28.59%, significantly higher than for-profit organizations.<br />
//                                                         Click Rate: Average click rate is 3.29%.<br /><br /></li>
//                                                     <li className="text-sm flex justify-start text-left text-gray-500">
//                                                         For-Profit:<br />
//                                                         Open Rate: Average open rate varies depending on industry, but generally falls between 21% and 21.5%.<br />
//                                                         Click Rate: Average click rate across all industries is around 2.4%.
//                                                     </li>
//                                                 </>
//                                                 }
//                                             </ul>
//                                             <span className="text-sm my-2 flex justify-start text-left text-gray-500">
//                                                 <p>Sources:</p>
//                                                 <Link className="mx-1" href="https://neonone.com/resources/nonprofit-email-report/" target="_blank">Neon One |</Link>
//                                                 <Link className="mx-1" href="https://www.campaignmonitor.com/resources/guides/email-marketing-benchmarks/" target="_blank">Campaign Monitor |</Link>
//                                                 <Link className="mx-1" href="https://mailchimp.com/resources/email-marketing-benchmarks/" target="_blank">Mailchimp</Link>
//                                             </span>
//                                             <p className="text-sm mt-1 mb-2 flex justify-start text-left text-gray-900">We aim to improve these statistics and transform email into an effective communication tool.</p>
//                                             <button onClick={handleClick} type="button" className="text-white mt-3 bg-gradient-to-br from-pink-500 to-orange-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Proceed to Dashboard to see how</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Dialog.Panel>
//                         </Transition.Child>
//                     </div>
//                 </div>
//             </Dialog>
//         </Transition.Root>
//     )
// };
// export default WelcomeModal;



