import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PrismaClient } from '@prisma/client';
import BlogCategories from '../../components/Blogs/BlogCategory';
import { Divider } from "@nextui-org/react";
import BreadCrumbs from '../../components/Blogs/categoryBreadcrumbs';
import CategoryCard from '../../components/Blogs/BlogDetail';
const prisma = new PrismaClient();



export default function Blog({ posts }) {
    const [loading, setLoading] = useState(false);
    const [allCategores, setAllCategories] = useState([]);


    //delete post
    const router = useRouter();
    const deletePost = async postId => {
        try {
            setLoading(true);
            await fetch('/api/post/delete?id=' + postId, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            setLoading(false);
            await router.push("/");
        } catch (error) {
            console.log("error", error);
            setLoading(false);
        }

    }

    // console.log(setAllCategories);

    return (
        <div className="bg-white mt-10 pt-9 pb-24 sm:pb-8">
            <div className="mx-auto px-6 lg:px-8">
                <div className="mx-auto text-center">
                    <BlogCategories />
                </div>
                <div>
                    <div className='my-3'>
                        <BreadCrumbs />
                    </div>
                    <div><h2 className='font-thin'>Discover</h2></div>
                    <>
                        {/* Card Blog */}
                        <div className="max-w-[85rem] px-4 py-1 sm:px-6 lg:px-8 lg:py-4 mx-auto">

                            {/* Grid */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Card */}
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
                                        <p className="mt-5 inline-flex items-center gap-x-1 text-blue-600 decoration-2 group-hover:underline font-medium">
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
                                {/* End Card */}
                                {/* Card */}
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
                                        <p className="mt-5 inline-flex items-center gap-x-1 text-blue-600 decoration-2 group-hover:underline font-medium">
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
                                {/* End Card */}
                                {/* Card */}
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
                                {/* End Card */}
                            </div>
                            {/* End Grid */}
                        </div>
                        {/* End Card Blog */}
                    </>
                    <Divider className="my-8 w-8/12  m-auto" />
                </div>
                <div className='my-4' ><h2 className='font-thin'>Latest Posts</h2></div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <CategoryCard />
                    {/* {posts.length > 0 ? (
                        posts.map((post) => {
                            const postDate = new Date(post.createdAt);
                            const month = postDate.toLocaleString('default', { month: 'long' });
                            const day = postDate.getDate();
                            return (
                                <article key={post.id} className="flex flex-col items-start justify-between">
                                    <div className="relative w-full">
                                        <img
                                            className="object-cover inset-0 h-full w-full rounded-2xl bg-gradient-to-r from-slate-500 to-gray-900 shadow-2xl"
                                            src={post.featureImage}
                                            alt="postImage"
                                        />
                                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                    <div className="max-w-xl">
                                        <div className="mt-8 flex items-center gap-x-4 text-xs">
                                            <time dateTime={post.createdAt} className="text-gray-500">
                                                {`${month} ${day}`}
                                            </time>
                                        </div>
                                        <div className="group relative w-80">
                                            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 line-clamp-3">
                                                <Link href={`/posts/${post.id}`}>
                                                    <span className="absolute inset-0" />
                                                    {post.title}<br />
                                                </Link>
                                            </h3>
                                            <Link href={`/posts/${post.id}`}>
                                                <span className="absolute inset-0" />
                                                <div className='w-full'>
                                                    <p className='line-clamp-3'>{post.content}</p>
                                                </div>
                                                <span className='flex justify-between items-center'>
                                                    <span className='text-xs flex justify-end my-2'>
                                                        <img className='w-10 h-10 rounded-md' src={`${post.User.profileImage}`} alt='profile-image' />
                                                    </span>
                                                    <span className='text-sm flex justify-end my-2'>{post.User.name}</span>
                                                    <span className='text-sm my-2 mx-2 font-thin'>Views: {post.views}</span>
                                                    <span className='text-sm flex justify-end my-2 font-medium'>Read More...</span>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })
                    ) : (
                        <p>No posts available</p>
                    )} */}
                </div>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    // Function to strip HTML tags from a string
    function stripHtmlTags(html) {
        return html.replace(/<[^>]*>?/gm, ''); // Replace HTML tags with an empty string
    }

    try {
        // Fetch all published posts from the database
        // const allPosts = await prisma.post.findMany({
        //     where: { published: true },
        //     include: {
        //         comments: {
        //             select: { content: true, aiResponse: true },
        //         },
        //         aiResponses: {
        //             select: {
        //                 response: true
        //             }
        //         },
        //         User: {
        //             select: {
        //                 name: true,
        //                 profileImage: true,
        //                 email: true
        //             }
        //         }
        //     },
        // });
        const allPosts = await prisma.post.findMany();

        // Remove HTML tags from the content field and convert dates to strings
        const postsWithoutHtml = allPosts.map(post => ({
            ...post,
            content: stripHtmlTags(post.content),
        }));

        return {
            props: {
                posts: JSON.parse(JSON.stringify(postsWithoutHtml)),

            },
        };
    } catch (error) {
        console.error('Error fetching and processing posts:', error);

        // Return an error object if an error occurs
        return {
            props: {
                posts: null,
                error: 'Error fetching and processing posts.',
            },
        };
    }
}