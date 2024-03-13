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


    const { data, error, isValidating } = useSWR(
        `/api/blog/categoryBySlug?page=${currentPage}`,
        fetcher,
        { cache: 'no-store' }
    );
    { cache: 'no-store' }

    useEffect(() => {
        if (error) console.error("An error occurred:", error);
        if (!isValidating) setLoading(false);
    }, [error, isValidating]);

    useEffect(() => {
        if (data) {
            setPosts(data.posts);

            // Extracting categories from posts
            const newCategories = data.posts.map((post) => post.category);

            // Concatenating all categories and removing duplicates
            const uniqueCategories = Array.from(new Set(newCategories));

            // Updating categories state
            setCategories(uniqueCategories);
        }
    }, [data]);


    useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v >= 100 ? 0 : v + 10));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setLoading(true); // Set loading to true when page changes
    };

    // const { data, error, isLoading } = useSWR(`/api/blog/categoryBySlug?page=${currentPage}`, fetcher);

    // if (error) return "An error has occurred.";
    // if (isLoading) return "Loading...";

    // useEffect(() => {
    //     setLoading(true);
    //     if (data) {
    //         setPosts(data.posts);
    //     }
    //     setLoading(false);
    // }, [data]);



    // // Function to fetch posts and categories
    // const loadPostsAndCategories = async (page) => {

    //     try {
    //         setLoading(true);
    //         console.log(data);


    //         setLoading(true); // Set loading state to true before fetching data
    //         const response = await axios.get(`http://localhost:3000/api/blog/categoryBySlug?page=${page}`);
    //         // const response = await axios.get(`https://www.reblug.com/api/blog/categoryBySlug?page=${page}`);
    //         const { posts, totalPages } = response.data;
    //         setCurrentPage(page);
    //         setTotalPages(totalPages);

    //         // Extract unique posts based on post ID to avoid duplicates
    //         const uniquePosts = Array.from(new Set(posts.map(post => post.id))).map(id => {
    //             return posts.find(post => post.id === id);
    //         });
    //         setPosts(uniquePosts);

    //         // Extract unique categories from fetched posts
    //         const uniqueCategories = Array.from(new Set(posts.map(post => post.category.id))).map(id => {
    //             return posts.find(post => post.category.id === id).category;
    //         });
    //         setCategories(uniqueCategories);
    //     } catch (error) {
    //         console.error('Error fetching posts:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    //Handles setting value for the loader
    useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v >= 100 ? 0 : v + 10));
        }, 500);

        return () => clearInterval(interval);
    }, []);



    return (
        <div className="bg-white mt-10 pt-9 pb-24 sm:pb-8">
            <div className="mx-auto px-6 lg:px-8">
                <div className="mx-auto text-center">
                    <BlogCategories categories={categories} />
                </div>
                <div>
                    <div className='my-3'>
                        {posts && posts.length > 0 && <BreadCrumbs categories={categories} />}
                    </div>
                    <div className='flex justify-center items-center'>
                        <div>
                            <div><h2 className='font-thin'>Discover</h2></div>
                            <>
                                <div className="max-w-[85rem] px-4 py-1 sm:px-6 lg:px-8 lg:py-2 mx-auto">
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <a
                                            className="group dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                            href="#"
                                        >
                                            <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
                                                <img
                                                    className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
                                                    src="https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"
                                                    alt="Image Description"
                                                />
                                                <span className="absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-gray-900">
                                                    Your article: Sponsored
                                                </span>
                                            </div>
                                            <div className="mt-7">
                                                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-200">
                                                    For Bloggers
                                                </h3>
                                                <p className="mt-3 text-gray-800 dark:text-gray-200">
                                                    Produce professional, reliable streams easily leveraging Preline's
                                                    innovative broadcast studio
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
                                                    className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
                                                    src="https://images.unsplash.com/photo-1542125387-c71274d94f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                                                    alt="Image Description"
                                                />s
                                            </div>
                                            <div className="mt-7">
                                                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-200">
                                                    Brand Blogging
                                                </h3>
                                                <p className="mt-3 text-gray-800 dark:text-gray-200">
                                                    Optimize your in-person experience with best-in-class capabilities
                                                    like badge printing and lead retrieval
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
                                                <h3 className="text-xl text-slate-900 group-hover:text-gray-700">
                                                    <span className="font-bold">Preline</span> Press publishes books
                                                    about economic and technological advancement.
                                                </h3>
                                            </div>
                                            <div className="pt-0 p-4 md:p-6 border">
                                                <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 group-hover:text-gray-700">
                                                    Visit the site
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