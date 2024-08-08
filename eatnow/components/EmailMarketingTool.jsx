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
