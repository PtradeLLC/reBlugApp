import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import BlogCategories from '../../components/Blogs/BlogCategory';
import { Divider } from "@nextui-org/react";
import BreadCrumbs from '../../components/Blogs/categoryBreadcrumbs';
import { Card, CardHeader, CardFooter, Pagination } from "@nextui-org/react";
import axios from 'axios';
import { CircularProgress } from "@nextui-org/react";
import Image from 'next/image';
import CardDisplay from '@/components/CardDisplay';
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Blog() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(12);
    const [totalPages, setTotalPages] = useState(1);
    const [categories, setCategories] = useState([]);
    const [value, setValue] = useState(0);


    let catApiUrl;

    if (process.env.NODE_ENV === 'production') {
        catApiUrl = `https://reblug.com/api/blog/categoryBySlug?page=${currentPage}`;
    } else if (process.env.NODE_ENV === 'development') {
        catApiUrl = `http://localhost:3000/api/blog/categoryBySlug?page=${currentPage}`;
    }

    const { data, error, isValidating, mutate } = useSWR(catApiUrl, fetcher,);

    useEffect(() => {
        if (error) console.error("An error occurred:", error);
        if (!isValidating) setLoading(false);
    }, [error, isValidating]);

    useEffect(() => {
        if (data && data.posts) {
            const cleanedPosts = data.posts.map((post) => ({
                ...post,
                content: cleanUpContent(post.content),
            }));
            setPosts(cleanedPosts);
            // Extracting categories from posts
            const newCategories = cleanedPosts.map((post) => post.category);
            // Concatenating all categories and removing duplicates
            const uniqueCategories = Array.from(new Set(newCategories));
            // Updating categories state
            setCategories(uniqueCategories);
        }
    }, [data]);

    const cleanUpContent = (content) => {
        return content
            .replace(/\*/g, '') // Remove all asterisks (*)
            .replace(/###/g, '') // Remove '###'
            .replace(/##/g, '') // Remove '##'
            .replace(/\n\n/g, '')
            .replace(/\n/g, '')
            .replace(/\n\n/g, '')
            .trim()
            .replace(/(<([^>]+)>)/gi, '')
            .replace(/^## (.*?)\n\n/gm, '')
            .replace(/\*\s(.*?)\n\n/gm, '<ul><li>$1</li></ul><p>')
    };


    useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v >= 100 ? 0 : v + 10));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setLoading(true);
    };

    //Handles setting value for the loader
    useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v >= 100 ? 0 : v + 10));
        }, 500);

        return () => clearInterval(interval);
    }, []);


    console.log("POSTSS", posts);

    return (
        <div className="bg-white mt-10 pt-9 pb-24 sm:pb-8">
            <div className="mx-auto px-6 lg:px-8">
                <div className="mx-auto text-center">
                    <BlogCategories categories={categories} />
                </div>
                <div>
                    <div className='my-3 p-2'>
                        {posts && posts.length > 0 && <BreadCrumbs posts={posts} categories={categories} />}
                    </div>
                    <div className='flex justify-center items-center'>
                        <div>
                            <div><h2 className='font-thin'>Discover</h2></div>
                            <>
                                <div className="max-w-[85rem]  px-4 py-1 sm:px-6 lg:px-8 lg:py-2 mx-auto">
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <a
                                            className="group dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                            href="#"
                                        >
                                            <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
                                                <img
                                                    className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out h-[218px] rounded-xl"
                                                    src="/images/eightBlog.jpg"
                                                    alt="Beginner"
                                                />
                                            </div>
                                            <div className="mt-7">
                                                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-200">
                                                    Blogging for Beginners
                                                </h3>
                                                <p className="mt-3 text-gray-800 line-clamp-4 dark:text-gray-200">
                                                    Quickly learn the fundamental of writing, telling stories to engage an audience, and business of blogging. Let's match you with a vetted expert.
                                                </p>
                                                <p className="mt-5 inline-flex items-center gap-x-1 text-red-600 decoration-2 group-hover:underline font-medium">
                                                    Read more
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
                                        </a>
                                        <a
                                            className="group dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                            href="#"
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
                                                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-200">
                                                    Expert Bloggers
                                                </h3>
                                                <p className="mt-3 text-gray-800 line-clamp-4 dark:text-gray-200">
                                                    Effortlessly collaborate with brands in search of media partnerships, we help you grow and monetize your medium on and off our platform.
                                                </p>
                                                <p className="mt-5 inline-flex items-center gap-x-1 text-red-600 decoration-2 group-hover:underline font-medium">
                                                    Try it out
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
                                        </a>
                                        <a
                                            className="group relative flex flex-col w-full min-h-60 bg-center bg-cover url('/img/hero-pattern.svg') rounded-xl hover:shadow-lg transition dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                            href="#"
                                        >
                                            <div className="flex-auto p-4 border md:p-6">
                                                <div className='relative pt-[70%] sm:pt-[70%] rounded-xl overflow-hidden'>
                                                    <img
                                                        className="size-full absolute top-0 start-0 object-cover rounded-xl"
                                                        src="/images/threeBlog.jpg"
                                                        alt="Brand Blogging"
                                                    />
                                                </div>
                                                <h3 className="text-xl font-semibold mt-8 text-gray-800 group-hover:text-gray-600 dark:text-gray-200">
                                                    Enterprise and Start up alike
                                                </h3>
                                                <p className="mt-3 text-gray-800 line-clamp-4 dark:text-gray-200">
                                                    Host and persist your blog pages with supreme artificial intelligence, knowledge tools, and engaged users.
                                                </p>
                                            </div>
                                            <div className="pt-0 p-4 md:p-6 border">
                                                <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 group-hover:text-gray-700">
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
                            <Divider className="my-8 w-8/12  m-auto" />
                        </div>
                    </div>
                    <Divider className="my-8 w-8/12  m-auto" />
                </div>
                <div className='my-3' ><h2 className='font-thin'>Latest Posts</h2></div>
                <div className="mx-auto justify-center items-center mt-6 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts && posts.length > 0 ? (
                        posts
                            .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
                            .map((post) => {
                                const postDate = new Date(post.createdAt);
                                const month = postDate.toLocaleString('default', { month: 'long' });
                                const day = postDate.getDate();
                                const { id, title, slug } = post.category;
                                return (
                                    <CardDisplay key={post.id} post={post} />
                                );
                            })
                    ) : (
                        loading && (
                            <div className='flex justify-center items-center'>
                                <div className="flex justify-center">
                                    <CircularProgress
                                        aria-label="Loading..."
                                        size="sm"
                                        value={value}
                                        color="warning"
                                        className='mx-2'
                                        showValueLabel={true}
                                    />
                                </div>
                            </div>
                        )
                    )}
                </div>

            </div>
            <div className='flex justify-center mt-28 items-center my-2'>
                <Pagination
                    total={Math.ceil(posts.length / postsPerPage)}
                    color="success"
                    initialPage={1}
                    value={value}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
}