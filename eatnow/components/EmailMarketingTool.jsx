import React, { useEffect, useState } from "react";
import RaiseFunds from "@/components/FundRaise";
import Saas from "@/components/Saas";
import Awareness from "@/components/Awareness";
import Ecommerce from "@/components/Ecommerce";
import EmailNewsletter from "@/components/EmailNewsletter";
import EmailChatbox from "@/components/ChatBox/EmailMarketingChatbox";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const SeriesModalComponent = ({
  isOpen,
  onClose,
  title,
  askQuestion,
  textData,
}) => {
  const [campaignEmail, setCampaignEmail] = useState("");
  const [isSelectionMade, setIsSelectionMade] = useState(false);
  const [showAskButton, setShowAskButton] = useState(false);
  const [savedResponse, setSavedResponse] = useState(null);
  const {
    isOpen: isEmailModalOpen,
    onOpen: onEmailModalOpen,
    onClose: onEmailModalClose,
  } = useDisclosure();

  useEffect(() => {
    if (askQuestion) {
      onEmailModalOpen();
    }
  }, [askQuestion, onEmailModalOpen]);

  useEffect(() => {
    // Retrieve saved data from local storage when component mounts
    const storedData = localStorage.getItem("finalResponse");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setSavedResponse(parsedData);
        console.log("Retrieved from local storage:", parsedData);
      } catch (error) {
        console.error("Error parsing stored data:", error);
      }
    }
  }, []);

  // Function to handle the campaign type selection
  const handleCampaignTypeChange = (e) => {
    const selectedValue = e.target.value;
    setCampaignEmail(selectedValue);
    if (selectedValue !== "") {
      setIsSelectionMade(true); // Campaign type selected, enable the button
    } else {
      setIsSelectionMade(false); // No selection, disable the button
    }
  };

  // Function to handle the click event of the "Here's our Proposed Plan" button
  const handleShowAskButton = () => {
    setShowAskButton(true); // Display the "Ask a Question" button
  };

  // Function to handle the click event of the "Ask a Question" button
  const handleAskQuestion = async () => {
    if (isSelectionMade) {
      // Ensure the button only works if a selection is made
      onEmailModalOpen();
    }
  };

  // Function passed to RaiseFunds component to control button visibility
  const handleProposedPlanClick = () => {
    setShowAskButton(true);
  };

  return (
    <>
      <Modal
        backdrop="blur"
        placement="auto"
        isDismissable={false}
        size="3xl"
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          backdrop: "bg-[#292f46]/80 backdrop-opacity-40",
        }}
      >
        <ModalContent className="bg-slate-300 rounded-sm">
          <ModalHeader className="flex flex-col gap-1 bg-slate-50">
            Launching {title} campaign
          </ModalHeader>
          <ModalBody className="bg-white overflow-y-auto max-h-[50vh]">
            <div id="top" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-center mt-5 px-4">
                <div>
                  <div className="flex flex-col col-span-full">
                    <label>Type of Campaign:</label>
                    <select
                      name="campaignType"
                      value={campaignEmail}
                      onChange={handleCampaignTypeChange}
                      disabled={isSelectionMade}
                      className={
                        isSelectionMade ? "cursor-not-allowed opacity-50" : ""
                      }
                    >
                      <option value="">Select campaign type</option>
                      <option value="Fundraising">Fundraising</option>
                      <option value="SaaS Subscriptions">
                        SaaS Subscriptions
                      </option>
                      <option value="Raise Awareness">Raise Awareness</option>
                      <option value="Product Sales">Product Sales</option>
                      <option value="Newsletter (communication)">
                        Newsletter (communication)
                      </option>
                      <option value="Newsletter (marketing)">
                        Newsletter (marketing)
                      </option>
                    </select>
                  </div>

                  <div className="col-span-full mt-5">
                    {campaignEmail === "Fundraising" && (
                      <RaiseFunds
                        onProposedPlanClick={handleProposedPlanClick}
                      />
                    )}
                    {campaignEmail === "SaaS Subscriptions" && <Saas />}
                    {campaignEmail === "Raise Awareness" && <Awareness />}
                    {campaignEmail === "Product Sales" && <Ecommerce />}
                    {campaignEmail === "Newsletter (communication)" && (
                      <EmailNewsletter />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter className="bg-slate-50">
            {showAskButton && (
              <Button
                color="success"
                onClick={handleAskQuestion}
                className={
                  isSelectionMade
                    ? "bg-slate-500 rounded-md text-white"
                    : "cursor-not-allowed opacity-50 bg-slate-500 rounded-md text-white"
                }
                disabled={!isSelectionMade}
              >
                Chat with this Tool
              </Button>
            )}
            <Button color="error" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <EmailChatbox
        isOpen={isEmailModalOpen}
        onClose={onEmailModalClose}
        askQuestion={askQuestion}
        textData={savedResponse || textData}
      />
    </>
  );
};

export default SeriesModalComponent;

// import React, { useEffect, useState } from "react";
// import RaiseFunds from "@/components/FundRaise";
// import Saas from "@/components/Saas";
// import Awareness from "@/components/Awareness";
// import Ecommerce from "@/components/Ecommerce";
// import EmailNewsletter from "@/components/EmailNewsletter";
// import EmailChatbox from "@/components/ChatBox/EmailMarketingChatbox";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   useDisclosure,
// } from "@nextui-org/react";

// const SeriesModalComponent = ({
//   isOpen,
//   onClose,
//   title,
//   askQuestion,
//   textData,
// }) => {
//   const [campaignEmail, setCampaignEmail] = useState("");
//   const [isSelectionMade, setIsSelectionMade] = useState(false);
//   const [showAskButton, setShowAskButton] = useState(false);
//   const {
//     isOpen: isEmailModalOpen,
//     onOpen: onEmailModalOpen,
//     onClose: onEmailModalClose,
//   } = useDisclosure();

//   useEffect(() => {
//     if (askQuestion) {
//       onEmailModalOpen();
//     }
//   }, [askQuestion, onEmailModalOpen]);

//   // Function to handle the campaign type selection
//   const handleCampaignTypeChange = (e) => {
//     const selectedValue = e.target.value;
//     setCampaignEmail(selectedValue);
//     if (selectedValue !== "") {
//       setIsSelectionMade(true); // Campaign type selected, enable the button
//     } else {
//       setIsSelectionMade(false); // No selection, disable the button
//     }
//   };

//   // Function to handle the click event of the "Here's our Proposed Plan" button
//   const handleShowAskButton = () => {
//     setShowAskButton(true); // Display the "Ask a Question" button
//   };

//   // Function to handle the click event of the "Ask a Question" button
//   const handleAskQuestion = async () => {
//     if (isSelectionMade) {
//       // Ensure the button only works if a selection is made
//       onEmailModalOpen();
//       // To do:
//       // 1. Call the API to GET data from 'the server'
//     }
//   };

//   // Function passed to RaiseFunds component to control button visibility
//   const handleProposedPlanClick = () => {
//     setShowAskButton(true);
//   };

//   return (
//     <>
//       <Modal
//         backdrop="blur"
//         placement="auto"
//         isDismissable={false}
//         size="3xl"
//         isOpen={isOpen}
//         onClose={onClose}
//         classNames={{
//           backdrop: "bg-[#292f46]/80 backdrop-opacity-40",
//         }}
//       >
//         <ModalContent className="bg-slate-300 rounded-sm">
//           <ModalHeader className="flex flex-col gap-1 bg-slate-50">
//             Launching {title} campaign
//           </ModalHeader>
//           <ModalBody className="bg-white overflow-y-auto max-h-[50vh]">
//             <div id="top" onClick={(e) => e.stopPropagation()}>
//               <div className="flex justify-center mt-5 px-4">
//                 <div>
//                   <div className="flex flex-col col-span-full">
//                     <label>Type of Campaign:</label>
//                     <select
//                       name="campaignType"
//                       value={campaignEmail}
//                       onChange={handleCampaignTypeChange}
//                       disabled={isSelectionMade}
//                       className={
//                         isSelectionMade ? "cursor-not-allowed opacity-50" : ""
//                       }
//                     >
//                       <option value="">Select campaign type</option>
//                       <option value="Fundraising">Fundraising</option>
//                       <option value="SaaS Subscriptions">
//                         SaaS Subscriptions
//                       </option>
//                       <option value="Raise Awareness">Raise Awareness</option>
//                       <option value="Product Sales">Product Sales</option>
//                       <option value="Newsletter (communication)">
//                         Newsletter (communication)
//                       </option>
//                       <option value="Newsletter (marketing)">
//                         Newsletter (marketing)
//                       </option>
//                     </select>
//                   </div>

//                   <div className="col-span-full mt-5">
//                     {/* {campaignEmail === "Fundraising" && <RaiseFunds />} */}
//                     {campaignEmail === "Fundraising" && (
//                       <RaiseFunds
//                         onProposedPlanClick={handleProposedPlanClick}
//                       />
//                     )}
//                     {campaignEmail === "SaaS Subscriptions" && <Saas />}
//                     {campaignEmail === "Raise Awareness" && <Awareness />}
//                     {campaignEmail === "Product Sales" && <Ecommerce />}
//                     {campaignEmail === "Newsletter (communication)" && (
//                       <EmailNewsletter />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </ModalBody>

//           <ModalFooter className="bg-slate-50">
//             {/* Ask a Question Button (hidden by default) */}
//             {showAskButton && (
//               <Button
//                 color="success"
//                 onClick={handleAskQuestion} // Always call the function, but it will only work if `isSelectionMade` is true
//                 className={
//                   isSelectionMade
//                     ? "bg-slate-500 rounded-md text-white"
//                     : "cursor-not-allowed opacity-50 bg-slate-500 rounded-md text-white"
//                 }
//                 disabled={!isSelectionMade} // Disable the button if no selection
//               >
//                 Chat with this Tool
//               </Button>
//             )}
//             <Button color="error" onClick={onClose}>
//               Close
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//       <EmailChatbox
//         isOpen={isEmailModalOpen}
//         onClose={onEmailModalClose}
//         askQuestion={askQuestion}
//         textData={textData}
//       />
//     </>
//   );
// };

// export default SeriesModalComponent;
