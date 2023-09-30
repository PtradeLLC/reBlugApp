import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { EnvelopeIcon } from '@heroicons/react/20/solid';
import { useResetPassword } from '@nhost/nextjs';
import Loading from './Loading';



//Modal
export default function PasswordReset({ open, setOpen }) {
    const [email, setEmail] = useState("");
    const { resetPassword, isLoading, isSent, isError, error } = useResetPassword();
    const [sentMessage, setSentMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "email") {
            setEmail(value);
        }
    };

    const resetPass = async (e) => {
        e.preventDefault();

        try {
            await resetPassword(email, {
                redirectTo: '/profile#current-password'
            });
            if (isSent) {
                setEmail("");
                setSentMessage("Please check your email");
                setOpen(false);
            } else if (isError) {
                console.log(error);
                setSentMessage(error);
            } else {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Enter your Email
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={handleChange}
                                        value={email}
                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                        placeholder="you@youremail.com"
                                    />
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                        onClick={resetPass}
                                    >
                                        {isLoading ? <Loading size="sm" /> : isSent ? "Close" : "Submit"}
                                    </button>
                                    {sentMessage}
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
