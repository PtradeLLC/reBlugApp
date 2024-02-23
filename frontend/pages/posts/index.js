import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



export default function Blog({ posts }) {
    const [loading, setLoading] = useState(false);

    // if (!posts) {
    //     return <p className='mt-64'>Loading...</p>;
    // }


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

    return (
        <div className="bg-white mt-10 pt-9 pb-24 sm:pb-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">The Blog</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        AI powered blog allow you to research the subject further by having a conversation and asking questions related to the articles.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.length > 0 ? (
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
                                        <div className="group relative">
                                            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 line-clamp-3">
                                                <Link href={`/posts/${post.id}`}>
                                                    <span className="absolute inset-0" />
                                                    {post.title}<br />
                                                    <span className='text-xs flex justify-end my-2'>Click to read</span>
                                                </Link>
                                            </h3>
                                        </div>
                                    </div>
                                </article>
                            );
                        })
                    ) : (
                        <p>No posts available</p>
                    )}
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
        const allPosts = await prisma.post.findMany({
            where: { published: true },
            include: {
                comments: {
                    select: { content: true },
                },
            },
        });

        // Remove HTML tags from the content field
        const postsWithoutHtml = allPosts.map(post => ({
            ...post,
            content: stripHtmlTags(post.content),
            createdAt: post.createdAt.toString(), // Convert createdAt to string
        }));

        return {
            props: {
                posts: postsWithoutHtml,
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
