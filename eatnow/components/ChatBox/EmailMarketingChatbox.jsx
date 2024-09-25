import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useNationBuild } from "@/app/api/partner/nationbuilderV1/nationHook";
import { account } from "../../app/appwrite";

const EmailChatbox = ({ isOpen, onClose, title, askQuestion, textData }) => {
  const { makeRequest, isLoading, apiResponse } = useNationBuild();
  const [userQuestion, setUserQuestion] = useState(null);
  const [error, setError] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newResponse, setNewResponse] = useState("");
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  //Getting user
  useEffect(() => {
    async function getUser() {
      try {
        const currentUser = await account.get();
        if (!currentUser || !currentUser.email) {
          throw new Error("User not authenticated or missing email");
        }
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  //Handling new question
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      // Make a POST request to /api/partner/nationbuilderV1
      const nationbuilderResponse = await fetch(
        "/api/partner/nationbuilderV1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              { role: "user", content: newQuestion },
              { role: "assistant", content: textData },
            ],
          }),
        }
      );

      if (!nationbuilderResponse.ok) {
        throw new Error("Failed to fetch response from nationbuilderV1");
      }

      const nationbuilderData = await nationbuilderResponse.json();

      if (nationbuilderData.status === "SUCCESS") {
        setUserQuestion(newQuestion);
        setNewResponse(nationbuilderData.assistantResponse || "");
        setNewQuestion("");
      } else {
        setError(nationbuilderData.error || "Failed to fetch response.");
      }
    } catch (error) {
      console.error("Error posting question:", error);
      setError("Failed to post question. Please try again later.");
    }
  };

  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent
          className="max-h-[90vh] overflow-y-auto"
          style={{ borderRadius: "10px" }}
        >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-white">
                Article Assistant
              </ModalHeader>
              <ModalBody className="bg-slate-50">
                <div>
                  {/* Content */}
                  <div className="relative m-4">
                    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 bg-slate-100 lg:py-14 mx-auto">
                      {/* Title */}
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                          Article Assistant
                        </h1>
                        <p className="mt-3 text-gray-600 dark:text-neutral-400">
                          Got a question about our analysis?
                        </p>
                      </div>
                      {/* End Title */}
                      <ul className="mt-16 space-y-5">
                        {/* Chat Bubble */}
                        <li className="flex gap-x-2 sm:gap-x-4">
                          {/* Card */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                            <h2 className="font-medium text-base text-gray-800 dark:text-white">
                              Chat with our proposed plan
                            </h2>
                            <div className="space-y-1.5">
                              <p className="mb-1.5 text-sm text-gray-800 dark:text-white">
                                You may ask questions about our analysis.
                              </p>
                            </div>
                          </div>
                          {/* End Card */}
                        </li>
                        {/* Chat Bubble */}
                        {userQuestion && (
                          <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                            <div className="grow text-end space-y-3">
                              <div className="inline-block bg-gray-100 rounded-lg p-4 shadow-sm">
                                <p className="text-sm text-gray-800">
                                  {userQuestion}
                                </p>
                              </div>
                            </div>
                            <span className="shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
                              <span className="text-sm font-medium text-white leading-none">
                                {name ? name.charAt(0).toUpperCase() : "U"}
                              </span>
                            </span>
                          </li>
                        )}
                        {newResponse && (
                          <li className="max-w-2xl flex gap-x-2 sm:gap-x-4">
                            <div className="shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-blue-600">
                              <span className="text-sm font-medium text-white leading-none">
                                AI
                              </span>
                            </div>
                            <div className="grow text-start space-y-3">
                              <div className="inline-block bg-blue-100 rounded-lg p-4 shadow-sm">
                                <p className="text-sm text-gray-800">
                                  {newResponse}
                                </p>
                              </div>
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="max-w-4xl mx-auto sticky bottom-0 z-10 bg-white border-t border-gray-200 pt-2 pb-4 sm:pt-4 sm:pb-6 px-4 sm:px-6 lg:px-0 dark:bg-neutral-900 dark:border-neutral-700">
                      {/* Textarea */}
                      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-3">
                          <button
                            type="button"
                            className="inline-flex justify-center items-center gap-x-2 rounded-lg font-medium text-gray-800 hover:text-red-600 focus:outline-none focus:text-red-600 text-xs sm:text-sm dark:text-neutral-200 dark:hover:text-red-500 dark:focus:text-red-500"
                          >
                            <svg
                              className="shrink-0 size-4"
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14" />
                              <path d="M12 5v14" />
                            </svg>
                            New chat
                          </button>
                          <button
                            type="button"
                            className="py-1.5 px-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                            disabled={isLoading}
                          >
                            <svg
                              className="size-3"
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5zm0-1A2.5 2.5 0 0 0 2.5 5v6A2.5 2.5 0 0 0 5 13.5h6A2.5 2.5 0 0 0 13.5 11V5A2.5 2.5 0 0 0 11 3.5H5z" />
                            </svg>
                            Reset demo
                          </button>
                        </div>
                        <form
                          onSubmit={handleSubmit}
                          className="relative border border-gray-200 bg-white rounded-lg shadow-sm dark:bg-neutral-800 dark:border-neutral-700"
                        >
                          <textarea
                            rows={1}
                            className="block w-full resize-none p-4 text-gray-800 dark:bg-neutral-800 dark:text-white"
                            placeholder="Type your message here..."
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            required
                          />
                          <div className="absolute right-0 bottom-0 p-3 flex justify-end">
                            <button
                              type="submit"
                              disabled={isLoading}
                              onClick={handleSubmit}
                              className="inline-flex justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            >
                              {isLoading ? (
                                <span>Loading...</span>
                              ) : (
                                <svg
                                  className="shrink-0 size-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M3 17v-2l18-7l-7 18l-2-7z" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </form>
                        {error && <p className="text-red-600 mt-4">{error}</p>}
                      </div>
                      {/* End Textarea */}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="bg-white">
                <Button color="danger" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EmailChatbox;
