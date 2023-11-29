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
    const [formInput, setFormInput] = useState({
        email: '',
        verification: '',
    });

    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (success === 'User is verified') {
            const redirectTimer = setTimeout(() => {
                router.push('/dashboard');
            }, 1000); // Redirect after 1 second

            return () => clearTimeout(redirectTimer); // Clear the timeout if the component unmounts
        }
    }, [success, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormInput((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/new-user-verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.accessToken}`,
                },
                body: JSON.stringify({ email: formInput.email, verification: formInput.verification, verifiedUser: false }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            console.log("resData", responseData);

            // Check for existingUser or unverifiedUser
            const existingUser = responseData.user;
            const verifiedUser = responseData.user;


            if (existingUser) {
                // User already verified, log them in
                setSuccess(existingUser.message);
                router.push(existingUser.redirect);
            } else if (verifiedUser) {
                // Update the user's verification status to true
                setSuccess(verifiedUser.message);
                router.push(verifiedUser.redirect);
            } else {
                setSuccess('Verification failed. Please try again.');
            }

        } catch (error) {
            setSuccess('An error occurred. Please try again.');
        }
    };

    return (
        <Transition.Root show={open} as={React.Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={() => setOpenModal(false)}
            >
                <div className="fixed inset-0 z-10 overflow-y-auto">
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
                                            Welcome to ForgedMart
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            {success ? (
                                                <p>Awesome! Enjoy ForgedMart </p>
                                            ) : (
                                                <p className="text-sm text-gray-500">
                                                    We are exited to see you here. Please verify your
                                                    account by entering your email address, and paste the
                                                    verification code that was included in your welcome email.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 m-auto sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-1 justify-center items-center w-4/5 sm:gap-3">
                                    <form onSubmit={handleSubmit}>
                                        <div className="">
                                            <label htmlFor="email-address" className="sr-only">
                                                Email address
                                            </label>
                                            <label htmlFor="verification" className="sr-only">
                                                Verification Code
                                            </label>
                                            {!success ? (
                                                <>
                                                    <input
                                                        id="email-address"
                                                        name="email"
                                                        type="email"
                                                        onChange={handleChange}
                                                        autoComplete="email"
                                                        value={formInput.email}
                                                        required
                                                        className="relative px-1 mt-4 block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                                        placeholder="Email address"
                                                    />
                                                    <input
                                                        id="verification"
                                                        name="verification"
                                                        type="text"
                                                        onChange={handleChange}
                                                        autoComplete="text"
                                                        value={formInput.verification}
                                                        required
                                                        className="relative px-1 mt-4 block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                                        placeholder="Enter code to verify"
                                                    />
                                                </>
                                            ) : null}
                                            <div className="flex mt-5">
                                                {!success ? (
                                                    <button
                                                        type="submit"
                                                        className="inline-flex mx-4 w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2"
                                                    >
                                                        Submit
                                                    </button>
                                                ) : null}
                                            </div>
                                        </div>
                                    </form>
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



