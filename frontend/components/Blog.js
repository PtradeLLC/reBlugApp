import React, { useEffect, useState } from 'react';
import { getPosts } from '../pages/ghost-config';
import Image from 'next/image';
import Link from 'next/link'


//featured_image, title, author, name, 


export default function Blog() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await getPosts();
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching posts:", error.message);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="bg-white pt-9 pb-24 sm:pb-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the Blog</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        AI powered blog allow you to research the subject further by having a conversation and asking questions related to the articles.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => {

                        const postDate = new Date(post.published_at);
                        const month = postDate.toLocaleString('default', { month: 'long' });
                        const day = postDate.getDate();

                        return (
                            <article key={post.id} className="flex flex-col items-start justify-between">
                                <div className="relative w-full">
                                    <Image
                                        src={post.feature_image}
                                        alt=""
                                        width={100}
                                        height={100}
                                        className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                    />

                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                </div>
                                <div className="max-w-xl">
                                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                                        <time dateTime={post.published_at} className="text-gray-500">
                                            {`${month} ${day}`}
                                        </time>
                                    </div>
                                    <div className="group relative">
                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 line-clamp-3">
                                            <Link href={''}>
                                                <span className="absolute inset-0" />
                                                {post.title}
                                            </Link>
                                        </h3>
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
