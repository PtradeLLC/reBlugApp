import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import Script from "next/script";
import Image from "next/image";

export default function Email() {
  const [show, setShow] = useState(true);
  const [conversation, setConversation] = useState("");
  const [displayConversation, setDisplayConversation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    setDisplayConversation(true);
  };

  const handleChange = (e) => {
    setConversation(e.target.value);
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-2/3 m-10 min-h-fit overflow-hidden py-24 sm:py-32 ">
      {/* Email body */}
      <div id="content" className="col-span-2">
        {/* Content of the email is shown here */}
        <p>Email message</p>
      </div>
      {/* Chatbot template */}
      <div
        id="chatbot"
        aria-live="assertive"
        className="pointer-events-none overflow-hidden py-24 sm:py-32 h-fit fixed inset-0 flex items-end px-4 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-2">
                <div className="bg-gray-100 w-full h-12 rounded m-auto flex justify-center items-center">
                  {/* Logo  */}
                  <Image
                    src="/images/OtherVar.png"
                    width={40}
                    height={40}
                    className="mx-2"
                  />
                  Your Agent
                </div>
                <div className="flex items-start flex-col">
                  <div className="flex-shrink-0 pt-0.5 w-full">
                    {/* Profile Image  */}
                    <img
                      className="w-full block"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                      alt="product-image"
                    />
                  </div>
                  <div className="ml-3 w-full mt-7 flex-1">
                    {!conversation ? (
                      <p className="text-sm font-medium text-gray-900">
                        Emilia Gates
                      </p>
                    ) : (
                      displayConversation && (
                        <div className="bg-slate-300 w-10/12 rounded h-6 m-auto">
                          <p>{conversation}</p>
                        </div>
                      )
                    )}
                    <div>
                      <form onSubmit={handleSubmit}>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              type="text"
                              name="username"
                              id="username"
                              value={conversation}
                              onChange={handleChange}
                              autoComplete="username"
                              className="block flex-1 border-0 bg-transparent px-2 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="Start a conversation"
                            />
                          </div>
                          <div className="mt-4 flex">
                            <button
                              type="button"
                              onClick={handleClick}
                              className="inline-flex items-center rounded-md bg-slate-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                            >
                              Ask me Anything
                            </button>
                            <button
                              type="button"
                              className="ml-3 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <Script src="https://cdn.tailwindcss.com" />
    </div>
  );
}
