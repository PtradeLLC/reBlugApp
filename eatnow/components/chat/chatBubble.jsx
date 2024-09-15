"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CircularProgress,
} from "@nextui-org/react";
import Link from "next/link";

const ChatUI = ({ isOpen, setIsOpen }) => {
  const [inputValue, setInputValue] = useState("");
  const [modelResponse, setModelResponse] = useState("");
  const [sentInput, setSentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Handles the progress bar simulation
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgressValue((prev) => (prev >= 100 ? 0 : prev + 10));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTextAreaClick = () => {
    setShowModal(true);
  };

  // Function to simulate form submission and backend processing
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setSentInput(inputValue);

    // Simulate an API call
    setTimeout(() => {
      setModelResponse("Response from the model or backend");
      setLoading(false);
      setInputValue("");
    }, 2000);
  };

  const renderNiches = () => {
    const niches = [
      { nichesName: "Tech", num_messages: 10 },
      { nichesName: "Health", num_messages: 5 },
      { nichesName: "Tech", num_messages: 10 },
      { nichesName: "Health", num_messages: 5 },
      { nichesName: "Tech", num_messages: 10 },
      { nichesName: "Health", num_messages: 5 },
    ];

    return niches.map((niche) => (
      <button
        key={niche.nichesName}
        className="inline-flex items-center w-[125px] md:w-[180px] h-[50px] mx-2 my-1 px-5 py-3 text-sm font-medium text-white bg-slate-700 rounded-lg hover:bg-slate-800"
      >
        {niche.nichesName}
        <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full">
          {niche.num_messages}
        </span>
      </button>
    ));
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex-1 overflow-y-auto bg-slate-200 p-4 text-sm text-slate-400 rounded-xl dark:bg-slate-400 dark:text-slate-800">
          {loading ? (
            <CircularProgress
              aria-label="Loading..."
              size="sm"
              value={progressValue}
              color="warning"
              className="mx-2"
              showValueLabel={true}
            />
          ) : (
            sentInput && (
              <div className="flex flex-row px-2 py-4 sm:px-4">
                <img
                  className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300"
                  src="/images/useravatar.png"
                  alt="User Avatar"
                />
                <div className="px-2 max-w-3xl items-center">
                  <p>{sentInput}</p>
                </div>
              </div>
            )
          )}

          <div className="mb-4 flex rounded-xl bg-slate-50 px-2 py-6 dark:bg-slate-100">
            <img
              className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300"
              src="/images/OtherVar.png"
              alt="Guide Avatar"
            />
            <div className="px-2 max-w-3xl items-center">
              {loading ? (
                <CircularProgress
                  aria-label="Loading..."
                  size="lg"
                  value={progressValue}
                  color="warning"
                  className="mx-2"
                  showValueLabel={true}
                />
              ) : (
                <p>
                  {modelResponse || (
                    <>
                      {showChat ? (
                        <div className="flex-col md:flex-row justify-center items-center m-auto px-2">
                          {renderNiches()}
                        </div>
                      ) : (
                        <p className="my-2">
                          You have no published article. However, this is where
                          you'll be able to interact with your fans/readers of
                          your articles. As a moderator I will help keep things
                          interesting for your audience on your behalf. Start by
                          writing an article. You may enable 'Just Me' button
                          above to only chat with me.
                        </p>
                      )}
                    </>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-2">
          <div className="relative">
            <textarea
              id="chat-input"
              className="block w-full resize-none rounded-md bg-slate-200 p-4 text-sm dark:bg-slate-50 dark:text-slate-900"
              placeholder="Select any published article to chat"
              rows="1"
              value={inputValue}
              onChange={handleInputChange}
              onClick={handleTextAreaClick}
              required
            ></textarea>
            <button
              type="submit"
              className="absolute bottom-2 right-2.5 rounded-md bg-slate-50 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

ChatUI.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ChatUI;
