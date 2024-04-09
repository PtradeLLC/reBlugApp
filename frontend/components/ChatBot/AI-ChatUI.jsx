import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { CircularProgress } from "@nextui-org/react";

const ChatUI = ({ isOpen, setIsOpen, postContent }) => {
  const [modalPlacement, setModalPlacement] = useState("auto");
  const [inputValue, setInputValue] = useState("");
  const [modelResponse, setModelResponse] = useState("");
  const [value, setValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [sentInput, setSentInput] = useState("");
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [inquiries, setInquiries] = useState({
    authorsGroup: "How can I join author's group",
    productSubmission:
      "How can I submit my product to be included in future article",
  });
  //Handles setting value for the loader
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const sendDataToBackend = () => {
    const userName = session.user.name;

    try {
      setLoading(true);

      fetch("/api/blog/slugPage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: inputValue,
          postContent: postContent,
          userName: userName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setInputValue("");
          setSentInput(inputValue);
          setModelResponse(data.message);
          setLoading(false);
        })
        .catch((error) => {
          console.error(
            "There was a problem sending data to the backend:",
            error
          );
        });
    } catch (error) {
      console.console.log(error);
    }
  };

  const handleClick = (buttonType) => {
    setLoading(false);
    let requestData = {};
    if (buttonType === "authorsGroup") {
      requestData = { group: inquiries.authorsGroup };
    } else if (buttonType === "productSubmission") {
      requestData = { submission: inquiries.productSubmission };
    }
    fetch("/api/blog/questionAI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setModelResponse(data.text);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          `There was a problem sending data to the backend: ${error}`,
          error
        );
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTextAreaClick = () => {
    setShowModal(true);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    sendDataToBackend();
  };

  const handleSignUp = () => {
    if (!session) {
      router.push("/register");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal
        placement={modalPlacement}
        scrollBehavior={scrollBehavior}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="m-auto"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Article Assistant
              </ModalHeader>
              <ModalBody>
                <div>
                  <div>
                    <div className="flex w-full flex-col">
                      <div className="flex-1 overflow-y-auto rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 dark:bg-slate-800 dark:text-slate-300 sm:text-base sm:leading-7">
                        {loading ? (
                          <CircularProgress
                            aria-label="Loading..."
                            size="sm"
                            value={value}
                            color="warning"
                            className="mx-2"
                            showValueLabel={true}
                          />
                        ) : (
                          <>
                            {sentInput && (
                              <div className="flex flex-row px-2 py-4 sm:px-4">
                                <img
                                  className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                                  src="/images/useravatar.png"
                                  alt="User Avatar"
                                />
                                <div className="flex px-2 max-w-3xl items-center">
                                  <p>{sentInput}</p>
                                </div>
                              </div>
                            )}
                          </>
                        )}

                        <div className="mb-2 flex w-full flex-row justify-end gap-x-2 text-slate-500">
                          <button className="hover:text-slate-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              ></path>
                              <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
                            </svg>
                          </button>
                          <button
                            className="hover:text-slate-600"
                            type="button"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              ></path>
                              <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"></path>
                            </svg>
                          </button>
                          <button
                            className="hover:text-slate-600"
                            type="button"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              ></path>
                              <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
                              <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
                            </svg>
                          </button>
                        </div>
                        <div className="mb-4 flex rounded-xl bg-slate-50 px-2 py-6 dark:bg-slate-900 sm:px-4">
                          <img
                            className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                            src="/images/OtherVar.png"
                            alt="Guide Avatar"
                          />

                          {loading ? (
                            <div className="flex justify-center">
                              <CircularProgress
                                aria-label="Loading..."
                                size="lg"
                                value={value}
                                color="warning"
                                className="mx-2"
                                showValueLabel={true}
                              />
                            </div>
                          ) : (
                            <div className="flex px-2 max-w-3xl items-center rounded-xl">
                              <p>
                                {modelResponse
                                  ? modelResponse
                                  : "Ask questions or conduct your own research on this article."}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 flex w-full gap-x-2 overflow-x-auto whitespace-nowrap text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
                        <button
                          onClick={() => handleClick("authorsGroup")}
                          className="flex item-center rounded-lg bg-slate-200 p-2 hover:bg-slate-600 hover:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-600 dark:hover:text-slate-50"
                        >
                          <svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeWidth="2"
                              d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3a2.5 2.5 0 1 1 2-4.5M19.5 17h.5c.6 0 1-.4 1-1a3 3 0 0 0-3-3h-1m0-3a2.5 2.5 0 1 0-2-4.5m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3c0 .6-.4 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                            />
                          </svg>
                          Join Author's group
                        </button>
                        <button
                          onClick={() => handleClick("productSubmission")}
                          className=" flex items-center rounded-lg bg-slate-200 p-2 hover:bg-slate-600 hover:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-600 dark:hover:text-slate-50"
                        >
                          <img
                            className="w-5 h-5 mr-1"
                            src="/images/productreview.png"
                          />
                          Product submission
                        </button>
                      </div>
                      <form onSubmit={handleSubmit} className="mt-2">
                        <label htmlFor="chat-input" className="sr-only">
                          Ask this article
                        </label>
                        <div className="relative">
                          <textarea
                            id="chat-input"
                            className="block w-full resize-none rounded-xl border-none bg-slate-200 p-4 pl-10 pr-20 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:ring-slate-500 sm:text-base"
                            placeholder="Ask this article a question"
                            rows="1"
                            value={inputValue}
                            onChange={handleChange}
                            onClick={handleTextAreaClick}
                            required
                          ></textarea>
                          <button
                            type="submit"
                            className="absolute bottom-2 right-2.5 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800 sm:text-base"
                          >
                            Send
                            {loading && (
                              <div className="flex justify-center">
                                <CircularProgress
                                  aria-label="Loading..."
                                  size="sm"
                                  value={value}
                                  color="warning"
                                  className="mx-2"
                                  showValueLabel={true}
                                />
                              </div>
                            )}
                            <span className="sr-only">Send message</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div>
                    {!session && showModal && (
                      <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                          >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                          </div>
                          <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                          >
                            &#8203;
                          </span>
                          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                  <img src="/images/Marttwainxyz.png" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                  <h3
                                    className="text-lg leading-6 font-medium text-gray-900"
                                    id="modal-title"
                                  >
                                    Please create an account or login to share
                                    your thoughts on this article
                                  </h3>
                                  <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                      If you don't have an account yet, you can{" "}
                                      <button
                                        onClick={handleSignUp}
                                        className="text-red-600 dark:text-red-500 hover:underline"
                                      >
                                        sign up here
                                      </button>
                                      .
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                              <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-700 text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={handleCloseModal}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <span className="text-xs font-thin text-gray-600">
                  Powered by <Link href="https://reblug.com/">reBlug</Link>
                </span>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatUI;
