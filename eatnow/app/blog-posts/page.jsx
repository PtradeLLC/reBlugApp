"use client";
import React, { useState, useEffect } from "react";
import BlogCategories from "../../components/BlogCategory";
import BreadCrumbs from "../../components/CategoryBreadcrumbs";
import { Pagination, CircularProgress } from "@nextui-org/react";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
import CardDisplay from "../../components/CardDisplay";
import useSWR from "swr";
import HowItWorks12 from "@/components/HowItWorks";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

const Blog = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [postsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isValidating } = useSWR("/api/blog/categories", fetcher);

  useEffect(() => {
    if (error) {
      console.error("An error occurred:", error);
    }
    if (!isValidating) {
      setLoading(false);
    }
  }, [error, isValidating]);

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  // console.log("categories", categories);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoading(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (error) return <div>Error loading data</div>;
  if (isValidating) return <CircularProgress aria-label="Loading..." />;

  return (
    <div className="bg-white mt-7 pb-24 sm:pb-8">
      <div className="mx-auto px-6 lg:px-8">
        <div className="mx-auto text-center">
          <BlogCategories categories={categories || []} />
        </div>
        <div>
          <div className="my-2">
            <HowItWorks12 />
          </div>
          <div className="flex justify-center items-center">
            <div>
              <>
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
                          Perfect for beginners - Ages 13+. This program will
                          swiftly guide you through mastering the basics of
                          writing, enabling you to effectively express your
                          ideas.
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
                          Check out Brand Solutions
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
              </>
              <Divider className="my-8 w-8/12 m-auto" />
            </div>
          </div>
          <Divider className="my-8 w-8/12 m-auto" />
          <div></div>
        </div>
        {/* <div className="my-3">
          <h2 className="font-thin">Latest Posts</h2>
        </div> */}
        {/* <div className="mx-auto justify-center items-center mt-6 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts && posts.length > 0
            ? posts
                .slice(
                  (currentPage - 1) * postsPerPage,
                  currentPage * postsPerPage
                )
                .map((post) => <CardDisplay key={post.id} post={post} />)
            : loading && (
                <div className="flex justify-center items-center">
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
                </div>
              )}
        </div> */}
      </div>
      {/* <div className="flex justify-center mt-28 items-center my-2">
        <Pagination
          total={Math.ceil(posts.length / postsPerPage)}
          color="success"
          initialPage={1}
          value={value}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div> */}
    </div>
  );
};

export default Blog;
