import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import BlogCategories from '../../components/Blogs/BlogCategory';
import { Divider } from "@nextui-org/react";
import BreadCrumbs from '../../components/Blogs/categoryBreadcrumbs';
import { Card, CardHeader, CardFooter, Image, Button, Pagination } from "@nextui-org/react";
import axios from 'axios';
import { CircularProgress } from "@nextui-org/react";



export default function Blog() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(12);
    const [totalPages, setTotalPages] = useState(1);
    const [categories, setCategories] = useState([]);
    const [value, setValue] = useState(0);

    // Function to fetch posts and categories
    const loadPostsAndCategories = async (page) => {
        try {
            setLoading(true); // Set loading state to true before fetching data
            const response = await axios.get(`/api/blog/categoryBySlug?page=${page}`);
            const { posts, totalPages } = response.data;
            setCurrentPage(page);
            setTotalPages(totalPages);

            // Extract unique posts based on post ID to avoid duplicates
            const uniquePosts = Array.from(new Set(posts.map(post => post.id))).map(id => {
                return posts.find(post => post.id === id);
            });
            setPosts(uniquePosts);

            // Extract unique categories from fetched posts
            const uniqueCategories = Array.from(new Set(posts.map(post => post.category.id))).map(id => {
                return posts.find(post => post.category.id === id).category;
            });
            setCategories(uniqueCategories);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    //Handles setting value for the loader
    useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v >= 100 ? 0 : v + 10));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    // Effect to load initial posts and categories
    useEffect(() => {
        loadPostsAndCategories(1);
    }, []);

    // Function to handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // console.log("POSTS", posts);

    return (
        <div className="bg-white mt-10 pt-9 pb-24 sm:pb-8">
            <div className="mx-auto px-6 lg:px-8">
                <div className="mx-auto text-center">
                    <BlogCategories categories={categories} />
                </div>
                <div>
                    <div className='my-3'>
                        <BreadCrumbs categories={categories} />
                    </div>
                    <div className='flex justify-center items-center'>
                        <div>
                            <div><h2 className='font-thin'>Discover</h2></div>
                            <>
                                <div className="max-w-[85rem] px-4 py-1 sm:px-6 lg:px-8 lg:py-4 mx-auto">
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
                                                />
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
                <div className="mx-auto justify-center items-center  mt-6 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.length > 0 ? (
                        posts
                            .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
                            .map((post) => {
                                const postDate = new Date(post.createdAt);
                                const month = postDate.toLocaleString('default', { month: 'long' });
                                const day = postDate.getDate();
                                const { id, title, slug } = post.category;
                                return (
                                    <div key={post.title} className="w-11/12 flex justify-center">
                                        <Card isFooterBlurred className="w-full h-[400px] bg-foreground-400 text-sm font-light col-span-12 sm:col-span-7">
                                            <CardHeader className="absolute bg-transparent backdrop-blur z-10 top-0 flex-col items-start">
                                                <p className="text-tiny text-white uppercase font-bold">{title}</p>
                                                <h4 className="text-white font-medium text-base">{post.title}</h4>
                                            </CardHeader>
                                            <img
                                                alt="Relaxing app background"
                                                className="z-0 w-full h-full flex justify-center items-center object-cover"
                                                src={post.featureImage}
                                                style={{ objectPosition: 'top' }}
                                            />
                                            <CardFooter className="absolute bg-white bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                                                <div className="flex flex-grow gap-2 items-center">
                                                    <div className="flex flex-col justify-center">
                                                        <p className="text-sm font-semibold text-slate-900">{post.author}</p>
                                                        <p className="text-sm text-slate-900 line-clamp-3">{post.content}</p>
                                                        <span className="flex justify-between item-center my-1 w-full">
                                                            <img
                                                                alt="Breathing app icon"
                                                                className="rounded-full h-9 w-9 object-cover bg-black"
                                                                src="/images/youtube.png"
                                                            />
                                                            <span className="text-slate-900 text-sm flex font-thin">
                                                                92
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mx-0 font-thin text-slate-900">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                                </svg>
                                                            </span>
                                                            <Link href={`/posts/${post.id}`} className="px-1 bg-white font-thin" radius="full" size="sm">Read More</Link>
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </div>
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
            <div className='flex justify-center items-center my-2'>
                <Pagination
                    total={Math.ceil(posts.length / postsPerPage)}
                    color="success"
                    initialPage={1}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
}