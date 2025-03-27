"use client";
import { useState, useEffect, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Loading from "./IsLoadingButton";

export default function Guides({ isOpen, promptResponse, initialLoading }) {
  const [open, setOpen] = useState(isOpen !== undefined ? isOpen : true);
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const controllerRef = useRef(null);
  const responseContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(initialLoading || false);

  // Synchronize the local isLoading state with the parent prop and clean up on unmount
  useEffect(() => {
    setIsLoading(initialLoading);
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [initialLoading]);

  // Add scroll effect for new responses; moved above the return statement so it's reachable
  useEffect(() => {
    if (responseContainerRef.current && aiResponse) {
      // Scroll to top (or adjust as needed)
      responseContainerRef.current.scrollTo(0, 0);
    }
  }, [aiResponse]);

  const handlePromptAi = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAiResponse(""); // Clear previous response

    // Use entered prompt, or display error if blank
    let aiPrompt = prompt;
    if (!aiPrompt || aiPrompt.trim() === "") {
      setAiResponse("Please enter a prompt before submitting.");
      setIsLoading(false);
      return;
    }

    try {
      const maxRetries = 3;
      let retries = 0;
      let response;

      controllerRef.current = new AbortController();
      while (retries < maxRetries) {
        try {
          response = await fetch(
            `/api/beginnersGuide?prompt=${encodeURIComponent(aiPrompt)}`,
            { signal: controllerRef.current.signal }
          );
          if (response.ok) break;
          throw new Error(`HTTP error! status: ${response.status}`);
        } catch (error) {
          if (retries === maxRetries - 1) {
            console.error("Final fetch error:", error);
            setAiResponse(
              "Failed to connect after multiple attempts. Please try again later."
            );
            setIsLoading(false);
            return;
          }
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * Math.pow(2, retries))
          );
          retries++;
        }
      }

      if (!response || !response.ok) {
        throw new Error(`HTTP error! status: ${response?.status}`);
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        try {
          const lines = chunk.split("\n").filter((line) => line.trim() !== "");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const jsonStr = line.slice(6);
              try {
                const data = JSON.parse(jsonStr);
                if (data.content) {
                  setAiResponse((prev) => prev + data.content);
                }
              } catch (parseError) {
                console.error("Error parsing JSON chunk:", parseError);
              }
            }
          }
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Stream processing error:", error);
            setIsLoading(false);
            setAiResponse((prev) => prev + "\nError processing stream");
          }
          return;
        }
      }

      setIsLoading(false);
      setPrompt("");
      controllerRef.current.abort();
    } catch (error) {
      console.error("Error setting up streaming:", error);
      setAiResponse((prev) =>
        prev
          ? `${prev}\n\nFinal Error: ${error.message}`
          : `Error: ${error.message}`
      );
      setIsLoading(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        Beginners Guide
                      </Dialog.Title>
                      <div className="mt-2">
                        {(aiResponse || promptResponse) && (
                          <div
                            className="mt-4 p-4 border rounded bg-gray-100"
                            ref={responseContainerRef}
                          >
                            <h2 className="font-bold">AI Response:</h2>
                            <p className="whitespace-pre-line">
                              {aiResponse || promptResponse}
                            </p>
                          </div>
                        )}

                        <form onSubmit={handlePromptAi}>
                          <label htmlFor="chat" className="sr-only">
                            Your message
                          </label>
                          <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                            <textarea
                              id="chat"
                              rows={3}
                              value={prompt}
                              onChange={(e) => setPrompt(e.target.value)}
                              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                              placeholder={
                                isLoading
                                  ? "Loading data, please wait..."
                                  : "Enter your blogging question or topic for a guide..."
                              }
                            />
                            {isLoading ? (
                              <Loading />
                            ) : (
                              <button
                                type="submit"
                                disabled={isLoading}
                                className="inline-flex justify-center p-2 text-red-600 rounded-full cursor-pointer hover:bg-red-100 dark:text-red-500 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <svg
                                  className="w-5 h-5 rotate-90 rtl:-rotate-90"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 18 20"
                                >
                                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                                </svg>
                                <span className="sr-only">Send message</span>
                              </button>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

// "use client";
// import { useState, useEffect, Fragment, useRef } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import Loading from "./IsLoadingButton";

// export default function Guides({ isOpen, promptResponse, initialLoading }) {
//   const [open, setOpen] = useState(isOpen !== undefined ? isOpen : true);
//   const [prompt, setPrompt] = useState("");
//   const [aiResponse, setAiResponse] = useState("");
//   const controllerRef = useRef(null);
//   const responseContainerRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(initialLoading || false);

//   // Synchronize the local isLoading state with the parent prop
//   useEffect(() => {
//     setIsLoading(initialLoading);
//     return () => {
//       if (controllerRef.current) controllerRef.current.abort();
//     };
//   }, [initialLoading]);

//   const handlePromptAi = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setAiResponse(""); // Clear previous response

//     // Use entered prompt, or display error if blank
//     let aiPrompt = prompt;
//     if (!aiPrompt || aiPrompt.trim() === "") {
//       setAiResponse("Please enter a prompt before submitting.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const maxRetries = 3;
//       let retries = 0;
//       let response;

//       controllerRef.current = new AbortController();
//       while (retries < maxRetries) {
//         try {
//           response = await fetch(
//             `/api/beginnersGuide?prompt=${encodeURIComponent(aiPrompt)}`,
//             { signal: controllerRef.current.signal }
//           );
//           if (response.ok) break;
//           throw new Error(`HTTP error! status: ${response.status}`);
//         } catch (error) {
//           if (retries === maxRetries - 1) {
//             console.error("Final fetch error:", error);
//             setAiResponse(
//               "Failed to connect after multiple attempts. Please try again later."
//             );
//             setIsLoading(false);
//             return;
//           }

//           await new Promise((resolve) =>
//             setTimeout(resolve, 1000 * Math.pow(2, retries))
//           );
//           retries++;
//         }
//       }

//       if (!response || !response.ok) {
//         throw new Error(`HTTP error! status: ${response?.status}`);
//       }
//       const reader = response.body.getReader();
//       const decoder = new TextDecoder();

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;

//         const chunk = decoder.decode(value);
//         try {
//           const lines = chunk.split("\n").filter((line) => line.trim() !== "");
//           for (const line of lines) {
//             if (line.startsWith("data: ")) {
//               const jsonStr = line.slice(6);
//               try {
//                 const data = JSON.parse(jsonStr);
//                 if (data.content) {
//                   setAiResponse((prev) => prev + data.content);
//                 }
//               } catch (parseError) {
//                 console.error("Error parsing JSON chunk:", parseError);
//               }
//             }
//           }
//         } catch (error) {
//           if (error.name !== "AbortError") {
//             console.error("Stream processing error:", error);
//             setIsLoading(false);
//             setAiResponse((prev) => prev + "\nError processing stream");
//           }
//           return;
//         }
//       }

//       setIsLoading(false);
//       setPrompt("");
//       controllerRef.current.abort();
//     } catch (error) {
//       console.error("Error setting up streaming:", error);
//       setAiResponse((prev) =>
//         prev
//           ? `${prev}\n\nFinal Error: ${error.message}`
//           : `Error: ${error.message}`
//       );
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Transition.Root show={open} as={Fragment}>
//       <Dialog as="div" className="relative z-10" onClose={setOpen}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//         </Transition.Child>

//         <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//           <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               enterTo="opacity-100 translate-y-0 sm:scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//               leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             >
//               <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
//                 <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
//                   <div>
//                     <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
//                       <Dialog.Title
//                         as="h3"
//                         className="text-base font-semibold text-gray-900"
//                       >
//                         Beginners Guide
//                       </Dialog.Title>
//                       <div className="mt-2">
//                         {(aiResponse || promptResponse) && (
//                           <div
//                             className="mt-4 p-4 border rounded bg-gray-100"
//                             ref={responseContainerRef}
//                           >
//                             <h2 className="font-bold">AI Response:</h2>
//                             <p className="whitespace-pre-line">
//                               {aiResponse || promptResponse}
//                             </p>
//                           </div>
//                         )}

//                         <form onSubmit={handlePromptAi}>
//                           <label htmlFor="chat" className="sr-only">
//                             Your message
//                           </label>
//                           <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
//                             <textarea
//                               id="chat"
//                               rows={3}
//                               value={prompt}
//                               onChange={(e) => setPrompt(e.target.value)}
//                               className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
//                               placeholder={
//                                 isLoading
//                                   ? "Loading data, please wait..."
//                                   : "Enter your blogging question or topic for a guide..."
//                               }
//                             />
//                             {isLoading ? (
//                               <Loading />
//                             ) : (
//                               <button
//                                 type="submit"
//                                 disabled={isLoading}
//                                 className="inline-flex justify-center p-2 text-red-600 rounded-full cursor-pointer hover:bg-red-100 dark:text-red-500 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                               >
//                                 <svg
//                                   className="w-5 h-5 rotate-90 rtl:-rotate-90"
//                                   aria-hidden="true"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   fill="currentColor"
//                                   viewBox="0 0 18 20"
//                                 >
//                                   <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
//                                 </svg>
//                                 <span className="sr-only">Send message</span>
//                               </button>
//                             )}
//                           </div>
//                         </form>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//                   <button
//                     type="button"
//                     onClick={() => setOpen(false)}
//                     className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );

//   // Add scroll effect for new responses
//   useEffect(() => {
//     if (responseContainerRef.current && aiResponse) {
//       responseContainerRef.current.scrollTo(0, 0);
//     }
//   }, [aiResponse]);
// }
