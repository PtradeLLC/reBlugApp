import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EmailConvTool({ openModal, setOpenModal }) {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");
  const [beforeClick, setBeforeClick] = useState(
    "Complete the form field low"
  );
  const initialEmailForm = {
    email: "",
    firstName: "",
    lastName: "",
    brand_url: "https://forgedmart.com/",
    logo: "/images/Marttwainxyz.png",
    input: "",
  };

  const [emailForm, setEmailForm] = useState(initialEmailForm);
  const [isClicked, setIsClicked] = useState(false);
  const [beforeButton, setBeforeButton] = useState("Click to Send");
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);

  const url = "/api/webhooks/aiMessage";

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setEmailForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true);

    if (emailForm.email === "") {
      setIsEmailEmpty(true);
      setBeforeClick("Fill out and submit the form below");
      return;
    }

    try {
      const { email, firstName, input, brand_url, logo, lastName } =
        emailForm;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          brand_url,
          logo,
          input,
        }),
      });

      const data = await response.json(); // Parse the response as JSON
    } catch (error) {
      console.error(error);
      setError(
        "An error occurred while sending the email. Please try again or contact us for support."
      );
    }
  };

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
                          Email Email ChatBot
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                            onClick={handleClose}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Main */}
                    <div id="review" className="divide-y divide-gray-200">
                      <div className="pb-6">
                        <div className="h-24 mb-3 bg-red-700 sm:h-20 lg:h-28" />
                        <div className="-mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6 lg:-mt-16">
                          <div>
                            <div className="-m-1 flex rounded">
                              <Image
                                className="h-24 w-24 bg-white flex-shrink-0 sm:h-40 sm:w-40 lg:h-48 rounded lg:w-48 border"
                                src={
                                  selectedImage
                                    ? URL.createObjectURL(selectedImage)
                                    : "/images/OtherVar.png"
                                }
                                alt="product image"
                                width={200}
                                height={200}
                              />
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
                                <span
                                  className={`ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full ${emailForm.email
                                    ? "bg-green-400"
                                    : "bg-red-400"
                                    }`}
                                >
                                  <span className="sr-only">Online</span>
                                </span>
                              </div>
                              <p className="text-sm text-gray-500">
                                This simulates a message sent from a brand(ForgedMart) to a recipient(you)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="inline-block w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform  
 bg-white shadow-xl rounded-xl"
                      >
                        <form onSubmit={handleSubmit}>
                          <div className="space-y-6">
                            <div className="space-y-6">
                              <div className="space-y-2">
                                <label
                                  htmlFor="email"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  Email
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  disabled={isClicked}
                                  placeholder="Enter your email"
                                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  
 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                  value={emailForm.email}
                                  onChange={handleChange}
                                />
                                {isEmailEmpty &&
                                  !emailForm.email &&
                                  isClicked && (
                                    <p className="text-red-500 text-xs mt-1">
                                      Please enter your email address
                                    </p>
                                  )}
                              </div>
                              <div className="space-y-2">
                                <label
                                  htmlFor="firstName"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  name="firstName"
                                  id="firstName"
                                  disabled={isClicked}
                                  placeholder="Enter your first name"
                                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                  value={emailForm.firstName}
                                  onChange={handleChange}
                                />
                                {isEmailEmpty &&
                                  !emailForm.firstName &&
                                  isClicked && (
                                    <p className="text-red-500 text-xs mt-1">
                                      Please enter your first name
                                    </p>
                                  )}
                              </div>
                              <div className="space-y-2">
                                <label
                                  htmlFor="lastName"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  Last Name
                                </label>
                                <input
                                  type="text"
                                  name="lastName"
                                  id="lastName"
                                  disabled={isClicked}
                                  placeholder="Enter your last name"
                                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  
 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                  value={emailForm.lastName}
                                  onChange={handleChange}
                                />
                                {isEmailEmpty &&
                                  !emailForm.lastName &&
                                  isClicked && (
                                    <p className="text-red-500 text-xs mt-1">
                                      Please enter your last name
                                    </p>
                                  )}
                              </div>
                              <div className="space-y-2">
                                <label
                                  htmlFor="input"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  Enter a question
                                </label>
                                <input
                                  type="text"
                                  name="input"
                                  id="input"
                                  disabled={isClicked}
                                  placeholder="Enter a question"
                                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  
 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                  value={emailForm.input}
                                  onChange={handleChange}
                                />
                                {isEmailEmpty &&
                                  !emailForm.input &&
                                  isClicked && (
                                    <p className="text-red-500 text-xs mt-1">
                                      Enter any question for our tool
                                    </p>
                                  )}
                              </div>

                              <div className="mt-5 flex w-[200px] m-auto flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">
                                <button
                                  id="send"
                                  type="submit"
                                  className="inline-flex flex-shrink-0 items-center justify-center rounded-md bg-red-600 px-3 py-2  
 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2                           
 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:flex-1"
                                >
                                  {error ? (
                                    <p>{error}</p>
                                  ) : (
                                    <p>{beforeButton}</p>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
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
