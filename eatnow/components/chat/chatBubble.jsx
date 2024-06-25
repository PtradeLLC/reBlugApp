"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Link from "next/link";
import { CircularProgress } from "@nextui-org/react";

const ChatUI = ({ isOpen, setIsOpen }) => {
  const [modalPlacement, setModalPlacement] = useState("auto");
  const [inputValue, setInputValue] = useState("");
  const [modelResponse, setModelResponse] = useState("");
  const [value, setValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [sentInput, setSentInput] = useState("");
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const [loading, setLoading] = useState(false);

  //Handles setting value for the loader
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // const sendDataToBackend = async () => {
  //   try {
  //     setLoading(true);

  //     const response = await fetch("/api/blog/articleAssistant", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ content: inputValue }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setInputValue("");
  //     setSentInput(inputValue);
  //     console.log("DATA", data);
  //     setModelResponse(data.assistantResponse);
  //   } catch (error) {
  //     console.error("There was a problem sending data to the backend:", error);
  //     setModelResponse("An error occurred. Please try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTextAreaClick = () => {
    setShowModal(true);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Hello from Bloggers");
    // sendDataToBackend();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <div>
          <div className="flex w-full flex-col">
            <div className="flex-1 overflow-y-auto rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-400 dark:bg-slate-400 dark:text-slate-800 sm:text-base sm:leading-7">
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

              <div className="mb-2 flex w-full flex-row justify-end gap-x-2 text-slate-500"></div>
              <div className="mb-4 flex rounded-xl bg-slate-50 px-2 py-6 dark:bg-slate-100 sm:px-4">
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
                        : "Interact with your fans, followers within your niche using this block. I will do my best to engage them on your behalf to keep things interesting. Tip: Switch on 'Just Me' button to keep the chat between just you and me."}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-2">
              <label htmlFor="chat-input" className="sr-only">
                Chat with fans
              </label>
              <div className="relative">
                <textarea
                  id="chat-input"
                  className="block w-full resize-none rounded-md bg-slate-200 p-4 pl-10 pr-20 text-sm text-slate-900 focus:ring-slate-500 dark:bg-slate-50 dark:text-slate-900 dark:placeholder-slate-400 sm:text-base"
                  placeholder="Start chatting..."
                  rows="1"
                  value={inputValue}
                  onChange={handleChange}
                  onClick={handleTextAreaClick}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="absolute bottom-2 right-2.5 rounded-md bg-slate-50 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:bg-white dark:hover:bg-slate-50 dark:focus:ring-slate-300 sm:text-base"
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
      </div>
    </>
  );
};

export default ChatUI;
