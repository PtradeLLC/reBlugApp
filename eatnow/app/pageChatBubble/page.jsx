"use client";
import React, { useState, useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { account } from "../appwrite";
import { Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const ChatAIBob = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const variant = "bordered";
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
      comments: null,
      crossPromotion: null,
      publishEverywhere: null,
    },
  });
  const router = useRouter();

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

  const handlePreview = () => {
    router.push("./previewarticle");
  };

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

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Response data:", data);
      // Optionally, reset articleData state here if needed
    } catch (error) {
      console.error("There was an error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="text-gray-700 text-center font-bold text-xl">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-5 px-4">
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="space-y-12 sm:space-y-16">
              <div className="my-4">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Write an article
                </h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                  Use the entries below to compose and publish your article.
                  Need inspiration? Check out the tools in the right column.
                  They include AI-powered brainstorming, blogging tips, and
                  monetization features.
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
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">
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
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
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
                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">
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
                          placeholder="Enter your niche"
                          autoComplete="niche"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="block h-60">
                    <Textarea
                      isRequired
                      label="Article Content"
                      height={50}
                      labelPlacement="outside"
                      placeholder="Write your content here"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      onChange={(e) =>
                        setArticleData((prevData) => ({
                          ...prevData,
                          articleBody: {
                            ...prevData.articleBody,
                            articleContent: {
                              ...prevData.articleBody.articleContent,
                              bodyContent: e.target.value,
                            },
                          },
                        }))
                      }
                      value={articleData.articleBody.articleContent.bodyContent}
                      variant={variant}
                      maxRows={10}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Features
                </h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                  You may choose additional services to bolster your blog in
                  these areas (Engagement, Growth)
                </p>
                <div className="mt-10 space-y-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                  <fieldset>
                    <legend className="sr-only">Additional services</legend>
                    <div className="space-y-6 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:gap-4 sm:py-6">
                      <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                        <div className="text-sm font-semibold leading-6 text-gray-900">
                          AI Powered Commenting
                        </div>
                        <div className="mt-4 sm:col-span-2 sm:mt-0">
                          <div className="space-y-4">
                            <div className="flex items-center gap-x-3">
                              <input
                                id="comments-yes"
                                name="comments"
                                type="radio"
                                checked={
                                  articleData.articleFeatures.comments === true
                                }
                                onChange={() =>
                                  setArticleData((prevData) => ({
                                    ...prevData,
                                    articleFeatures: {
                                      ...prevData.articleFeatures,
                                      comments: true,
                                    },
                                  }))
                                }
                                className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                              />
                              <label
                                htmlFor="comments-yes"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Yes
                              </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                              <input
                                id="comments-no"
                                name="comments"
                                type="radio"
                                checked={
                                  articleData.articleFeatures.comments === false
                                }
                                onChange={() =>
                                  setArticleData((prevData) => ({
                                    ...prevData,
                                    articleFeatures: {
                                      ...prevData.articleFeatures,
                                      comments: false,
                                    },
                                  }))
                                }
                                className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                              />
                              <label
                                htmlFor="comments-no"
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
                          Cross-Promotion
                        </div>
                        <div className="mt-4 sm:col-span-2 sm:mt-0">
                          <div className="space-y-4">
                            <div className="flex items-center gap-x-3">
                              <input
                                id="cross-promotion-yes"
                                name="cross-promotion"
                                type="radio"
                                checked={
                                  articleData.articleFeatures.crossPromotion ===
                                  true
                                }
                                onChange={() =>
                                  setArticleData((prevData) => ({
                                    ...prevData,
                                    articleFeatures: {
                                      ...prevData.articleFeatures,
                                      crossPromotion: true,
                                    },
                                  }))
                                }
                                className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
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
                                name="cross-promotion"
                                type="radio"
                                checked={
                                  articleData.articleFeatures.crossPromotion ===
                                  false
                                }
                                onChange={() =>
                                  setArticleData((prevData) => ({
                                    ...prevData,
                                    articleFeatures: {
                                      ...prevData.articleFeatures,
                                      crossPromotion: false,
                                    },
                                  }))
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
                        </div>
                        <div className="mt-4 sm:col-span-2 sm:mt-0">
                          <div className="space-y-4">
                            <div className="flex items-center gap-x-3">
                              <input
                                id="publish-everywhere-yes"
                                name="publish-everywhere"
                                type="radio"
                                checked={
                                  articleData.articleFeatures
                                    .publishEverywhere === true
                                }
                                onChange={() =>
                                  setArticleData((prevData) => ({
                                    ...prevData,
                                    articleFeatures: {
                                      ...prevData.articleFeatures,
                                      publishEverywhere: true,
                                    },
                                  }))
                                }
                                className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
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
                                name="publish-everywhere"
                                type="radio"
                                checked={
                                  articleData.articleFeatures
                                    .publishEverywhere === false
                                }
                                onChange={() =>
                                  setArticleData((prevData) => ({
                                    ...prevData,
                                    articleFeatures: {
                                      ...prevData.articleFeatures,
                                      publishEverywhere: false,
                                    },
                                  }))
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
                    </div>
                  </fieldset>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Button
                  type="button"
                  variant="secondary"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handlePreview}
                  variant="primary"
                  className="text-sm font-semibold leading-6"
                >
                  Preview & Publish
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-lg text-gray-600 pl-1">Tools</p>
            <div className="border mt-3 mx-2 px-3">
              <Button className="my-2 mx-2" type="button">
                Beginners Guide
              </Button>
              <Button className="my-2 mx-2 bg-stone-700" type="button">
                Brainstorm Ideas
              </Button>
              <Button className="my-2 mx-2 bg-red-700" type="button">
                Include Sponsor
              </Button>
              <Button className="my-2 mx-2 bg-lime-700" type="button">
                Generate with AI
              </Button>
              <Button className="my-2 mx-2 bg-blue-800" type="button">
                Article Assistant for your website
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatAIBob;
