import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Session_Email({ openModal, setOpenModal }) {
  const [open, setOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [emailForm, setEmailForm] = useState({
    email: "",
    recipients: "",
    subject: "",
    htmlContent: "",
    fileUpload: null,
    productDescription: "",
    productLink: "",
    imageUrl: `${selectedImage}`,
  });

  const url = "/api/email/test-email";

  // To Dos
  // On click:
  // Sends a request to Brevo 'contact' endpoint to create an email (prospect).
  //Then:
  // --> Triggers an email to be sent to prospect's email address:
  // ------->

  //modal ops
  const handleClose = () => {
    setOpenModal(false);
  };

  //Page form Inputs
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;

    setEmailForm((prevState) => ({
      ...prevState,
      [name]: name === "fileUpload" ? files[0] : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailForm),
      });
      const data = await response.json();
      console.log(data);

      // const response = await axios.post(url, emailForm);
      // const data = response.data;
      // console.log(data);

      //      Send email to user with the fetched data
      //     const testProspect = await axios.post(url, emailForm);
      //     const emailData = testProspect.data;
      //     console.log(emailData);

      //     You'll need to replace this with your actual email sending logic
      //     console.log(`Email sent to ${emailForm.email} with data: ${emailData}`);

      // const response = await axios.post(url, emailForm);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const { authenticated } = useClerk();

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
                          Email Conversational Tool
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-red-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
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
                                alt={"product image"}
                                width={200}
                                height={200}
                              />
                            </div>
                          </div>
                          <div className="mt-6 sm:ml-6 sm:flex-1">
                            <div>
                              <div className="flex items-center">
                                <h3 className="text-xl  font-bold text-gray-900 sm:text-2xl">
                                  {emailForm.productLink ||
                                    `Complete form below`}
                                </h3>
                                <span
                                  className={`ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full ${
                                    emailForm.email
                                      ? "bg-green-400"
                                      : "bg-red-400"
                                  }`}
                                >
                                  <span className="sr-only">Online</span>
                                </span>
                              </div>
                              <p className="text-sm text-gray-500">
                                {emailForm.email || `Enter your email to begin`}
                              </p>
                              {emailForm.fileUpload && (
                                <p className="text-sm">
                                  {emailForm.fileUpload.name}
                                </p>
                              )}
                            </div>
                            <div className="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">
                              <button
                                type="button"
                                onClick={handleSubmit}
                                className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:flex-1"
                              >
                                Click to Send
                              </button>
                              <button
                                type="button"
                                onClick={handleClose}
                                className="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="inline-block w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                        <form onSubmit={handleSubmit}>
                          <div className="space-y-6">
                            <div className="space-y-6">
                              <div className="space-y-2">
                                <label
                                  htmlFor="email"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  Enter your email
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  placeholder="Enter your email"
                                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                  required
                                  value={emailForm.email}
                                  onChange={handleChange}
                                />
                              </div>

                              <div className="space-y-2">
                                <label
                                  htmlFor="recipients"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  Recipients email
                                </label>
                                <input
                                  type="email"
                                  name="recipients"
                                  id="recipients"
                                  placeholder="Enter recipient's email.(Field has been disabled while testing as a recipient)"
                                  className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                  disabled={!authenticated}
                                  value={emailForm.recipients}
                                  onChange={handleChange}
                                />
                                <span className="text-xs">
                                  <Link href="#">
                                    or connect to upload multiple
                                  </Link>
                                </span>
                              </div>

                              <div className="space-y-2">
                                <label
                                  htmlFor="subject"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  Subject Line
                                </label>
                                <input
                                  type="text"
                                  name="subject"
                                  id="subject"
                                  placeholder="Enter subject.(Field has been disabled while testing as a recipient)"
                                  className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                  disabled={!authenticated}
                                  value={emailForm.subject}
                                  onChange={handleChange}
                                />
                              </div>

                              <div className="space-y-2">
                                <label
                                  htmlFor="fileUpload"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  Brand Document
                                  <span className="text-xs block">
                                    Info about your brand
                                  </span>
                                </label>
                                <div className="flex items-center space-x-2">
                                  <label
                                    htmlFor="fileUpload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2"
                                  >
                                    <span>Upload a file</span>

                                    <input
                                      id="fileUpload"
                                      name="fileUpload"
                                      type="file"
                                      disabled={!authenticated}
                                      accept=".txt,.pdf"
                                      className="sr-only"
                                      onChange={handleChange}
                                    />
                                  </label>
                                  <p className="text-xs">(.txt or .pdf):</p>
                                  {emailForm.fileUpload && (
                                    <p className="text-sm">
                                      {emailForm.fileUpload.name}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label
                                  htmlFor="emailBody"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  Enter email message
                                </label>
                                <textarea
                                  id="htmlContent"
                                  name="htmlContent"
                                  rows={3}
                                  className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                  disabled={!authenticated}
                                  value={emailForm.htmlContent}
                                  onChange={handleChange}
                                  placeholder="Type your message here.(Field has been disabled while testing as a recipient)"
                                />
                              </div>

                              <div className="space-y-2">
                                <h3 className="text-sm font-medium text-gray-900">
                                  Add product image here
                                </h3>
                                <div className="flex space-x-2">
                                  <img
                                    id="file-upload"
                                    name="imageUrl"
                                    className="inline-block w-32 h-32 rounded"
                                    src={
                                      selectedImage
                                        ? URL.createObjectURL(selectedImage)
                                        : "/images/OtherVar.png"
                                    }
                                    alt={"imageUploaded"}
                                  />
                                  <label
                                    htmlFor="upload"
                                    className="inline-flex w-32 h-32 flex-shrink-0 items-center justify-center rounded border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                  >
                                    <input
                                      type="file"
                                      id="upload"
                                      disabled={!authenticated}
                                      accept="image/*"
                                      className="hidden"
                                      onChange={handleImageChange}
                                    />
                                    <span>+</span>
                                    <span className="sr-only">
                                      Add product image
                                    </span>
                                  </label>
                                </div>
                                <div className="space-y-2">
                                  <label
                                    htmlFor="productDescription"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    Product description
                                  </label>
                                  <textarea
                                    id="productDescription"
                                    name="productDescription"
                                    rows={4}
                                    className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    disabled={!authenticated}
                                    value={emailForm.productDescription}
                                    onChange={handleChange}
                                    placeholder="Add product description here.(Field has been disabled while testing as a recipient)"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label
                                    htmlFor="productLink"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    Product URL
                                  </label>
                                  <input
                                    type="text"
                                    name="productLink"
                                    id="productLink"
                                    className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    disabled={!authenticated}
                                    value={emailForm.productLink}
                                    onChange={handleChange}
                                    placeholder="https://www.my-product.com/product. (Field has been disabled while testing as a recipient)"
                                  />
                                </div>
                              </div>
                              <div className="flex w-64 justify-center mx-auto mt-3 mb-3">
                                <Link
                                  className="inline-flex w-64 flex-shrink-0 items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:flex-1"
                                  href={"#review"}
                                >
                                  Review
                                </Link>
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
