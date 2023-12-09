import React, { useState, useRef, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const WelcomeModal = ({ setOpenModal, verifiedUser }) => {
    const [open, setOpen] = useState(true);
    const cancelButtonRef = useRef(null);
    const { data: session } = useSession();
    const router = useRouter();
    const user = session.user;
    const name = user.name;
    const email = user.email;

    const handleClick = async () => {
        const baseUrl = '/api/auth/authVerificationset';
        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            });

            const data = await response.json();
            if (data.message === 'success') {
                setOpen(false);
            } else {
                console.error('There was an error:', JSON.stringify(data, null, 2));
            }

        } catch (error) {
            console.error('Fetch failed:', error);
        }
    };

    return (
        <Transition.Root show={open} as={React.Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto bg-slate-500 bg-opacity-75"
                initialFocus={cancelButtonRef}
                onClose={() => {
                    setOpenModal(false);
                }}
            >
                <div className="fixed bg-opacity-75 inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                                        <Image
                                            src={"/images/Marttwainxyz.png"}
                                            alt="logo"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            Welcome to ForgedMart {name}
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                We are exited to see you here. Please verify your
                                                account by entering your email address, and paste the
                                                verification code that was included in your welcome email.
                                            </p>
                                            <button onClick={handleClick} type="button" className="text-white mt-2 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Proceed to Dashboard</button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
};

export default WelcomeModal;



