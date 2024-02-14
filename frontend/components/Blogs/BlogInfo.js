import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const SubmissionInfo = ({ isOpen, setIsOpen }) => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [submission, setSubmission] = useState({
        fullName: '',
        website: '',
        email: '',
        description: ''
    });
    const { data: session } = useSession();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubmission(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (session) {
            let user = session.user;
            const { email: userEmail, name: firstName } = user;

            const dataToSend = {
                submission: submission,
                userEmail: userEmail,
                firstName: firstName,
            };

            fetch("/api/email/submissionInquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            })
                .then((response) => {
                    if (response.ok) {
                        // Reset the form
                        setSubmission({
                            fullName: '',
                            website: '',
                            email: '',
                            description: ''
                        });
                        // Display success message to the user
                        setSuccessMessage("Submission successful!");
                    } else {
                        throw new Error('Failed to submit form');
                    }
                })
                .catch((error) => {
                    console.error("There was a problem sending data to the backend:", error);
                    // Handle error
                });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                if (successMessage) {
                    setIsOpen(false);
                }
            }}
            className="m-auto"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    Submit your product
                </ModalHeader>
                <ModalBody className="overflow-y-auto max-h-[400px]">

                    <div>
                        {successMessage ? (
                            <p>Great! The author will contact you if there is a fit.
                                Thanks for considering working with this author
                            </p>
                        ) : (
                            <div>
                                <p>
                                    Please use the form below to submit your product or services for review by the author for potential inclusion
                                    in upcoming articles. Kindly note that this is a sponsored inquiry. If your
                                    product aligns with the author's current or future projects and is under consideration,
                                    the author will reach out to you to discuss their review process and next steps.
                                </p>
                                {/* <p className="my-3 text-black font-thin text-sm">
                            Click here to see sample of a sponsored article.
                        </p> */}
                                <form onSubmit={handleSubmit} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 flex flex-col">
                                    <div className="px-4 py-6 sm:p-8">
                                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
                                            <div className="sm:col-span-5">
                                                <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Full name
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="fullName"
                                                        id="fullName"
                                                        onChange={handleChange}
                                                        value={submission.fullName}
                                                        autoComplete="given-name"
                                                        placeholder="Enter your full name"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-5">
                                                <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Website
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="website"
                                                        id="website"
                                                        onChange={handleChange}
                                                        value={submission.website}
                                                        placeholder="Enter product page"
                                                        autoComplete="website"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-5">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Email address
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        value={submission.email}
                                                        onChange={handleChange}
                                                        type="email"
                                                        placeholder="Enter your Email"
                                                        autoComplete="email"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-5">
                                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Product / Service Description
                                                </label>
                                                <div className="mt-2 w-full sm:mt-0">
                                                    <textarea
                                                        id="description"
                                                        name="description"
                                                        onChange={handleChange}
                                                        value={submission.description}
                                                        placeholder="Describe the product or service"
                                                        rows={4}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                                        <button onClick={(e) => setIsOpen(false)} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <span className="text-xs font-thin text-gray-600">
                        Powered by{" "}
                        <Link href="http://forgedmart.com/">ForgedMart</Link>
                    </span>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SubmissionInfo;
