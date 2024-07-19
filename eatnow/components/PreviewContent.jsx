"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// import ChatUI from "../../components/ChatBot/AI-ChatUI";
import { Button } from "@nextui-org/react";
// import { Button } from "@/components/ui/button";
// import CommentBox from "../../components/Blogs/CommentBox";
// import SubmissionInfo from "../../components/Blogs/BlogInfo";
// import ArticleInfo from "../../components/Blogs/ArticleInfo";
import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import WisdomNugget from "./WisdomNugget";

const navigation = [
  {
    name: "Facebook",
    href: "#",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

const fetcher = (url) => fetch(url).then((res) => res.json());

const PostPage = ({ comments }) => {
  const [newComment, setNewComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [blogCategory, setBlogCategory] = useState("");
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [allPosts, setAllPosts] = useState();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const uniqPost = true;
  const [postBySlug, setPostBySlug] = useState();
  // const { id } = params || {};
  // const router = useRouter();

  const handleSubmissionModalOpen = () => {
    setIsSubmissionModalOpen(true);
  };

  const handleArticleModalOpen = () => {
    setIsArticleModalOpen(true);
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleTextAreaClick = () => {
    setShowModal(true);
  };

  //Handles setting value for the loader
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // const {
  //   data: uniqPost,
  //   error,
  //   isValidating,
  // } = useSWR(`/api/blog/uniquePost/${id}`, fetcher);

  // useEffect(() => {
  //   if (error) console.error("An error occurred:", error);
  // }, [error]);

  // Utility function to clean up content
  function cleanUpContent(content) {
    return content
      .replace(/(<([^>]+)>)/gi, "")
      .replace(/\n\n/g, "</p><p>")
      .replace(/^### (.*?)\n\n/gm, "<h2>$1</h2><p>")
      .replace(/\*\s(.*?)\n\n/gm, "<ul><li>$1</li></ul><p>");
  }

  // useEffect(() => {
  //   if (error) {
  //     console.error("An error occurred:", error);
  //   }
  // }, [error]);

  // useEffect(() => {
  //   if (uniqPost) {
  //     setLoading(false);

  //     const cleanedContent = cleanUpContent(uniqPost.content);
  //   }
  // }, [uniqPost]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (newComment.trim() !== "") {
      try {
        const { email } = session.user;
        const title = uniqPost.title;
        const content = uniqPost.content;

        // Validate comment content
        if (!newComment.trim()) {
          console.error("Comment content is empty");
          return;
        }

        const response = await fetch(
          "/api/blog/commentsystem",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              comment: newComment,
              content: content,
              email: email,
              postTitle: title,
              postId: uniqPost.id,
            }),
          },
          { cache: "force-cache" }
        );

        if (!response.ok) {
          throw new Error("Failed to post comment");
        }

        const responseData = await response.json();

        setNewComment("");
        setLoading(false);
      } catch (error) {
        console.error("Error posting comment:", error.message);
      }
    }
  };

  const handleSignUp = () => {
    if (!session) {
      router.push("/login");
    }
  };

  function cleanUpContent(content) {
    return content
      ?.replace(/\*/g, "")
      ?.replace(/##/g, "")
      ?.replace(/\n/g, "")
      .trim();
  }

  const handleFinalizeArticle = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const response = await fetch("/api/blog/finalizeArticle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: uniqPost.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to finalize the article");
      }

      const responseData = await response.json();
      // Handle success (e.g., show a success message, redirect, etc.)
      setLoading(false);
      console.log("Article finalized successfully:", responseData);
    } catch (error) {
      console.error("Error finalizing the article:", error.message);
      setLoading(false);
    }
  };

  // function cleanUpContent(content) {
  //   // Split the content based on double line breaks
  //   const paragraphs = content.split("\n\n");
  //   // Map over the paragraphs and wrap each one in a <p> tag
  //   const formattedContent = paragraphs.map(
  //     (paragraph, index) => `<p key=${index}>${paragraph}</p>`
  //   );
  //   // Join the formatted paragraphs into a single string
  //   return formattedContent.join("");
  // }
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
                <Image
                  src={"/images/bloger3.jpg"}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectPosition: "top",
                  }}
                  width={500}
                  height={500}
                  alt={uniqPost?.title}
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
      {uniqPost && (
        <>
          <div className="max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 justify-center px-6 mx-auto bg-slate-50 rounded-md">
            <span className="w-86 pr-4 sm:justify-center pl-2 my-4">
              <h1 className="font-semibold border border-gray-300 rounded-lg p-2 text-gray-700 text-3xl">
                {uniqPost?.title}
                {"Untitled post"}
              </h1>
              <ul className="mt-2 mb-4 text-sm bg-slate-100 rounded ">
                <li className="flex item-center border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  {/* <img className="w-7 h-7 mr-1" src={`${uniqPost.image} `} />{" "} */}
                  {uniqPost.author || "No named Author"}
                </li>
                <li className="flex item-center  focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <img className="w-7 h-7 mr-1" src="/images/category.png" />
                  {/* Category: {uniqPost?.category.title || "No category set yet"} */}
                  Niche: {"None set"}
                </li>
                <li className="flex item-center  focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <img className="w-7 h-7 mr-1" src="/images/users.png" />
                  <div className="">Readership: 2000 Readers</div>
                </li>
                <li className="flex item-center border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <img className="w-7 h-7 mr-1" src="/images/submit.png" />
                  <button
                    name="ProductSubmission"
                    type="button"
                    onClick={handleSubmissionModalOpen}
                  >
                    Collaborate with me
                  </button>
                </li>
              </ul>
              <WisdomNugget />
            </span>

            <span className="col-span-2 my-4">
              {/* <span className="flex">
                <span className="text-xs flex justify-end my-2 mx-2">
                  Reading time: {uniqPost?.createdAt} mins
                </span>
                <span className="text-xs flex justify-end my-2">
                  Views: {uniqPost?.views}
                </span>
              </span> */}
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
                  <div
                    className="text-lg"
                    dangerouslySetInnerHTML={{
                      __html: cleanUpContent(uniqPost?.content),
                    }}
                  />
                )}
              </span>

              <hr className="w-48 h-1 mx-auto my-4 bg-gray-300 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
              {/* <span className="">
                <CommentBox
                  showModal={showModal}
                  uniqPost={uniqPost}
                  comments={comments}
                  setShowModal={setShowModal}
                />
              </span> */}
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
              <div className="flex justify-en space-x-2">
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
              </div>
            </span>
          </div>
        </>
      )}
      <div>
        {/* <ChatUI
          postContent={uniqPost?.content}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        /> */}
      </div>
      <div className="mx-4 px-2">
        {/* <SubmissionInfo
          isOpen={isSubmissionModalOpen}
          setIsOpen={setIsSubmissionModalOpen}
        /> */}
      </div>
      <div className="mx-4 px-2">
        {/* <ArticleInfo
          isOpen={isArticleModalOpen}
          setIsOpen={setIsArticleModalOpen}
        /> */}
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
