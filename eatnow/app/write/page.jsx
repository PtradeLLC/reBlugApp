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
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const ChatAIBob = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [message, setMessage] = useState(" ");
  const [wordCount, setWordCount] = useState(0);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const variant = "border-green";
  const router = useRouter();
  const fileInputRef = useRef(null);

  //Gets User from appwrite
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

  //Handles user submit
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
        router.push("/write/previewarticle");
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
      crossPromotion: false,
      publishEverywhere: false,
      podcastSingleCast: false,
      podcastMultiCast: false,
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

  //Converts cover image to base64
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

  // converts Article body to base64
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
            bodyImage: reader.result, // This should be base64 encoded string
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

  //Saves Article as draft until approved before publishing
  const handleSaveDraft = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user || !user.$id) {
        throw new Error("User is not available.");
      }

      const userId = user.$id;
      const slug = generateSlug(articleData.articleTitle);

      const response = await fetch(`/api/blog/userPostArticle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          title: articleData.articleTitle,
          featureImage: articleData.coverImage,
          content: articleData.articleBody.articleContent.bodyContent, // Send raw content
          categorySlug: articleData.categoryNiche,
          publishedChannels: false,
          crossPromote: false,
          podcastSingleCast: true,
          podcastMultiCast: false,
          isDraft: true,
          slug: slug,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save draft");
      }

      const data = await response.json();
      setDrafts((prevDrafts) => [...prevDrafts, data.newArticle]);
      setMessage("Your draft has been saved successfully");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      // Reset form data//
      // setArticleData({
      //   articleTitle: "",
      //   coverImage: null,
      //   bodyContent: "",
      //   categoryNiche: "",
      //   publishedChannels: false,
      //   crossPromote: false,
      //   podcastSingleCast: false,
      //   podcastMultiCast: false,
      // });
    } catch (error) {
      console.error("There was an error:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  // Utility function to generate a slug from a title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
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
        router.push("/write/previewarticle");
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

  const countWords = (text) => {
    const words = text.trim().split(/\s+/);
    return words.filter((word) => word.length > 0).length;
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
                  <div className="mt-10 space-y-8 border-gray-900/10 pb-1 sm:space-y-0 sm:border-t sm:pb-0">
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
                              PNG, JPG, GIF up to 5MB
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
                        <div className=" px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                          <label htmlFor="editor" className="sr-only">
                            Publish post
                          </label>
                          <div className="">
                            <ReactQuill
                              value={
                                articleData.articleBody.articleContent
                                  .bodyContent
                              }
                              onChange={handleBodyChange}
                              modules={{
                                toolbar: [
                                  [
                                    { header: "1" },
                                    { header: "2" },
                                    { font: [] },
                                  ],
                                  [{ list: "ordered" }, { list: "bullet" }],
                                  ["bold", "italic", "underline"],
                                  [{ align: [] }],
                                  ["link", "image"],
                                  ["clean"],
                                ],
                              }}
                              formats={[
                                "header",
                                "font",
                                "list",
                                "bullet",
                                "bold",
                                "italic",
                                "underline",
                                "align",
                                "link",
                                "image",
                              ]}
                              className=" max-h-48 overflow-y-auto block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                              placeholder="Start your article here..."
                            />
                          </div>
                          <div
                            className={`mt-1 mb-1 ${wordCount >= 600 ? "text-green-500" : "text-red-500"} text-xs px-4`}
                          >
                            You currently have: {wordCount} words. Your article
                            must be at least 600 words at the minimum to
                            publish.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
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
                        {/* Cross-Promotion */}
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
                                    articleData.articleFeatures
                                      .crossPromotion === true
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
                                    articleData.articleFeatures
                                      .crossPromotion === false
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

                        {/* Publish Everywhere */}
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
                                      .publishEverywhere === true
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
                                    articleData.articleFeatures
                                      .publishEverywhere === false
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

                        {/* Blog-2-Podcast */}
                        <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                          <div className="text-sm font-semibold leading-6 text-gray-900">
                            Blog-2-Podcast
                            <br />
                            <span className="text-xs text-gray-700">
                              Turn your blog to Podcast? SingleCast features one
                              AI voice personality while MultiCast features
                              multiple AI conversations
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
                                      .podcastSingleCast === true
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
                                    articleData.articleFeatures
                                      .podcastMultiCast === true
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
                                    articleData.articleFeatures
                                      .podcastSingleCast === false &&
                                    articleData.articleFeatures
                                      .podcastMultiCast === false
                                  }
                                  onChange={() => {
                                    handleFeatureChange(
                                      "podcastSingleCast",
                                      false
                                    );
                                    handleFeatureChange(
                                      "podcastMultiCast",
                                      false
                                    );
                                  }}
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
                    className="text-sm text-gray-900 font-semibold leading-6 hover:bg-slate-400 hover:text-white"
                  >
                    Save & Preview
                  </Button>
                </div>
                {message && (
                  <div className="mt-4 flex justify-end font-semibold text-green-600 text-lg">
                    {message}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col mt-4">
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
    </>
  );
};

export default ChatAIBob;
