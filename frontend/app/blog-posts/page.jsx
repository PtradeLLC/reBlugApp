"use client";
import React, { useState, useEffect } from "react";
import BlogCategories from "../../components/BlogCategory";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";
import parse from "html-react-parser";
import HowItWorks12 from "@/components/HowItWorks";
import ChatUI from "@/components/ChatBox/AIChatBox";
import useSWR from "swr";

// Define your fetcher function
const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

const extractPlainText = (htmlString) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || "";
};

const Blog = () => {
  const [value, setValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: categoriesData,
    error: categoriesError,
    isValidating: isValidatingCategories,
  } = useSWR("/api/blog/categories", fetcher);
  const {
    data: postsData,
    error: postsError,
    isValidating: isValidatingPosts,
  } = useSWR("/api/blog/getPosts", fetcher);

  useEffect(() => {
    if (categoriesError) {
      console.error("An error occurred:", categoriesError);
    }
  }, [categoriesError]);

  useEffect(() => {
    if (postsError) {
      console.error("An error occurred:", postsError);
    }
  }, [postsError]);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (postsError || categoriesError) return <div>Error loading data</div>;

  if (isValidatingPosts || isValidatingCategories) {
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

  function formatCategorySlug(slug) {
    if (!slug) return "";

    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <>
      <div className="bg-white mt-7 pb-24 sm:pb-8">
        <div className="mx-auto px-6 lg:px-8">
          <div className="mx-auto text-center">
            <BlogCategories />
          </div>
          <div>
            <div className="my-2">
              <HowItWorks12 categories={categoriesData || []} />
            </div>
            <div className="flex justify-center items-center">
              <div>
                <div className="max-w-[85rem] px-4 py-1 sm:px-6 lg:px-8 lg:py-2 mx-auto">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link
                      className="group dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="/beginner-blog"
                    >
                      <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
                        <img
                          className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out h-[218px] rounded-xl"
                          src="/images/eightBlog.jpg"
                          alt="Beginner"
                        />
                        <span className="absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-red-800 text-white py-1.5 px-3">
                          Program: reBlug Junior
                        </span>
                      </div>
                      <div className="mt-7">
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600">
                          Blogging for Beginners
                        </h3>
                        <p className="mt-3 text-gray-800 line-clamp-4">
                          Perfect for beginners - Ages 13 & up. This program
                          paired with an expert will swiftly guide you through
                          mastering the basics of writing, enabling you to
                          effectively express your ideas.
                        </p>
                        <p className="mt-5 inline-flex items-center gap-x-1 text-red-600 decoration-2 group-hover:underline font-medium">
                          Get more info
                          <svg
                            className="flex-shrink-0 size-4"
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
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </p>
                      </div>
                    </Link>
                    <Link
                      className="group dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="/bloggers"
                    >
                      <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
                        <img
                          className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out h-[218px] rounded-xl"
                          src="/images/expertBlog.jpg"
                          alt="Image Description"
                        />
                        <span className="absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-gray-900">
                          Your article: Sponsored
                        </span>
                      </div>

                      <div className="mt-7">
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600">
                          Expert Bloggers
                        </h3>
                        <p className="mt-3 text-gray-800 line-clamp-4">
                          Effortlessly collaborate with brands in search of
                          media partnerships, grow and monetize your medium on
                          and off our platform. Use advance features of Article
                          Assistant tool to create engaging content.
                        </p>
                        <p className="mt-5 inline-flex items-center gap-x-1 text-red-600 decoration-2 group-hover:underline font-medium">
                          Try it Out
                          <svg
                            className="flex-shrink-0 size-4"
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
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </p>
                      </div>
                    </Link>
                    <a
                      className="group relative flex flex-col w-full min-h-60 bg-center bg-cover url('/img/hero-pattern.svg') rounded-xl hover:shadow-lg transition dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="/brands"
                    >
                      <div className="flex-auto p-4 border md:p-6">
                        <div className="relative pt-[70%] sm:pt-[70%] rounded-xl overflow-hidden">
                          <img
                            className="size-full absolute top-0 start-0 object-cover rounded-xl"
                            src="/images/threeBlog.jpg"
                            alt="Brand Blogging"
                          />
                        </div>
                        <h3 className="text-xl font-semibold mt-8 text-gray-800 group-hover:text-gray-600">
                          Enterprise and Start up alike
                        </h3>
                        <p className="mt-3 text-gray-800 line-clamp-4">
                          Host and persist your blog pages with supreme
                          artificial intelligence, knowledge tools, and engaged
                          users.
                        </p>
                      </div>
                      <div className="pt-0 p-4 md:p-6 border">
                        <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 group-hover:text-gray-600">
                          Check out the benefits
                          <svg
                            className="flex-shrink-0 size-4"
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
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <div className="mt-7 lg:mt-14">
            {postsData && (
              <div className="max-w-3xl text-center mx-auto">
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">
                  Latest
                </h2>
              </div>
            )}
          </div>
        </div>
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {postsData &&
              postsData.map((post) => (
                <Link key={post?.id} href={`/blog-posts/${post?.id}`}>
                  <Card
                    className="border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700 rounded-xl"
                    radius="xl"
                    isPressable
                    isHoverable
                  >
                    <CardHeader className="relative p-0">
                      <img
                        className="object-cover rounded-t-xl"
                        src={post.featureImage}
                        alt="Post Feature"
                        style={{ height: "220px", width: "100%" }}
                      />
                    </CardHeader>
                    <CardBody className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {post?.title}
                      </h3>
                      <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-4">
                        {extractPlainText(post?.content)}
                      </p>
                    </CardBody>
                    <CardFooter className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-b-xl">
                      <div className="flex justify-center items-center">
                        <span className="text-xs text-green-700">
                          {post?.author}
                          {"|"} {formatCategorySlug(post?.categorySlug)}
                        </span>
                        <Button
                          as={Link}
                          href={`/blog-posts/${post?.id}`}
                          variant="outline"
                          className="bg-slate-500 rounded-md mx-5 text-white"
                          color="primary"
                          size="sm"
                        >
                          Read more
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
