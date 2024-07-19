"use client";
import React, { useState, useEffect, useRef } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { account } from "../appwrite";
import BCommerceArray from "@/components/bCommerceProd";
import ProductComponent from "../../components/ProductModal";
import { useRouter } from "next/navigation";
import SponsorsModalComponent from "@/components/SponsorsModalCompTwo";
import SponsMessage from "@/components/SponsMessageBox";
// import BlogCalendar from "@/components/Calendar";

const ChatAIBob = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const variant = "border-green";

  const router = useRouter();
  const fileInputRef = useRef(null);

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = user.$id;

      const response = await fetch(
        `/api/blog/userPostArticle?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            title: articleData.articleTitle,
            cover: articleData.coverImage,
            niche: articleData.categoryNiche,
            articleBody: articleData.articleBody.articleContent.bodyContent,
            features: articleData.articleFeatures,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        router.push("/pageChatBubble/previewarticle");
      } else {
        setMessage("Failed to create article");
      }
    } catch (error) {
      console.error("There was an error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.$id) {
      fetchNiche();
    }
  }, [user]);

  const [formData, setFormData] = useState({
    brandName: "",
    productName: "",
    productImage: null,
    website: "",
    socialMedia: "",
    productMessage: "",
    additionalInfo: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [articleData, setArticleData] = useState({
    articleTitle: "",
    coverImage: "",
    articleBody: {
      articleContent: {
        bodyContent: "",
        bodyImage: "",
        sponsorship: {
          productTitle: "",
          productUrl: "",
          productImage: "",
          productMessage: "",
        },
      },
    },
    categoryNiche: "",
    articleFeatures: {
      crossPromotion: null,
      publishEverywhere: null,
      podcastSingleCast: null,
      podcastMultiCast: null,
    },
  });

  const handleFeatureChange = (feature, value) => {
    setArticleData((prevData) => ({
      ...prevData,
      articleFeatures: {
        ...prevData.articleFeatures,
        [feature]: value,
      },
    }));
  };

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      fetchDrafts();
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setArticleData((prevData) => ({
        ...prevData,
        coverImage: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setArticleData((prevData) => ({
        ...prevData,
        articleBody: {
          ...prevData.articleBody,
          articleContent: {
            ...prevData.articleBody.articleContent,
            bodyImage: reader.result,
          },
        },
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAttachFileClick = () => {
    fileInputRef.current.click();
  };

  const handleModal = () => {
    setOpenModal(true);
  };

  const handleCodeFormatClick = () => {
    setArticleData((prevData) => ({
      ...prevData,
      articleBody: {
        ...prevData.articleBody,
        articleContent: {
          ...prevData.articleBody.articleContent,
          bodyContent: `\`\`\`\n${prevData.articleBody.articleContent.bodyContent}\n\`\`\``,
        },
      },
    }));
  };

  const handleSaveDraft = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = user.$id;

      const response = await fetch(
        `/api/blog/userPostArticle?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            title: articleData.articleTitle,
            cover: articleData.coverImage,
            niche: articleData.categoryNiche,
            articleBody: articleData.articleBody.articleContent.bodyContent,
            features: articleData.articleFeatures,
            isDraft: true,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setDrafts((prevDrafts) => [...prevDrafts, data.newArticle]);
        setMessage("Draft saved successfully");
        router.push("/pageChatBubble/previewarticle");
      } else {
        setMessage("Failed to save draft");
      }
    } catch (error) {
      console.error("There was an error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalizeArticle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = user.$id;

      const response = await fetch(
        `/api/blog/userPostArticle?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            title: articleData.articleTitle,
            cover: articleData.coverImage,
            niche: articleData.categoryNiche,
            articleBody: articleData.articleBody.articleContent.bodyContent,
            features: articleData.articleFeatures,
            isDraft: false,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        router.push("/pageChatBubble/previewarticle");
      } else {
        setMessage("Failed to create article");
      }
    } catch (error) {
      console.error("There was an error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNiche = async () => {
    try {
      const userId = user.$id;

      const response = await fetch(`/api/getNiche?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data) {
        console.log(data);
        setNiche(data.userNiche);
      }
    } catch (error) {
      console.error("Failed to fetch niche:", error);
    }
  };

  const fetchDrafts = async () => {
    try {
      const userId = user.$id;

      const response = await fetch(`/api/getDrafts?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data) {
        setDrafts(data.drafts);
      }
    } catch (error) {
      console.error("Failed to fetch drafts:", error);
    }
  };

  const handleEditDraft = (draft) => {
    setArticleData({
      articleTitle: draft.title,
      coverImage: draft.featureImage,
      articleBody: {
        articleContent: {
          bodyContent: draft.content,
          bodyImage: "",
          sponsorship: {
            productTitle: "",
            productUrl: "",
            productImage: "",
            productMessage: "",
          },
        },
      },
      categoryNiche: draft.categorySlug,
      articleFeatures: {
        crossPromotion: draft.crossPromote,
        publishEverywhere: draft.publishedChannels,
        podcastSingleCast: draft.podcastSingleCast,
        podcastMultiCast: draft.podcastMultiCast,
      },
    });
  };

  useEffect(() => {
    if (user && user.$id) {
      fetchNiche();
    }
  }, [user]);

  return (
    <>
      <div className="flex justify-center mt-5 px-4">
        <form onSubmit={handleSaveDraft}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="space-y-12 sm:space-y-16">
                <div className="my-4">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Write an article
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                    Use the entries below to compose and publish your article.
                    Need inspiration? Check out the tools in the right column.
                    Avoid writers block with our AI-powered brainstorming tool,
                    blogging tips, and monetization features.
                  </p>
                  <div className="mt-10 space-y-8 border-gray-900/10 pb-12 sm:space-y-0 sm:border-t sm:pb-0">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                      >
                        Article Title
                      </label>
                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                          <input
                            id="title"
                            name="title"
                            type="text"
                            onChange={(e) =>
                              setArticleData({
                                ...articleData,
                                articleTitle: e.target.value,
                              })
                            }
                            value={articleData.articleTitle}
                            placeholder="Give your article a title"
                            autoComplete="title"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                      <label
                        htmlFor="cover-photo"
                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                      >
                        Cover photo
                      </label>
                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <div className="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div className="text-center">
                            <PhotoIcon
                              aria-hidden="true"
                              className="mx-auto h-12 w-12 text-gray-300"
                            />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  onChange={handleFileChange}
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">
                              PNG, JPG, GIF up to 10MB
                            </p>
                            {articleData.coverImage && (
                              <img
                                src={articleData.coverImage}
                                alt="Cover"
                                className="mt-4 h-40 w-40 object-contain"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 mb-3">
                      <label
                        htmlFor="niche"
                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                      >
                        Your Niche
                      </label>
                      <div className="mt-2 sm:col-span-2 text-gray-700 sm:mt-0">
                        <span>Current category: {niche}</span>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                          <input
                            id="niche"
                            name="niche"
                            type="text"
                            onChange={(e) =>
                              setArticleData({
                                ...articleData,
                                categoryNiche: e.target.value,
                              })
                            }
                            value={articleData.categoryNiche}
                            placeholder="Please enter your niche within this category."
                            autoComplete="niche"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-700 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="block h-60">
                      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                          <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                            <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                              <button
                                type="button"
                                variant={variant}
                                onClick={handleAttachFileClick}
                                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                              >
                                <svg
                                  className="w-4 h-4"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 12 20"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                                  />
                                </svg>
                                <span className="sr-only">Attach file</span>
                              </button>
                              <button
                                type="button"
                                variant={variant}
                                onClick={() => fileInputRef.current.click()}
                                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                              >
                                <svg
                                  className="w-4 h-4"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 16 20"
                                >
                                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                </svg>
                                <span className="sr-only">Upload image</span>
                              </button>
                              <button
                                type="button"
                                variant={variant}
                                onClick={handleCodeFormatClick}
                                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                              >
                                <svg
                                  className="w-4 h-4"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 16 20"
                                >
                                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                  <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z" />
                                </svg>
                                <span className="sr-only">Format code</span>
                              </button>
                              <button
                                type="button"
                                onClick={handleModalOpen}
                                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                              >
                                <span className="text-xs text-gray-700 font-semibold">
                                  Add Sponsorship
                                </span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setOpenModal(true)}
                                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                              >
                                <span className="sr-only">Insert Product</span>
                                <span className="text-xs text-gray-700 font-semibold">
                                  Insert Product
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                          <label htmlFor="editor" className="sr-only">
                            Publish post
                          </label>
                          <textarea
                            id="body"
                            name="body"
                            rows="8"
                            onChange={(e) =>
                              setArticleData({
                                ...articleData,
                                articleBody: {
                                  ...articleData.articleBody,
                                  articleContent: {
                                    ...articleData.articleBody.articleContent,
                                    bodyContent: e.target.value,
                                  },
                                },
                              })
                            }
                            className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                            placeholder="Write an article..."
                            value={
                              articleData.articleBody.articleContent.bodyContent
                            }
                            required
                          />
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          {articleData.articleBody.articleContent.bodyImage && (
                            <img
                              src={
                                articleData.articleBody.articleContent.bodyImage
                              }
                              alt="Article"
                              className="mt-4 h-40 w-40 object-contain"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Features
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                    You may choose additional services to bolster your blog in
                    user engagement and growth
                  </p>
                  <div className="mt-10 space-y-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                    <fieldset>
                      <legend className="sr-only">Additional services</legend>
                      <div className="space-y-6 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:gap-4 sm:py-6">
                        <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                          <div className="text-sm font-semibold leading-6 text-gray-900">
                            Cross-Promotion
                            <br />
                            <span className="text-xs text-gray-700">
                              With Bloggers Network / Newsletter
                            </span>
                          </div>
                          <div className="mt-4 sm:col-span-2 sm:mt-0">
                            <div className="space-y-4">
                              <div className="flex items-center gap-x-3">
                                <input
                                  id="cross-promotion-yes"
                                  name="crossPromotion"
                                  type="radio"
                                  value={true}
                                  checked={
                                    articleData.articleFeatures.crossPromotion
                                  }
                                  onChange={() =>
                                    handleFeatureChange("crossPromotion", true)
                                  }
                                  className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                                />
                                <label
                                  htmlFor="cross-promotion-yes"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Yes
                                </label>
                              </div>
                              <div className="flex items-center gap-x-3">
                                <input
                                  id="cross-promotion-no"
                                  name="crossPromotion"
                                  type="radio"
                                  value={false}
                                  checked={
                                    !articleData.articleFeatures.crossPromotion
                                  }
                                  onChange={() =>
                                    handleFeatureChange("crossPromotion", false)
                                  }
                                  className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                                />
                                <label
                                  htmlFor="cross-promotion-no"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  No
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                          <div className="text-sm font-semibold leading-6 text-gray-900">
                            Publish Everywhere
                            <br />
                            <span className="text-xs text-gray-700">
                              ReBlug, Medium, Dev.to, Blogger, Tumblr,
                              Wordpress, Ghost e.t.c.
                            </span>
                          </div>
                          <div className="mt-4 sm:col-span-2 sm:mt-0">
                            <div className="space-y-4">
                              <div className="flex items-center gap-x-3">
                                <input
                                  id="publish-everywhere-yes"
                                  name="publishEverywhere"
                                  type="radio"
                                  value={true}
                                  checked={
                                    articleData.articleFeatures
                                      .publishEverywhere
                                  }
                                  onChange={() =>
                                    handleFeatureChange(
                                      "publishEverywhere",
                                      true
                                    )
                                  }
                                  className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                                />
                                <label
                                  htmlFor="publish-everywhere-yes"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Yes
                                </label>
                              </div>
                              <div className="flex items-center gap-x-3">
                                <input
                                  id="publish-everywhere-no"
                                  name="publishEverywhere"
                                  type="radio"
                                  value={false}
                                  checked={
                                    !articleData.articleFeatures
                                      .publishEverywhere
                                  }
                                  onChange={() =>
                                    handleFeatureChange(
                                      "publishEverywhere",
                                      false
                                    )
                                  }
                                  className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                                />
                                <label
                                  htmlFor="publish-everywhere-no"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  No
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                          <div className="text-sm font-semibold leading-6 text-gray-900">
                            Blog-2-Podcast
                            <br />
                            <span className="text-xs text-gray-700">
                              Turn your blog to Podcast? SingleCast features one
                              AI voice personality while MultiCast features
                              multiple AI voice personalities
                            </span>
                          </div>
                          <div className="mt-4 sm:col-span-2 sm:mt-0">
                            <div className="space-y-4">
                              <div className="flex items-center gap-x-3">
                                <input
                                  id="podcast-single-cast"
                                  name="blog-to-podcast"
                                  type="radio"
                                  value="singleCast"
                                  checked={
                                    articleData.articleFeatures
                                      .podcastSingleCast
                                  }
                                  onChange={() =>
                                    handleFeatureChange(
                                      "podcastSingleCast",
                                      true
                                    )
                                  }
                                  className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                                />
                                <label
                                  htmlFor="podcast-single-cast"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  SingleCast
                                </label>
                              </div>
                              <div className="flex items-center gap-x-3">
                                <input
                                  id="podcast-multi-cast"
                                  name="blog-to-podcast"
                                  disabled
                                  type="radio"
                                  value="multiCast"
                                  checked={
                                    articleData.articleFeatures.podcastMultiCast
                                  }
                                  onChange={() =>
                                    handleFeatureChange(
                                      "podcastMultiCast",
                                      true
                                    )
                                  }
                                  className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                                />
                                <label
                                  htmlFor="podcast-multi-cast"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  MultiCast{" "}
                                  <span className="text-xs">(coming soon)</span>
                                </label>
                              </div>
                              <div className="flex items-center gap-x-3">
                                <input
                                  id="no-podcast"
                                  name="blog-to-podcast"
                                  type="radio"
                                  value={false}
                                  checked={
                                    !articleData.articleFeatures
                                      .podcastSingleCast &&
                                    !articleData.articleFeatures
                                      .podcastMultiCast
                                  }
                                  onChange={() =>
                                    handleFeatureChange(
                                      "podcastSingleCast",
                                      false
                                    ) &&
                                    handleFeatureChange(
                                      "podcastMultiCast",
                                      false
                                    )
                                  }
                                  className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                                />
                                <label
                                  htmlFor="no-podcast"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  No
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => router.push("/dashboard")}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    onClick={handleSaveDraft}
                    variant="primary"
                    className="text-sm font-semibold leading-6"
                  >
                    Save & Preview
                    {/* Create text that shows 'saved' on Click */}
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              {/* <div className="mt-5 mx-auto">
                <p className="text-gray-500 text-lg">Schedule your Blog</p>
                <BlogCalendar />
              </div> */}
              <div className="flex flex-col mt-4">
                <p className="font-semibold text-lg text-gray-600 pl-1">
                  Tools
                </p>
                <div className="border mt-3 mx-2 px-3">
                  <Button className="my-2 mx-2" type="button">
                    Beginners Guide
                  </Button>
                  <Button className="my-2 mx-2 bg-stone-700" type="button">
                    Brainstorm Ideas
                  </Button>
                  {/* <Button className="my-2 mx-2 bg-lime-700" type="button">
                    Generate with AI
                  </Button> */}
                </div>
                <div className="mt-5">
                  <BCommerceArray />
                </div>
              </div>
              {openModal && (
                <ProductComponent
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                />
              )}
            </div>
          </div>
        </form>
        <div>
          <SponsorsModalComponent
            isOpen={isModalOpen}
            onClose={handleModalClose}
            formData={formData}
            setFormData={handleFormDataChange}
          />
          {formData.brandName &&
            formData.productName &&
            formData.productMessage &&
            formData.productImage && <SponsMessage formData={formData} />}
        </div>
      </div>
      {/* EDIT FROM HERE DOWN */}
      {/* <div className="flex justify-center mt-5 px-4">
        <form onSubmit={handleSaveDraft}>
          <div>
            <p>All is well</p>
          </div>
          <Button type="submit" variant={variant} onClick={handleSaveDraft}>
            Save Draft
          </Button>
          <Button
            type="submit"
            variant={variant}
            onClick={handleFinalizeArticle}
          >
            Finalize
          </Button>
        </form>

        {drafts.length > 0 && (
          <div>
            <h3>Your Drafts:</h3>
            <ul>
              {drafts.map((draft, index) => (
                <li key={index}>
                  {draft.title}
                  <Button
                    variant="outline"
                    onClick={() => handleEditDraft(draft)}
                  >
                    Edit
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div> */}
    </>
  );
};

export default ChatAIBob;

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { PhotoIcon } from "@heroicons/react/24/solid";
// import { Button } from "@/components/ui/button";
// import { account } from "../appwrite";
// import BCommerceArray from "@/components/bCommerceProd";
// import ProductComponent from "../../components/ProductModal";
// import { useRouter } from "next/navigation";
// import SponsorsModalComponent from "@/components/SponsorsModalCompTwo";
// import SponsMessage from "@/components/SponsMessageBox";
// // import BlogCalendar from "@/components/Calendar";

// const ChatAIBob = () => {
//   const [user, setUser] = useState(null);
//   const [name, setName] = useState("");
//   const [niche, setNiche] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [openModal, setOpenModal] = useState(false);
//   const variant = "border-green";

//   const router = useRouter();
//   const fileInputRef = useRef(null);

//   const [formData, setFormData] = useState({
//     brandName: "",
//     productName: "",
//     productImage: null,
//     website: "",
//     socialMedia: "",
//     productMessage: "",
//     additionalInfo: "",
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [articleData, setArticleData] = useState({
//     articleTitle: "",
//     coverImage: "",
//     articleBody: {
//       articleContent: {
//         bodyContent: "",
//         bodyImage: "",
//         sponsorship: {
//           productTitle: "",
//           productUrl: "",
//           productImage: "",
//           productMessage: "",
//         },
//       },
//     },
//     categoryNiche: "",
//     articleFeatures: {
//       crossPromotion: null,
//       publishEverywhere: null,
//       podcastSingleCast: null,
//       podcastMultiCast: null,
//     },
//   });

//   const handleFeatureChange = (feature, value) => {
//     setArticleData((prevData) => ({
//       ...prevData,
//       articleFeatures: {
//         ...prevData.articleFeatures,
//         [feature]: value,
//       },
//     }));
//   };

//   const handleFormDataChange = (newFormData) => {
//     setFormData(newFormData);
//   };

//   const handleModalOpen = () => {
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   useEffect(() => {
//     async function getUser() {
//       setLoading(true);
//       try {
//         const currentUser = await account.get();
//         setUser(currentUser);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     getUser();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       setName(user.name);
//     }
//   }, [user]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       setArticleData((prevData) => ({
//         ...prevData,
//         coverImage: reader.result,
//       }));
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       setArticleData((prevData) => ({
//         ...prevData,
//         articleBody: {
//           ...prevData.articleBody,
//           articleContent: {
//             ...prevData.articleBody.articleContent,
//             bodyImage: reader.result,
//           },
//         },
//       }));
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAttachFileClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleModal = () => {
//     setOpenModal(true);
//   };

//   const handleCodeFormatClick = () => {
//     setArticleData((prevData) => ({
//       ...prevData,
//       articleBody: {
//         ...prevData.articleBody,
//         articleContent: {
//           ...prevData.articleBody.articleContent,
//           bodyContent: `\`\`\`\n${prevData.articleBody.articleContent.bodyContent}\n\`\`\``,
//         },
//       },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const userId = user.$id;

//       const response = await fetch(
//         `/api/blog/userPostArticle?userId=${userId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId: userId,
//             title: articleData.articleTitle,
//             cover: articleData.coverImage,
//             niche: articleData.categoryNiche,
//             articleBody: articleData.articleBody.articleContent.bodyContent,
//             features: articleData.articleFeatures,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         router.push("/pageChatBubble/previewarticle");
//       } else {
//         setMessage("Failed to create article");
//       }
//     } catch (error) {
//       console.error("There was an error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchNiche = async () => {
//     try {
//       const userId = user.$id;

//       const response = await fetch(`/api/getNiche?userId=${userId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await response.json();
//       if (data) {
//         console.log(data);
//         setNiche(data.userNiche);
//       }
//     } catch (error) {
//       console.error("Failed to fetch niche:", error);
//     }
//   };

//   useEffect(() => {
//     if (user && user.$id) {
//       fetchNiche();
//     }
//   }, [user]);

//   return (
//     <>
//       <div className="flex justify-center mt-5 px-4">
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//             <div className="col-span-2">
//               <div className="space-y-12 sm:space-y-16">
//                 <div className="my-4">
//                   <h2 className="text-base font-semibold leading-7 text-gray-900">
//                     Write an article
//                   </h2>
//                   <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
//                     Use the entries below to compose and publish your article.
//                     Need inspiration? Check out the tools in the right column.
//                     Avoid writers block with our AI-powered brainstorming tool,
//                     blogging tips, and monetization features.
//                   </p>
//                   <div className="mt-10 space-y-8 border-gray-900/10 pb-12 sm:space-y-0 sm:border-t sm:pb-0">
//                     <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
//                       <label
//                         htmlFor="title"
//                         className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
//                       >
//                         Article Title
//                       </label>
//                       <div className="mt-2 sm:col-span-2 sm:mt-0">
//                         <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
//                           <input
//                             id="title"
//                             name="title"
//                             type="text"
//                             onChange={(e) =>
//                               setArticleData({
//                                 ...articleData,
//                                 articleTitle: e.target.value,
//                               })
//                             }
//                             value={articleData.articleTitle}
//                             placeholder="Give your article a title"
//                             autoComplete="title"
//                             className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
//                       <label
//                         htmlFor="cover-photo"
//                         className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
//                       >
//                         Cover photo
//                       </label>
//                       <div className="mt-2 sm:col-span-2 sm:mt-0">
//                         <div className="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//                           <div className="text-center">
//                             <PhotoIcon
//                               aria-hidden="true"
//                               className="mx-auto h-12 w-12 text-gray-300"
//                             />
//                             <div className="mt-4 flex text-sm leading-6 text-gray-600">
//                               <label
//                                 htmlFor="file-upload"
//                                 className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
//                               >
//                                 <span>Upload a file</span>
//                                 <input
//                                   id="file-upload"
//                                   name="file-upload"
//                                   onChange={handleFileChange}
//                                   type="file"
//                                   className="sr-only"
//                                 />
//                               </label>
//                               <p className="pl-1">or drag and drop</p>
//                             </div>
//                             <p className="text-xs leading-5 text-gray-600">
//                               PNG, JPG, GIF up to 10MB
//                             </p>
//                             {articleData.coverImage && (
//                               <img
//                                 src={articleData.coverImage}
//                                 alt="Cover"
//                                 className="mt-4 h-40 w-40 object-contain"
//                               />
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 mb-3">
//                       <label
//                         htmlFor="niche"
//                         className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
//                       >
//                         Your Niche
//                       </label>
//                       <div className="mt-2 sm:col-span-2 text-gray-700 sm:mt-0">
//                         <span>Current category: {niche}</span>
//                         <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
//                           <input
//                             id="niche"
//                             name="niche"
//                             type="text"
//                             onChange={(e) =>
//                               setArticleData({
//                                 ...articleData,
//                                 categoryNiche: e.target.value,
//                               })
//                             }
//                             value={articleData.categoryNiche}
//                             placeholder="Please enter your niche within this category."
//                             autoComplete="niche"
//                             className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-700 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="block h-60">
//                       <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
//                         <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
//                           <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
//                             <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
//                               <button
//                                 type="button"
//                                 variant={variant}
//                                 onClick={handleAttachFileClick}
//                                 className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
//                               >
//                                 <svg
//                                   className="w-4 h-4"
//                                   aria-hidden="true"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   fill="none"
//                                   viewBox="0 0 12 20"
//                                 >
//                                   <path
//                                     stroke="currentColor"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
//                                   />
//                                 </svg>
//                                 <span className="sr-only">Attach file</span>
//                               </button>
//                               <button
//                                 type="button"
//                                 variant={variant}
//                                 onClick={() => fileInputRef.current.click()}
//                                 className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
//                               >
//                                 <svg
//                                   className="w-4 h-4"
//                                   aria-hidden="true"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   fill="currentColor"
//                                   viewBox="0 0 16 20"
//                                 >
//                                   <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
//                                   <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
//                                 </svg>
//                                 <span className="sr-only">Upload image</span>
//                               </button>
//                               <button
//                                 type="button"
//                                 variant={variant}
//                                 onClick={handleCodeFormatClick}
//                                 className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
//                               >
//                                 <svg
//                                   className="w-4 h-4"
//                                   aria-hidden="true"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   fill="currentColor"
//                                   viewBox="0 0 16 20"
//                                 >
//                                   <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
//                                   <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z" />
//                                 </svg>
//                                 <span className="sr-only">Format code</span>
//                               </button>
//                               <button
//                                 type="button"
//                                 onClick={handleModalOpen}
//                                 className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
//                               >
//                                 <span className="text-xs text-gray-700 font-semibold">
//                                   Add Sponsorship
//                                 </span>
//                               </button>
//                               <button
//                                 type="button"
//                                 onClick={() => setOpenModal(true)}
//                                 className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
//                               >
//                                 <span className="sr-only">Insert Product</span>
//                                 <span className="text-xs text-gray-700 font-semibold">
//                                   Insert Product
//                                 </span>
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
//                           <label htmlFor="editor" className="sr-only">
//                             Publish post
//                           </label>
//                           <textarea
//                             id="body"
//                             name="body"
//                             rows="8"
//                             onChange={(e) =>
//                               setArticleData({
//                                 ...articleData,
//                                 articleBody: {
//                                   ...articleData.articleBody,
//                                   articleContent: {
//                                     ...articleData.articleBody.articleContent,
//                                     bodyContent: e.target.value,
//                                   },
//                                 },
//                               })
//                             }
//                             className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
//                             placeholder="Write an article..."
//                             value={
//                               articleData.articleBody.articleContent.bodyContent
//                             }
//                             required
//                           />
//                           <input
//                             type="file"
//                             ref={fileInputRef}
//                             onChange={handleImageUpload}
//                             className="hidden"
//                           />
//                           {articleData.articleBody.articleContent.bodyImage && (
//                             <img
//                               src={
//                                 articleData.articleBody.articleContent.bodyImage
//                               }
//                               alt="Article"
//                               className="mt-4 h-40 w-40 object-contain"
//                             />
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <h2 className="text-base font-semibold leading-7 text-gray-900">
//                     Features
//                   </h2>
//                   <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
//                     You may choose additional services to bolster your blog in
//                     user engagement and growth
//                   </p>
//                   <div className="mt-10 space-y-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
//                     <fieldset>
//                       <legend className="sr-only">Additional services</legend>
//                       <div className="space-y-6 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:gap-4 sm:py-6">
//                         <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
//                           <div className="text-sm font-semibold leading-6 text-gray-900">
//                             Cross-Promotion
//                             <br />
//                             <span className="text-xs text-gray-700">
//                               With Bloggers Network / Newsletter
//                             </span>
//                           </div>
//                           <div className="mt-4 sm:col-span-2 sm:mt-0">
//                             <div className="space-y-4">
//                               <div className="flex items-center gap-x-3">
//                                 <input
//                                   id="cross-promotion-yes"
//                                   name="crossPromotion"
//                                   type="radio"
//                                   value={true}
//                                   checked={
//                                     articleData.articleFeatures.crossPromotion
//                                   }
//                                   onChange={() =>
//                                     handleFeatureChange("crossPromotion", true)
//                                   }
//                                   className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
//                                 />
//                                 <label
//                                   htmlFor="cross-promotion-yes"
//                                   className="block text-sm font-medium leading-6 text-gray-900"
//                                 >
//                                   Yes
//                                 </label>
//                               </div>
//                               <div className="flex items-center gap-x-3">
//                                 <input
//                                   id="cross-promotion-no"
//                                   name="crossPromotion"
//                                   type="radio"
//                                   value={false}
//                                   checked={
//                                     !articleData.articleFeatures.crossPromotion
//                                   }
//                                   onChange={() =>
//                                     handleFeatureChange("crossPromotion", false)
//                                   }
//                                   className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
//                                 />
//                                 <label
//                                   htmlFor="cross-promotion-no"
//                                   className="block text-sm font-medium leading-6 text-gray-900"
//                                 >
//                                   No
//                                 </label>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
//                           <div className="text-sm font-semibold leading-6 text-gray-900">
//                             Publish Everywhere
//                             <br />
//                             <span className="text-xs text-gray-700">
//                               ReBlug, Medium, Dev.to, Blogger, Tumblr,
//                               Wordpress, Ghost e.t.c.
//                             </span>
//                           </div>
//                           <div className="mt-4 sm:col-span-2 sm:mt-0">
//                             <div className="space-y-4">
//                               <div className="flex items-center gap-x-3">
//                                 <input
//                                   id="publish-everywhere-yes"
//                                   name="publishEverywhere"
//                                   type="radio"
//                                   value={true}
//                                   checked={
//                                     articleData.articleFeatures
//                                       .publishEverywhere
//                                   }
//                                   onChange={() =>
//                                     handleFeatureChange(
//                                       "publishEverywhere",
//                                       true
//                                     )
//                                   }
//                                   className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
//                                 />
//                                 <label
//                                   htmlFor="publish-everywhere-yes"
//                                   className="block text-sm font-medium leading-6 text-gray-900"
//                                 >
//                                   Yes
//                                 </label>
//                               </div>
//                               <div className="flex items-center gap-x-3">
//                                 <input
//                                   id="publish-everywhere-no"
//                                   name="publishEverywhere"
//                                   type="radio"
//                                   value={false}
//                                   checked={
//                                     !articleData.articleFeatures
//                                       .publishEverywhere
//                                   }
//                                   onChange={() =>
//                                     handleFeatureChange(
//                                       "publishEverywhere",
//                                       false
//                                     )
//                                   }
//                                   className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
//                                 />
//                                 <label
//                                   htmlFor="publish-everywhere-no"
//                                   className="block text-sm font-medium leading-6 text-gray-900"
//                                 >
//                                   No
//                                 </label>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
//                           <div className="text-sm font-semibold leading-6 text-gray-900">
//                             Blog-2-Podcast
//                             <br />
//                             <span className="text-xs text-gray-700">
//                               Turn your blog to Podcast? SingleCast features one
//                               AI voice personality while MultiCast features
//                               multiple AI voice personalities
//                             </span>
//                           </div>
//                           <div className="mt-4 sm:col-span-2 sm:mt-0">
//                             <div className="space-y-4">
//                               <div className="flex items-center gap-x-3">
//                                 <input
//                                   id="podcast-single-cast"
//                                   name="blog-to-podcast"
//                                   type="radio"
//                                   value="singleCast"
//                                   checked={
//                                     articleData.articleFeatures
//                                       .podcastSingleCast
//                                   }
//                                   onChange={() =>
//                                     handleFeatureChange(
//                                       "podcastSingleCast",
//                                       true
//                                     )
//                                   }
//                                   className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
//                                 />
//                                 <label
//                                   htmlFor="podcast-single-cast"
//                                   className="block text-sm font-medium leading-6 text-gray-900"
//                                 >
//                                   SingleCast
//                                 </label>
//                               </div>
//                               <div className="flex items-center gap-x-3">
//                                 <input
//                                   id="podcast-multi-cast"
//                                   name="blog-to-podcast"
//                                   disabled
//                                   type="radio"
//                                   value="multiCast"
//                                   checked={
//                                     articleData.articleFeatures.podcastMultiCast
//                                   }
//                                   onChange={() =>
//                                     handleFeatureChange(
//                                       "podcastMultiCast",
//                                       true
//                                     )
//                                   }
//                                   className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
//                                 />
//                                 <label
//                                   htmlFor="podcast-multi-cast"
//                                   className="block text-sm font-medium leading-6 text-gray-900"
//                                 >
//                                   MultiCast{" "}
//                                   <span className="text-xs">(coming soon)</span>
//                                 </label>
//                               </div>
//                               <div className="flex items-center gap-x-3">
//                                 <input
//                                   id="no-podcast"
//                                   name="blog-to-podcast"
//                                   type="radio"
//                                   value={false}
//                                   checked={
//                                     !articleData.articleFeatures
//                                       .podcastSingleCast &&
//                                     !articleData.articleFeatures
//                                       .podcastMultiCast
//                                   }
//                                   onChange={() =>
//                                     handleFeatureChange(
//                                       "podcastSingleCast",
//                                       false
//                                     ) &&
//                                     handleFeatureChange(
//                                       "podcastMultiCast",
//                                       false
//                                     )
//                                   }
//                                   className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
//                                 />
//                                 <label
//                                   htmlFor="no-podcast"
//                                   className="block text-sm font-medium leading-6 text-gray-900"
//                                 >
//                                   No
//                                 </label>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </fieldset>
//                   </div>
//                 </div>
//                 <div className="mt-6 flex items-center justify-end gap-x-6">
//                   <Button
//                     type="button"
//                     variant="secondary"
//                     onClick={() => router.push("/dashboard")}
//                     className="text-sm font-semibold leading-6 text-gray-900"
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     type="submit"
//                     onClick={handleSubmit}
//                     variant="primary"
//                     className="text-sm font-semibold leading-6"
//                   >
//                     Save & Preview
//                     {/* Create text that shows 'saved' on Click */}
//                   </Button>
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col mt-4">
//               {/* <div className="mt-5 mx-auto">
//                 <p className="text-gray-500 text-lg">Schedule your Blog</p>
//                 <BlogCalendar />
//               </div> */}
//               <div className="flex flex-col mt-4">
//                 <p className="font-semibold text-lg text-gray-600 pl-1">
//                   Tools
//                 </p>
//                 <div className="border mt-3 mx-2 px-3">
//                   <Button className="my-2 mx-2" type="button">
//                     Beginners Guide
//                   </Button>
//                   <Button className="my-2 mx-2 bg-stone-700" type="button">
//                     Brainstorm Ideas
//                   </Button>
//                   {/* <Button className="my-2 mx-2 bg-lime-700" type="button">
//                     Generate with AI
//                   </Button> */}
//                 </div>
//                 <div className="mt-5">
//                   <BCommerceArray />
//                 </div>
//               </div>
//               {openModal && (
//                 <ProductComponent
//                   openModal={openModal}
//                   setOpenModal={setOpenModal}
//                 />
//               )}
//             </div>
//           </div>
//         </form>
//         <div>
//           <SponsorsModalComponent
//             isOpen={isModalOpen}
//             onClose={handleModalClose}
//             formData={formData}
//             setFormData={handleFormDataChange}
//           />
//           {formData.brandName &&
//             formData.productName &&
//             formData.productMessage &&
//             formData.productImage && <SponsMessage formData={formData} />}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChatAIBob;
