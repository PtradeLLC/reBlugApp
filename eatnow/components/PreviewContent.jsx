"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@nextui-org/react";
import WisdomNugget from "./WisdomNugget";
import ChatUI from "./ChatBox/AIChatBox";
import ArticleInfo from "./Blogs/ArticleInfo";
import CommentBox from "./Blogs/CommentBox";
import { account } from "../app/appwrite";
import BrandCollaborate from "./Blogs/Collaborate";
import BlogChatUI from "./ChatBox/AIBlogArticleAssistant";
import InSeries from "./Series";
import PostSubscription from "./PostSubscription";

const extractPlainText = (htmlString) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  const text = tempDiv.textContent || tempDiv.innerText || "";

  // Split text into paragraphs based on sentence endings.
  const paragraphs = text.split(/(?<=[.!?])\s+/).filter(Boolean);

  return paragraphs;
};

const UserComment = ({ comment, userName }) => (
  <div className="bg-white p-4 rounded-lg mt-4 mb-3 grid overflow-y-auto border">
    <div className="flex items-center">
      <div className="h-8 w-8 sm:mx-0 sm:h-8 sm:w-8">
        {comment ? (
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white rounded-full"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M5 8a4 4 0 1 1 7.796 1.263l-2.533 2.534A4 4 0 0 1 5 8Zm4.06 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h2.172a2.999 2.999 0 0 1-.114-1.588l.674-3.372a3 3 0 0 1 .82-1.533L9.06 13Zm9.032-5a2.907 2.907 0 0 0-2.056.852L9.967 14.92a1 1 0 0 0-.273.51l-.675 3.373a1 1 0 0 0 1.177 1.177l3.372-.675a1 1 0 0 0 .511-.273l6.07-6.07a2.91 2.91 0 0 0-.944-4.742A2.907 2.907 0 0 0 18.092 8Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <img
            src="/images/user-avatar.png"
            alt="User Avatar"
            className="w-6 h-6 rounded-full"
          />
        )}
      </div>
      <h4 className="font-semibold text-gray-700 mx-2">{userName}</h4>
    </div>
    <p className="text-gray-600 mt-2 ml-11">{comment}</p>
  </div>
);

const AIResponse = ({ response }) => (
  <div className="bg-gray-100 p-4 rounded-lg mt-4 mb-3 grid">
    <div className="flex items-center">
      <div className="h-8 w-8 sm:mx-0 sm:h-8 sm:w-8">
        <img src="/images/Marttwainxyz.png" alt="AI Avatar" />
      </div>
      <h4 className="font-semibold text-gray-700 mx-2">Article Assistant</h4>
    </div>
    <p className="text-gray-600 mt-2">{response}</p>
  </div>
);

const PostPage = ({ initialComments, post }) => {
  const [newComment, setNewComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isCollaborateModalOpen, setIsCollaborateModalOpen] = useState(false);
  const [llmArticle, setLLMArticle] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [error, setError] = useState(null);
  // const [submittedComment, setSubmittedComment] = useState("");
  const [comments, setComments] = useState(initialComments || []);

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

  // Save article to local storage
  useEffect(() => {
    if (post && post.content) {
      localStorage.setItem("articleContent", JSON.stringify(post.content));
      const savedContent = localStorage.getItem("articleContent");
      setLLMArticle(savedContent);
    }
  }, [post]);

  // Handles cases if post is null
  if (!post) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  // Handle comment change
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
    setError(null);

    if (!user) {
      console.error("User not authenticated");
      setError("Please log in to post a comment.");
      setLoading(false);
      return;
    }

    if (newComment.trim() !== "") {
      try {
        const response = await fetch("/api/blog/commentsystem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: newComment,
            content: post?.content,
            email: user?.email,
            postTitle: post?.title,
            postId: post?.id,
            name: user?.name,
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error("Server response:", errorData);
          throw new Error(
            `Failed to post comment: ${response.status} ${response.statusText}`
          );
        }

        const createdComment = await response.json();

        // Fetch updated comments after posting
        const getResponse = await fetch(
          `/api/blog/commentsystem?postId=${post.id}&postTitle=${post.title}`
        );
        if (!getResponse.ok) {
          throw new Error("Failed to fetch updated comments");
        }
        const updatedComments = await getResponse.json();
        setComments(updatedComments);
        setNewComment("");
      } catch (error) {
        console.error("Error posting comment:", error.message);
        setError(error.message);
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

  function formatCategorySlug(slug) {
    if (!slug) return "";

    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  useEffect(() => {
    async function fetchComments() {
      if (post?.id) {
        try {
          const response = await fetch(
            `/api/blog/commentsystem?postId=${post.id}&postTitle=${post.title}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch comments");
          }
          const data = await response.json();
          console.log("Data", data);
          setComments(data);
        } catch (error) {
          console.error("Error fetching comments:", error);
          setError("Failed to load comments. Please try again later.");
        }
      }
    }
    fetchComments();
  }, [post?.id, post.title]);

  return (
    <div className="mt-20">
      <div className="relative mt-2 bg-[#ced4da] pb-20 sm:pb-24 xl:pb-0">
        <div className="absolute inset-0 overflow-hidden">
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
            <div className="details-image relative flex justify-center items-center aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
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
                  className="rounded-md w-14 h-14 lg:w-24 lg:h-24"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectPosition: "top",
                  }}
                  width={300}
                  height={300}
                  alt={post?.title}
                />
              )}
              <span className="absolute bottom-4 left-4 lg:bottom-0 lg:left-0 lg:m-4">
                <img
                  className="rounded-full border border-white w-14 h-14 lg:w-24 lg:h-24"
                  src={"https://github.com/shadcn.png"}
                  alt="Avatar"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      {post && (
        <>
          <div className="max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 justify-center px-6 mx-auto bg-slate-50 rounded-md">
            <span className="w-86 pr-4 sm:justify-center pl-2 my-12">
              <h1 className="font-semibold border border-gray-300 rounded-lg p-2 text-gray-700 text-2xl">
                Author: {post.author || "No named Author"}
              </h1>
              <ul className="mt-2 mb-4 text-sm bg-slate-100 rounded ">
                <li className="flex item-center  focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <svg
                    className="w-6 h-6 text-gray-600 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                    />
                  </svg>
                  <div className="">
                    Niche: {formatCategorySlug(post.categorySlug) || "Not set"}
                  </div>
                </li>
                <li className="flex item-center  focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m11.5 11.5 2.071 1.994M4 10h5m11 0h-1.5M12 7V4M7 7V4m10 3V4m-7 13H8v-2l5.227-5.292a1.46 1.46 0 0 1 2.065 2.065L10 17Zm-5 3h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                    />
                  </svg>
                  <div>
                    Published: {new Date(post?.createdAt).toLocaleDateString()}
                  </div>
                </li>
                <li className="flex item-center border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <svg
                    className="w-6 h-6 text-gray-600 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16h13M4 16l4-4m-4 4 4 4M20 8H7m13 0-4 4m4-4-4-4"
                    />
                  </svg>

                  <button
                    onClick={() => setIsCollaborateModalOpen(true)}
                    className=""
                  >
                    Collaborate with me
                  </button>
                  <BrandCollaborate
                    isOpen={isCollaborateModalOpen}
                    onClose={() => setIsCollaborateModalOpen(false)}
                  />
                </li>
              </ul>
              <WisdomNugget />
              {post && post.seriesId ? (
                <>
                  <InSeries />
                </>
              ) : (
                <PostSubscription />
              )}
            </span>

            <span className="col-span-2 mt-11">
              <article className="mx-auto">
                <h2 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                  {post.title}
                </h2>
                <div
                  className="mt-6 prose prose-lg prose-gray dark:prose-dark"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>

              <hr className="w-48 h-1 mx-auto my-4 bg-gray-300 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
              <div>
                <span className="">
                  <CommentBox
                    showModal={showModal}
                    post={post}
                    comments={comments}
                    setShowModal={setShowModal}
                  />
                  {error && (
                    <div className="text-red-500 mt-2">Error: {error}</div>
                  )}
                  <div
                    className={`overflow-y-auto mt-4 mb-4 ${comments.length > 0 ? "h-96" : ""}`}
                  >
                    {comments.map((comment) => (
                      <React.Fragment key={comment.id}>
                        <UserComment
                          comment={comment.content}
                          userName={
                            comment.user?.name ||
                            comment.user?.firstName ||
                            "Anonymous"
                          }
                        />
                        {comment.aiResponse && (
                          <AIResponse response={comment.aiResponse} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* <div className="h-96 overflow-y-auto mt-4 mb-4">
                    {comments.map((comment) => (
                      <React.Fragment key={comment.id}>
                        <UserComment
                          comment={comment.content}
                          userName={
                            comment.user?.name ||
                            comment.user?.firstName ||
                            "Anonymous"
                          }
                        />
                        {comment.aiResponse && (
                          <AIResponse response={comment.aiResponse} />
                        )}
                      </React.Fragment>
                    ))}
                  </div> */}
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
                        disabled={loading}
                      >
                        {loading ? "Posting..." : "Post comment"}
                        {loading && (
                          <CircularProgress
                            aria-label="Loading..."
                            size="sm"
                            value={value}
                            color="warning"
                            className="ml-2"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </span>
          </div>
          <div className="mt-6">
            <ChatUI post={post} />
          </div>
          <div>
            <BlogChatUI
              postContent={post?.content}
              isOpen={isOpen}
              llmArticle={llmArticle}
              setIsOpen={setIsOpen}
            />
          </div>
          <div className="mx-4 px-2">
            <ArticleInfo
              isOpen={isArticleModalOpen}
              setIsOpen={setIsArticleModalOpen}
            />
          </div>
          {/* <Button
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
          </Button> */}
        </>
      )}
    </div>
  );
};

export default PostPage;
