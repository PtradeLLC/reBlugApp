import React, { useEffect, useState } from "react";
import { account } from "../app/appwrite";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import RaiseFunds from "@/components/FundRaise";
import Saas from "@/components/Saas";
import Awareness from "@/components/Awareness"; // Ensure you have this component
import Ecommerce from "@/components/Ecommerce"; // Ensure you have this component
import EmailNewsletter from "@/components/EmailNewsletter"; // Ensure you have this component
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import useSWR from "swr";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// Define your fetcher function
const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

const SeriesModalComponent = ({ isOpen, onClose }) => {
  const [size, setSize] = useState("5xl");
  const [backdrop, setBackdrop] = useState("opaque");
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignEmail, setCampaignEmail] = useState(null);
  const [email, setEmail] = useState(" ");
  const [user, setUser] = useState(null);
  const [modalPlacement, setModalPlacement] = useState("top");
  const [accountUser, setAccountUser] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [articleData, setArticleData] = useState({
    articleTitle: "",
    coverImage: "",
    articleBody: {
      articleContent: {
        bodyContent: "",
        bodyImage: "",
      },
    },
    categoryNiche: "",
    isSeries: false,
    seriesTitle: "",
  });

  // Fetch the user on component mount
  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await account.get();
        setAccountUser(currentUser);
        setUser(currentUser);
        setEmail(currentUser.email);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching user:", error);
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const { data: postsData, error: postsError } = useSWR(
    user ? `/api/blog/getPosts?userId=${user.$id}` : null,
    fetcher
  );

  const handleOpen = (post, backdrop) => {
    setSelectedPost(post);
    setBackdrop(backdrop);
    setSize("4xl"); // Set the modal size
    onOpen(); // Open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setArticleData((prevData) => ({
        ...prevData,
        coverImage: reader.result, // This should be base64 encoded string
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [formData, setFormData] = useState({
    brandName: "",
    productName: "",
    productImage: null,
    website: "",
    socialMedia: "",
    productMessage: "",
    additionalInfo: "",
  });

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleBodyChange = (content, delta, source, editor) => {
    const text = editor.getText();
    setArticleData({
      ...articleData,
      articleBody: {
        ...articleData.articleBody,
        articleContent: {
          ...articleData.articleBody.articleContent,
          bodyContent: content,
        },
      },
    });
    setWordCount(countWords(text));
  };

  // Handles category change
  const handleCategoryChange = (event) => {
    setArticleData({
      ...articleData,
      categoryNiche: event.target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    e.preventDefault();
  };

  return (
    <div className="">
      {/* Modal for displaying post details */}
      <Modal
        placement={modalPlacement}
        size={size}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent className="bg-slate-300 rounded-sm">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-slate-50">
                Blog Series - {selectedPost?.title}
              </ModalHeader>
              <ModalBody className="bg-white">
                <>
                  <div className="flex justify-center mt-5 px-4">
                    <form onSubmit={handleSubmitForm}>
                      <div className="space-y-12 mt-2">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-2">
                          <div>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                              Basic Information
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                              Some information about your campaign goals.
                            </p>
                          </div>

                          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                            <span className="sm:col-span-2">
                              <div>
                                <label
                                  htmlFor="first-name"
                                  className="block text-md font-medium leading-6 text-gray-900"
                                >
                                  {user.name}
                                </label>
                              </div>
                            </span>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="goal"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Select your Campaign Goal
                              </label>
                              <div className="mt-2">
                                <select
                                  id="goal"
                                  name="goal"
                                  autoComplete="goal-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                  onChange={(e) =>
                                    setCampaignEmail(e.target.value)
                                  }
                                  value={campaignEmail}
                                >
                                  <option value="">Select an option</option>
                                  <option value="Product Launch">
                                    Product Launch
                                  </option>
                                  <option value="Generate Leads">
                                    Generate Leads
                                  </option>
                                  <option value="SaaS Subscriptions">
                                    Saas Subscriptions
                                  </option>
                                  <option value="Product Sales">
                                    Product Sales
                                  </option>
                                  <option value="Sell Tickets">
                                    Sell Tickets
                                  </option>
                                  <option value="Raise Awareness">
                                    Raise Awareness
                                  </option>
                                  <option value="Fundraising">
                                    Fundraising
                                  </option>
                                  <option value="Newsletter(communication)">
                                    Newsletter (communication)
                                  </option>
                                  <option value="Newsletter(marketing)">
                                    Newsletter (marketing)
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label
                                htmlFor="email-address"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Email: {email}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="relative">
                          <div className="">
                            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                              <>
                                <div className="col-span-full">
                                  <div>
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                      Your Campaign setup
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                      Lets setup your campaign.
                                    </p>
                                  </div>
                                  <div className="col-span-full mt-5">
                                    {/* Dynamic rendering based on user selection */}
                                    {campaignEmail === "Fundraising" && (
                                      <RaiseFunds />
                                    )}
                                    {campaignEmail === "SaaS Subscriptions" && (
                                      <Saas />
                                    )}
                                    {campaignEmail === "Raise Awareness" && (
                                      <Awareness />
                                    )}
                                    {campaignEmail === "Product Sales" && (
                                      <Ecommerce />
                                    )}
                                    {campaignEmail ===
                                      "Newsletter (communication)" && (
                                      <EmailNewsletter />
                                    )}
                                  </div>
                                </div>
                              </>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              </ModalBody>

              <ModalFooter className="bg-slate-50">
                <Button
                  color="success"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Save
                </Button>
                <Button
                  color="error"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SeriesModalComponent;

// import React, { useEffect, useState } from "react";
// import { account } from "../app/appwrite";
// import ReactQuill from "react-quill";
// import { EnvelopeIcon } from "@heroicons/react/20/solid";
// import RaiseFunds from "@/components/FundRaise";
// import Saas from "@/components/Saas";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
// } from "@nextui-org/react";
// import useSWR from "swr";
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import "react-quill/dist/quill.snow.css";

// const campaignsProducts = [
//   {
//     id: 1,
//     Name: "SaaS",
//     icon: EnvelopeIcon,
//     type: "Saas",
//     span: 1,
//     buttonClick: (type) => {
//       setCampaignEmail(type);
//     },
//   },
//   {
//     id: 2,
//     Name: "Raise awareness",
//     icon: EnvelopeIcon,
//     type: "Awareness",
//     span: 1,
//     buttonClick: (type) => {
//       setCampaignEmail(type);
//     },
//   },
//   {
//     id: 3,
//     Name: "eCommerce",
//     icon: EnvelopeIcon,
//     type: "Commerce",
//     span: 1,
//     buttonClick: (type) => {
//       setCampaignEmail(type);
//     },
//   },
//   {
//     id: 4,
//     Name: "Fund Raise",
//     icon: EnvelopeIcon,
//     type: "FundRaise",
//     span: 1,
//     buttonClick: (type) => {
//       setCampaignEmail(type);
//     },
//   },
//   {
//     id: 5,
//     Name: "Email & Newsletter",
//     icon: EnvelopeIcon,
//     type: "emailNewsletter",
//     span: 2,
//     buttonClick: (type) => {
//       setCampaignEmail(type);
//     },
//   },
// ];

// // Define your fetcher function
// const fetcher = (url) =>
//   fetch(url).then((res) => {
//     if (!res.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return res.json();
//   });

// const SeriesModalComponent = ({ isOpen, onClose }) => {
//   const [size, setSize] = useState("5xl");
//   const [backdrop, setBackdrop] = useState("opaque");
//   const [loading, setLoading] = useState(false);
//   const [wordCount, setWordCount] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [campaignEmail, setCampaignEmail] = useState(null);
//   const [email, setEmail] = useState(" ");
//   const [user, setUser] = useState(null);
//   const [modalPlacement, setModalPlacement] = useState("top");
//   const [accountUser, setAccountUser] = useState(null);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [articleData, setArticleData] = useState({
//     articleTitle: "",
//     coverImage: "",
//     articleBody: {
//       articleContent: {
//         bodyContent: "",
//         bodyImage: "",
//       },
//     },
//     categoryNiche: "",
//     isSeries: false,
//     seriesTitle: "",
//   });

//   // Fetch the user on component mount
//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const currentUser = await account.get();
//         setAccountUser(currentUser);
//         setUser(currentUser);
//         setEmail(currentUser.email);
//         setLoading(false);
//       } catch (error) {
//         console.log("Error fetching user:", error);
//         setLoading(false);
//       }
//     };

//     getUser();
//   }, []);

//   const { data: postsData, error: postsError } = useSWR(
//     user ? `/api/blog/getPosts?userId=${user.$id}` : null,
//     fetcher
//   );

//   const handleOpen = (post, backdrop) => {
//     setSelectedPost(post);
//     setBackdrop(backdrop);
//     setSize("4xl"); // Set the modal size
//     onOpen(); // Open the modal
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       setArticleData((prevData) => ({
//         ...prevData,
//         coverImage: reader.result, // This should be base64 encoded string
//       }));
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const [formData, setFormData] = useState({
//     brandName: "",
//     productName: "",
//     productImage: null,
//     website: "",
//     socialMedia: "",
//     productMessage: "",
//     additionalInfo: "",
//   });

//   const handleFormDataChange = (newFormData) => {
//     setFormData(newFormData);
//   };

//   const handleBodyChange = (content, delta, source, editor) => {
//     const text = editor.getText();
//     setArticleData({
//       ...articleData,
//       articleBody: {
//         ...articleData.articleBody,
//         articleContent: {
//           ...articleData.articleBody.articleContent,
//           bodyContent: content,
//         },
//       },
//     });
//     setWordCount(countWords(text));
//   };

//   // Handles category change
//   const handleCategoryChange = (event) => {
//     setArticleData({
//       ...articleData,
//       categoryNiche: event.target.value,
//     });
//   };

//   const handleSubmitForm = (e) => {
//     e.preventDefault();
//   };
//   const handleChange = (e) => {
//     e.preventDefault();
//   };

//   //   const handleModalOpen = () => {
//   //     setIsModalOpen(true);
//   //   };

//   return (
//     <div className="">
//       {/* Modal for displaying post details */}
//       <Modal
//         placement={modalPlacement}
//         size={size}
//         isOpen={isOpen}
//         onClose={onClose}
//       >
//         <ModalContent className="bg-slate-300 rounded-sm">
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1 bg-slate-50">
//                 Blog Series - {selectedPost?.title}
//               </ModalHeader>
//               <ModalBody className="bg-white">
//                 <>
//                   <div className="flex justify-center mt-5 px-4">
//                     <form onSubmit={handleSubmitForm}>
//                       <div className="space-y-12 mt-2">
//                         <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-2">
//                           <div>
//                             <h2 className="text-base font-semibold leading-7 text-gray-900">
//                               Basic Information
//                             </h2>
//                             <p className="mt-1 text-sm leading-6 text-gray-600">
//                               Some information about your campaign goals.
//                             </p>
//                           </div>

//                           <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
//                             <span className="sm:col-span-2">
//                               <div>
//                                 <label
//                                   htmlFor="first-name"
//                                   className="block text-md font-medium leading-6 text-gray-900"
//                                 >
//                                   {user.name}
//                                 </label>
//                               </div>

//                               {/* <div className="sm:col-span-2">
//                                 <p className="block text-xs font-medium text-gray-900">
//                                   {user.role}
//                                 </p>
//                               </div> */}
//                             </span>

//                             <div className="sm:col-span-3">
//                               <label
//                                 htmlFor="goal"
//                                 className="block text-sm font-medium leading-6 text-gray-900"
//                               >
//                                 Select your Campaign Goal
//                               </label>
//                               <div className="mt-2">
//                                 <select
//                                   id="goal"
//                                   name="goal"
//                                   autoComplete="goal-name"
//                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:max-w-xs sm:text-sm sm:leading-6"
//                                   onChange={handleChange}
//                                   value={formData.goal}
//                                 >
//                                   {/* <option>Product Launch</option>
//                                   <option>Generate Leads</option>
//                                   <option>SaaS Subscriptions</option>
//                                   <option>Product Sales</option>
//                                   <option>Sell Tickets</option> */}
//                                   <option>Raise Awareness</option>
//                                   <option>Fundraising</option>
//                                   <option>Newsletter(communication)</option>
//                                   <option>Newsletter(marketing)</option>
//                                 </select>
//                               </div>
//                             </div>

//                             <div className="col-span-full">
//                               <label
//                                 htmlFor="email-address"
//                                 className="block text-sm font-medium leading-6 text-gray-900"
//                               >
//                                 Email: {email}
//                               </label>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="relative">
//                           <div className="">
//                             <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
//                               <>
//                                 <div className="col-span-full">
//                                   <div>
//                                     <h2 className="text-base font-semibold leading-7 text-gray-900">
//                                       Your Campaign setup
//                                     </h2>
//                                     <p className="mt-1 text-sm leading-6 text-gray-600">
//                                       Lets setup your campaign.
//                                     </p>
//                                   </div>
//                                   <div className="col-span-full mt-5">
//                                     {/* Dynamic rendering based on user selection */}
//                                     {campaignEmail === "Saas" && <Saas />}
//                                     {campaignEmail === "FundRaise" && (
//                                       <RaiseFunds />
//                                     )}
//                                     {campaignEmail === "Awareness" && (
//                                       <Awareness />
//                                     )}
//                                     {campaignEmail === "emailNewsletter" && (
//                                       <EmailNewsletter />
//                                     )}
//                                     {campaignEmail === "Commerce" && (
//                                       <Ecommerce />
//                                     )}
//                                   </div>
//                                   <div className="mt-2">
//                                     <h2 className="text-base font-semibold leading-7 text-gray-900">
//                                       Email
//                                     </h2>
//                                     <p className="mt-1 text-sm leading-6 text-gray-600">
//                                       Compose a message for your email.
//                                     </p>
//                                   </div>
//                                   <div className="relative flex gap-x-3 mt-5">
//                                     <div className="flex h-6 items-center">
//                                       <input
//                                         id="check"
//                                         name="check"
//                                         type="checkbox"
//                                         value={formData.check}
//                                         checked
//                                         readOnly
//                                         className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
//                                       />
//                                     </div>
//                                     <div className="text-sm leading-6">
//                                       <label
//                                         htmlFor="check"
//                                         className="font-medium text-gray-900"
//                                       >
//                                         Generate Subject Line with AI
//                                         (Recommended 👍🏻)
//                                       </label>
//                                       <p className="text-gray-500">
//                                         Why is this recommended?
//                                       </p>
//                                     </div>
//                                   </div>
//                                   <div className="mt-2">
//                                     <input
//                                       type="text"
//                                       name="subject"
//                                       id="subject"
//                                       autoComplete="subject"
//                                       value={formData.subject}
//                                       onChange={handleChange}
//                                       placeholder="Subject Line: Write a fallback Subject line"
//                                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="col-span-full">
//                                   <label
//                                     htmlFor="message"
//                                     className="block text-sm font-medium leading-6 text-gray-900"
//                                   >
//                                     Email message
//                                   </label>
//                                   <div className="mt-2">
//                                     <ReactQuill
//                                       value={
//                                         articleData.articleBody.articleContent
//                                           .bodyContent
//                                       }
//                                       onChange={handleBodyChange}
//                                     />
//                                   </div>
//                                   <p className="mt-3 text-sm leading-6 text-gray-600">
//                                     Or click to generate message with AI.
//                                   </p>
//                                 </div>
//                                 <div className="col-span-full">
//                                   <p className="block text-sm font-medium leading-6 text-gray-600">
//                                     So what's happening behind the scene?
//                                   </p>
//                                   <div className="mt-2 flex items-center gap-x-3">
//                                     {/* <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" /> */}
//                                     <img
//                                       src="/images/info.png"
//                                       alt="info"
//                                       className="h-12 w-12 text-gray-300"
//                                       aria-hidden="true"
//                                     />
//                                     <button
//                                       type="button"
//                                       className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//                                     >
//                                       Click to find out
//                                     </button>
//                                   </div>
//                                 </div>
//                                 {/*START KNOWLEDGE BASE  */}
//                                 <div className="col-span-full">
//                                   <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 py-10">
//                                     <div className="text-center">
//                                       <svg
//                                         className="mx-auto h-12 w-12 text-gray-400"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                         aria-hidden="true"
//                                       >
//                                         <path
//                                           vectorEffect="non-scaling-stroke"
//                                           strokeLinecap="round"
//                                           strokeLinejoin="round"
//                                           strokeWidth={2}
//                                           d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
//                                         />
//                                       </svg>
//                                       <div>
//                                         <label
//                                           htmlFor="files"
//                                           className="block text-sm font-medium leading-6 text-gray-900"
//                                         >
//                                           Upload one or more knowledge base
//                                           document below
//                                         </label>
//                                         {/* <input {...getInputProps()} /> */}
//                                         <div className="flex flex-col cursor-pointer items-center justify-center gap-4 border border-dotted  h-24 rounded-lg">
//                                           {isDragActive ? (
//                                             <p>Drop the files here ...</p>
//                                           ) : (
//                                             <p>Drag or click to select file</p>
//                                           )}
//                                         </div>
//                                       </div>

//                                       {/* Preview */}
//                                       <section className="mt-6">
//                                         {/* Accepted files */}
//                                         <h3 className="title text-sm font-medium leading-6 text-gray-900 mt-4 border-b">
//                                           Accepted Files:{" "}
//                                           <span className="text-sm">
//                                             (.pdf | .txt | .doc)
//                                           </span>
//                                         </h3>
//                                         <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
//                                           {files.map((file) => (
//                                             <li
//                                               key={file.name}
//                                               className="relative w-14 h-16 rounded-md mx-2 shadow-lg"
//                                             >
//                                               {file.type ===
//                                               "application/pdf" ? (
//                                                 <img
//                                                   src="/images/pdf.png"
//                                                   alt={file.name}
//                                                   className="h-full w-full object-contain rounded-md"
//                                                 />
//                                               ) : file.type === "text/plain" ? (
//                                                 <img
//                                                   src="/images/txt.png"
//                                                   alt={file.name}
//                                                   className="h-full w-full object-contain rounded-md"
//                                                 />
//                                               ) : file.type ===
//                                                 "application/msword" ? (
//                                                 <img
//                                                   src="/images/doc.png"
//                                                   alt={file.name}
//                                                   className="h-full w-full object-contain rounded-md"
//                                                 />
//                                               ) : (
//                                                 "File type is not accepted"
//                                               )}
//                                               <button
//                                                 type="button"
//                                                 className="w-4 h-4 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
//                                                 onClick={() =>
//                                                   removeFile(file.name)
//                                                 }
//                                               >
//                                                 <XMarkIcon className="w-5 h-5 fill-slate-700 hover:fill-secondary-400 transition-colors" />
//                                               </button>
//                                               <p className="mt-2 text-neutral-500 text-[12px] font-medium">
//                                                 {file.name}
//                                               </p>
//                                             </li>
//                                           ))}
//                                         </ul>
//                                       </section>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 {/* END OF KNOWLEDGE BASE  */}
//                               </>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
//                           {/* HIDE REPORT BELOW */}
//                           {/* <div className="col-span-full">
//                         <div className="flex justify-center items-center">
//                         <div className="w-full max-w-screen-lg">
//                             <Report />
//                         </div>
//                     </div>
//                 </div> */}
//                         </div>
//                         <div className="mt-6 flex items-center justify-end gap-x-6">
//                           {/* {!submitted ? (
//                             <>
//                               <button
//                                 type="button"
//                                 className="text-sm font-semibold leading-6 text-gray-900"
//                               >
//                                 Cancel
//                               </button>
//                               <button
//                                 type="submit"
//                                 className={`rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${
//                                   loading ? "cursor-wait opacity-75" : "" // Disable button and show loading cursor when loading
//                                 }`}
//                                 disabled={loading}
//                               >
//                                 {loading ? "Researching..." : "Begin Research"}
//                               </button>
//                             </>
//                           ) : (
//                             submitted
//                           )} */}
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </>
//               </ModalBody>
//               <ModalFooter className="bg-slate-50">
//                 <Button color="primary" onPress={onClose}>
//                   Close Window
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// };

// export default SeriesModalComponent;
