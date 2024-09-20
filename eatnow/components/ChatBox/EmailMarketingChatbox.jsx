import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const EmailChatbox = ({ isOpen, onClose, title, askQuestion, textData }) => {
  const [userQuestion, setUserQuestion] = useState(null);

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
        <ModalContent className="max-h-[90vh] overflow-y-auto">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
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
                              Ask our proposed plan
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
                              {/* Card */}
                              <div className="inline-block bg-red-600 rounded-lg p-4 shadow-sm">
                                <p className="text-sm text-white"></p>
                              </div>
                              {/* End Card */}
                            </div>
                            <span className="shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
                              <span className="text-sm font-medium text-white leading-none">
                                AZ
                              </span>
                            </span>
                          </li>
                        )}
                        {/* End Chat Bubble */}
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
                          >
                            <svg
                              className="size-3"
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
                            </svg>
                            Stop generating
                          </button>
                        </div>
                        {/* Input */}
                        <div className="relative">
                          <textarea
                            className="p-4 pb-12 block w-full border-gray-200 rounded-lg text-sm focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                            placeholder="Ask me anything..."
                            defaultValue={""}
                          />
                          {/* Toolbar */}
                          <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-white dark:bg-neutral-900">
                            <div className="flex justify-between items-center">
                              {/* Button Group */}
                              <div className="flex items-center">
                                {/* Mic Button */}
                                <button
                                  type="button"
                                  className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                                    <rect
                                      width={18}
                                      height={18}
                                      x={3}
                                      y={3}
                                      rx={2}
                                    />
                                    <line x1={9} x2={15} y1={15} y2={9} />
                                  </svg>
                                </button>
                                {/* End Mic Button */}
                                {/* Attach Button */}
                                <button
                                  type="button"
                                  className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                  </svg>
                                </button>
                                {/* End Attach Button */}
                              </div>
                              {/* End Button Group */}
                              {/* Button Group */}
                              <div className="flex items-center gap-x-1">
                                {/* Mic Button */}
                                <button
                                  type="button"
                                  className="inline-flex justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                                    <path d="M4 12h16M4 6h16M4 18h16" />
                                  </svg>
                                </button>
                                {/* End Mic Button */}
                                {/* Send Button */}
                                <button
                                  type="button"
                                  className="inline-flex justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                                    <path d="M3 17v-2l18-7l-7 18l-2-7z" />
                                  </svg>
                                </button>
                                {/* End Send Button */}
                              </div>
                              {/* End Button Group */}
                            </div>
                          </div>
                          {/* End Toolbar */}
                        </div>
                      </div>
                      {/* End Input */}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button auto flat color="error" onClick={onClose}>
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

// import { useState, useEffect } from "react";

// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
// } from "@nextui-org/react";

// const EmailChatbox = ({ isOpen, onClose, title, askQuestion, textData }) => {
//   const [articleAssistant, setArticleAssistant] = useState(null);
//   const [userQuestion, setUserQuestion] = useState(null);

//   console.log("Modal info:", askQuestion, textData); //Both are true

//   return (
//     <>
//       <Modal
//         backdrop="opaque"
//         isOpen={isOpen}
//         onClose={onClose}
//         classNames={{
//           backdrop:
//             "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
//         }}
//       >
//         <ModalContent className="py-11">
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">
//                 Article Assistant
//               </ModalHeader>
//               <ModalBody className="bg-slate-50 ">
//                 <div>
//                   <>
//                     {/* Content */}
//                     <div className="relative sm:h-screen m-4">
//                       <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 bg-slate-100 lg:py-14 mx-auto">
//                         {/* Title */}
//                         <div className="text-center">
//                           <h1 className="text-2xl font-bold text-gray-800 sm:text-4xl dark:text-white">
//                             Article Assistant
//                           </h1>
//                           <p className="mt-3 text-gray-600 dark:text-neutral-400">
//                             Got a question about our analysis?
//                           </p>
//                         </div>
//                         {/* End Title */}
//                         <ul className="mt-16 space-y-5">
//                           {/* Chat Bubble */}
//                           <li className="flex gap-x-2 sm:gap-x-4">
//                             {/* Card */}
//                             <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
//                               <h2 className="font-medium text-base text-gray-800 dark:text-white">
//                                 Ask our proposed plan
//                               </h2>
//                               <div className="space-y-1.5">
//                                 <p className="mb-1.5 text-sm text-gray-800 dark:text-white">
//                                   You may ask questions about our analysis.
//                                 </p>
//                               </div>
//                             </div>
//                             {/* End Card */}
//                           </li>
//                           {/* Chat Bubble */}
//                           {userQuestion && (
//                             <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
//                               <div className="grow text-end space-y-3">
//                                 {/* Card */}
//                                 <div className="inline-block bg-red-600 rounded-lg p-4 shadow-sm">
//                                   <p className="text-sm text-white"></p>
//                                 </div>
//                                 {/* End Card */}
//                               </div>
//                               <span className="shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
//                                 <span className="text-sm font-medium text-white leading-none">
//                                   AZ
//                                 </span>
//                               </span>
//                             </li>
//                           )}
//                           {/* End Chat Bubble */}
//                         </ul>
//                       </div>
//                       <div className="max-w-4xl mx-auto sticky bottom-0 z-10 bg-white border-t border-gray-200 pt-2 pb-4 sm:pt-4 sm:pb-6 px-4 sm:px-6 lg:px-0 dark:bg-neutral-900 dark:border-neutral-700">
//                         {/* Textarea */}
//                         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//                           <div className="flex justify-between items-center mb-3">
//                             <button
//                               type="button"
//                               className="inline-flex justify-center items-center gap-x-2 rounded-lg font-medium text-gray-800 hover:text-red-600 focus:outline-none focus:text-red-600 text-xs sm:text-sm dark:text-neutral-200 dark:hover:text-red-500 dark:focus:text-red-500"
//                             >
//                               <svg
//                                 className="shrink-0 size-4"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width={24}
//                                 height={24}
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth={2}
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               >
//                                 <path d="M5 12h14" />
//                                 <path d="M12 5v14" />
//                               </svg>
//                               New chat
//                             </button>
//                             <button
//                               type="button"
//                               className="py-1.5 px-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
//                             >
//                               <svg
//                                 className="size-3"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width={16}
//                                 height={16}
//                                 fill="currentColor"
//                                 viewBox="0 0 16 16"
//                               >
//                                 <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
//                               </svg>
//                               Stop generating
//                             </button>
//                           </div>
//                           {/* Input */}
//                           <div className="relative">
//                             <textarea
//                               className="p-4 pb-12 block w-full border-gray-200 rounded-lg text-sm focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
//                               placeholder="Ask me anything..."
//                               defaultValue={""}
//                             />
//                             {/* Toolbar */}
//                             <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-white dark:bg-neutral-900">
//                               <div className="flex justify-between items-center">
//                                 {/* Button Group */}
//                                 <div className="flex items-center">
//                                   {/* Mic Button */}
//                                   <button
//                                     type="button"
//                                     className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
//                                   >
//                                     <svg
//                                       className="shrink-0 size-4"
//                                       xmlns="http://www.w3.org/2000/svg"
//                                       width={24}
//                                       height={24}
//                                       viewBox="0 0 24 24"
//                                       fill="none"
//                                       stroke="currentColor"
//                                       strokeWidth={2}
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                     >
//                                       <rect
//                                         width={18}
//                                         height={18}
//                                         x={3}
//                                         y={3}
//                                         rx={2}
//                                       />
//                                       <line x1={9} x2={15} y1={15} y2={9} />
//                                     </svg>
//                                   </button>
//                                   {/* End Mic Button */}
//                                   {/* Attach Button */}
//                                   <button
//                                     type="button"
//                                     className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
//                                   >
//                                     <svg
//                                       className="shrink-0 size-4"
//                                       xmlns="http://www.w3.org/2000/svg"
//                                       width={24}
//                                       height={24}
//                                       viewBox="0 0 24 24"
//                                       fill="none"
//                                       stroke="currentColor"
//                                       strokeWidth={2}
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                     >
//                                       <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
//                                     </svg>
//                                   </button>
//                                   {/* End Attach Button */}
//                                 </div>
//                                 {/* End Button Group */}
//                                 {/* Button Group */}
//                                 <div className="flex items-center gap-x-1">
//                                   {/* Mic Button */}
//                                   <button
//                                     type="button"
//                                     className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
//                                   >
//                                     <svg
//                                       className="shrink-0 size-4"
//                                       xmlns="http://www.w3.org/2000/svg"
//                                       width={24}
//                                       height={24}
//                                       viewBox="0 0 24 24"
//                                       fill="none"
//                                       stroke="currentColor"
//                                       strokeWidth={2}
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                     >
//                                       <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
//                                       <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
//                                       <line x1={12} x2={12} y1={19} y2={22} />
//                                     </svg>
//                                   </button>
//                                   {/* End Mic Button */}
//                                   {/* Send Button */}
//                                   <button
//                                     type="button"
//                                     className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-white bg-red-600 hover:bg-red-500 focus:z-10 focus:outline-none focus:bg-red-500"
//                                   >
//                                     <svg
//                                       className="shrink-0 size-3.5"
//                                       xmlns="http://www.w3.org/2000/svg"
//                                       width={16}
//                                       height={16}
//                                       fill="currentColor"
//                                       viewBox="0 0 16 16"
//                                     >
//                                       <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
//                                     </svg>
//                                   </button>
//                                   {/* End Send Button */}
//                                 </div>
//                                 {/* End Button Group */}
//                               </div>
//                             </div>
//                             {/* End Toolbar */}
//                           </div>
//                           {/* End Input */}
//                         </div>
//                         {/* End Textarea */}
//                       </div>
//                     </div>
//                     {/* End Content */}
//                   </>
//                 </div>
//               </ModalBody>
//               <ModalFooter className="bg-slate-50">
//                 <Button color="danger" variant="light" onPress={onClose}>
//                   Close
//                 </Button>
//                 <Button color="primary" onPress={onClose}>
//                   Action
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default EmailChatbox;
