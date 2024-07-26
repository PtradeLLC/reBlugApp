"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@nextui-org/react";
import WisdomNugget from "./WisdomNugget";
import ChatUI from "./ChatBox/AIChatBox";
import ArticleInfo from "./Blogs/ArticleInfo";
import CommentBox from "./Blogs/CommentBox";
import BrandCollaborate from "./Blogs/Collaborate";

const extractPlainText = (htmlString) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  const text = tempDiv.textContent || tempDiv.innerText || "";

  // Split text into paragraphs based on sentence endings.
  const paragraphs = text.split(/(?<=[.!?])\s+/).filter(Boolean);

  return paragraphs;
};

const PostPage = ({ comments, post }) => {
  const [newComment, setNewComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isCollaborateModalOpen, setIsCollaborateModalOpen] = useState(false);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleTextAreaClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (newComment.trim() !== "") {
      try {
        const response = await fetch("/api/blog/commentsystem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: newComment,
            postTitle: post.title,
            postId: post.id,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to post comment");
        }

        const responseData = await response.json();
        setNewComment("");
      } catch (error) {
        console.error("Error posting comment:", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSignUp = () => {
    if (!session) {
      router.push("/login");
    }
  };

  const handleFinalizeArticle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/blog/finalizeArticle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: post.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to finalize the article");
      }

      const responseData = await response.json();
    } catch (error) {
      console.error("Error finalizing the article:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20">
      <div className="relative mt-2 bg-[#ced4da] pb-20 sm:pb-24 xl:pb-0">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute left-[calc(50%-19rem)] top-[calc(50%-36rem)] transform-gpu blur-3xl">
            <div
              className="aspect-[1097/1023] w-[68.5625rem] bg-gradient-to-r from-[#707070] to-[#44434b] opacity-25"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
          <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
            <div className="relative flex justify-center items-center aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
              {loading ? (
                <div className="flex justify-center">
                  <CircularProgress
                    aria-label="Loading..."
                    size="sm"
                    value={value}
                    color="warning"
                    className="mx-2"
                    showValueLabel={true}
                  />
                </div>
              ) : (
                <img
                  src={post?.featureImage || "/images/bloger3.jpg"}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectPosition: "top",
                  }}
                  width={500}
                  height={500}
                  alt={post?.title}
                  fallback={
                    <CircularProgress
                      aria-label="Loading..."
                      size="sm"
                      value={value}
                      color="warning"
                      className="mx-2"
                      showValueLabel={true}
                    />
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {post && (
        <>
          <div className="max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 justify-center px-6 mx-auto bg-slate-50 rounded-md">
            <span className="w-86 pr-4 sm:justify-center pl-2 my-12">
              <h1 className="font-semibold border border-gray-300 rounded-lg p-2 text-gray-700 text-2xl">
                {post?.title}
              </h1>
              <ul className="mt-2 mb-4 text-sm bg-slate-100 rounded ">
                <li className="flex item-center border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  {/* <img className="w-7 h-7 mr-1" src={`${post.image} `} />{" "} */}
                  Author: {post.author || "No named Author"}
                </li>
                {/* <li className="flex item-center  focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <img className="w-7 h-7 mr-1" src="/images/category.png" />
                  Category: {post?.category?.title || "No category set yet"}
                  Niche: {"None set"}
                </li> */}
                <li className="flex item-center  focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <img className="w-7 h-7 mr-1" src="/images/users.png" />
                  <div className="">Readership: N/A</div>
                </li>
                <li className="flex item-center border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <img className="w-7 h-7 mr-1" src="/images/submit.png" />
                  <button
                    onClick={() => setIsCollaborateModalOpen(true)}
                    className="px-4 py-2 mt-4 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300"
                  >
                    Collaborate with me
                  </button>
                  <BrandCollaborate
                    isOpen={isCollaborateModalOpen}
                    onClose={() => setIsCollaborateModalOpen(false)}
                  />
                  {/* <button
                    onClick={() => setIsCollaborateModalOpen(true)}
                    name="ProductSubmission"
                    type="button"
                  >
                    Collaborate with me
                  </button> */}
                </li>
              </ul>
              <WisdomNugget />
            </span>

            <span className="col-span-2 my-4 p-2">
              <span className="flex">
                <span className="text-xs flex justify-end my-2">
                  Views: {post?.views}
                </span>
              </span>
              <span className="flex justify-center items-center">
                {loading ? (
                  <div className="flex justify-center">
                    <CircularProgress
                      aria-label="Loading..."
                      size="sm"
                      value={value}
                      color="warning"
                      className="mx-2"
                      showValueLabel={true}
                    />
                  </div>
                ) : (
                  <div className="text-lg">
                    {extractPlainText(post.content).map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </span>
              <hr className="w-48 h-1 mx-auto my-4 bg-gray-300 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
              <span className="">
                <CommentBox
                  showModal={showModal}
                  post={post}
                  comments={comments}
                  setShowModal={setShowModal}
                />
              </span>
              <form onSubmit={handleSubmit}>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label htmlFor="comment" className="sr-only">
                      Share your thoughts
                    </label>
                    <textarea
                      id="comment"
                      rows="4"
                      className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                      placeholder="Share your thoughts..."
                      value={newComment}
                      onChange={handleCommentChange}
                      onClick={handleTextAreaClick}
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                    <button
                      type="submit"
                      className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800"
                    >
                      Post comment
                      {loading && (
                        <div className="flex justify-center">
                          <CircularProgress
                            aria-label="Loading..."
                            size="sm"
                            value={value}
                            color="warning"
                            className="mx-2"
                            showValueLabel={true}
                          />
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </form>
              {/* <div className="flex justify-en space-x-2">
                <Button className="bg-red-800 text-center text-white font-bold rounded-md">
                  Back to Edit
                </Button>
                <Button
                  type="submit"
                  onClick={handleFinalizeArticle}
                  className="bg-green-800 text-center text-white font-bold rounded-md"
                >
                  Publish Article
                </Button>
              </div> */}
            </span>
          </div>
        </>
      )}
      <div>
        <ChatUI
          postContent={post?.content}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      {/* <div className="mx-4 px-2">
        <SubmissionInfo
          isOpen={isSubmissionModalOpen}
          setIsOpen={setIsSubmissionModalOpen}
        />
      </div> */}
      <div className="mx-4 px-2">
        <ArticleInfo
          isOpen={isArticleModalOpen}
          setIsOpen={setIsArticleModalOpen}
        />
      </div>
      <Button
        onClick={() => setIsOpen(true)}
        className="article-assistant-button rotate-90 z-50 bg-[#878784] hover:bg-slate-700 hover:text-white text-black h-8 text-center font-semibold px-4 rounded-md animate-pulse"
      >
        <span className="flex">
          <Image
            src="/images/questionmark.png"
            width={25}
            height={25}
            alt="Ask the article"
          />
        </span>
        Chat with this Article
      </Button>
    </div>
  );
};

export default PostPage;
