import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import EmailCamp from "./EmailCampaign";
import Report from "./Report_one";
import EmailForm from "./EmailConvoForm";
import Link from "next/link";
import { useSession } from "next-auth/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

//MODAL
export default function DashConvTool({ openModal, setOpenModal }) {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState("");
    const [beforeClick, setBeforeClick] = useState("Start your Campaign");
    const [isClicked, setIsClicked] = useState(false);
    const [beforeButton, setBeforeButton] = useState("Click to Send");
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectedButton, setSelectedButton] = useState(false);
    const { data: session, status } = useSession();


    const initialEmailForm = {
        email: "",
        firstName: "",
        lastName: "",
        brand_url: "https://reblug.com/",
        logo: `${"/images/Marttwainxyz.png" || user?.image}`,
        input: "",
    };
    const [emailForm, setEmailForm] = useState(initialEmailForm);

    const url = "/api/webhooks/aiMessage";

    const handleClose = () => {
        setOpenModal(false);
    };

    // const handleChange = (e) => {
    //     e.preventDefault();
    //     const { name, value } = e.target;

    //     setEmailForm((prevState) => ({
    //         ...prevState,
    //         [name]: value,
    //     }));
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setIsClicked(true);

    //     if (emailForm.email === "") {
    //         setIsEmailEmpty(true);
    //         setBeforeClick("Fill out and submit the form below");
    //         return;
    //     }

    //     try {
    //         const { email, firstName, input, brand_url, logo, lastName } =
    //             emailForm;

    //         const response = await fetch(url, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 email,
    //                 firstName,
    //                 lastName,
    //                 brand_url,
    //                 logo,
    //                 input,
    //             }),
    //         });

    //         const data = await response.json(); // Parse the response as JSON
    //     } catch (error) {
    //         console.error(error);
    //         setError(
    //             "An error occurred while sending the email. Please try again or contact us for support."
    //         );
    //     }
    // };


    // const handleButtonClick = (button) => {
    //     setSelectedButton(button);
    //     setEmail(false);
    //     setSurvey(false);
    //     setNewsletter(false);

    //     if (button === "email") {
    //         console.log("email was clicked");
    //         setEmail(true);
    //     } else if (button === "survey") {
    //         console.log("survey was clicked");
    //         setSurvey(true);
    //     } else if (button === "newsletter") {
    //         console.log("newsletter was clicked");
    //         setNewsletter(true);
    //     }
    // };

    return (
        <Transition.Root show={openModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                    {/* Add a title here later */}
                                                </Dialog.Title>
                                                <span className="close font-medium h-4 w-4 text-lg cursor-pointer" onClick={handleClose}>
                                                    &times;
                                                </span>
                                            </div>
                                        </div>
                                        {/* Main */}
                                        <div id="review" className="divide-y divide-gray-200">
                                            <div className="pb-6">
                                                <div className="h-24 mb-3 bg-[#F5F7F8] sm:h-20 lg:h-28" />
                                                <div className="-mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6 lg:-mt-16">
                                                    <div>
                                                        <div className="m-2 flex flex-col rounded">
                                                            <img
                                                                className="h-24 force-small w-24 bg-white flex-shrink-0 sm:h-40 sm:w-40 lg:h-36 rounded lg:w-36 border"
                                                                src={session?.user?.image || "/images/Marttwainxyz.png"}
                                                                alt="logo"
                                                                width={200}
                                                                height={200}
                                                            />
                                                            <Link href="/profile/#brandCompany">
                                                                <span className="text-sm">Edit Logo</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="mt-6 sm:ml-6 sm:flex-1">
                                                        <div>
                                                            <div className="flex items-center">
                                                                <h3
                                                                    id="messageTitle"
                                                                    className="text-xl font-bold text-gray-900 sm:text-2xl"
                                                                >
                                                                    {beforeClick}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="inline-block w-full p-6 my-2 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                                                <EmailCamp openModal={openModal} setOpenModal={setOpenModal} />
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
    );
}
