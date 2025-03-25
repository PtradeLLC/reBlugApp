import React, { useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";

const JuniorProgram = ({ setOpenModal }) => {
    const [open, setOpen] = useState(true);
    const cancelButtonRef = useRef(null);
    const [formInput, setFormInput] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/waitingList", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: formInput }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            if (response.ok) {
                setFormInput("");
                setSuccess(true);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <Transition.Root show={open} as={React.Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={() => setOpenModal(false)} // Close the modal when the dialog is closed
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
                                            Soon to launch
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            {success ? (
                                                <p>Great! We will update you as soon as possible</p>
                                            ) : (
                                                <p className="text-sm text-gray-500">
                                                    Thanks for your interest. As we work hard to bring
                                                    these tools to you, please use this form to join our
                                                    waiting list while we race to deploy the tools. We
                                                    promise you'd be the first to try them.
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
                                            {!success ? (
                                                <input
                                                    id="email-address"
                                                    name="email"
                                                    type="email"
                                                    onChange={handleChange}
                                                    autoComplete="email"
                                                    value={formInput}
                                                    required
                                                    className="relative px-1 mt-4 block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                                    placeholder="Email address"
                                                />
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
    );
};

export default JuniorProgram;
