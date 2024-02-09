
import React, { useRef, useEffect, useState } from 'react';
import { getSinglePost, getPosts } from '../../lib/posts';
import Link from 'next/link';
import Image from 'next/image';
import ChatUI from '../../components/ChatBot/AI-ChatUI';
import { Button } from '@nextui-org/react';
import CommentBox from '../../components/Blogs/CommentBox';


const PostPage = ({ post }) => {
    const contentRef = useRef(null);
    const [webpageContent, setWebpageContent] = useState('');
    const [postContent, setPostContent] = useState({
        id: post.id,
        title: post.title,
        content: post.html
    });

    const [isOpen, setIsOpen] = useState(false);
    const [blogCategory, setBlogCategory] = useState('');

    const postImages = {
        postId1: "/images/trekker.jpg",
        postId2: "/images/trekker.jpg",
        postId3: "/images/trekker.jpg",
    }
    const imageUrl = postImages[`postId${post.id}`];

    return (
        <div className='mt-20'>
            <div className="relative mt-22 bg-gray-900 pb-20 sm:mt-36 sm:pb-24 xl:pb-0">
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <div className="absolute left-[calc(50%-19rem)] top-[calc(50%-36rem)] transform-gpu blur-3xl">
                        <div
                            className="aspect-[1097/1023] w-[68.5625rem] bg-gradient-to-r from-[#707070] to-[#44434b] opacity-25"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                </div>
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
                    <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
                        <div className="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
                            <img
                                className="absolute object-contain inset-0 h-full w-full rounded-2xl bg-gradient-to-r from-slate-500 to-gray-900 shadow-2xl"
                                src={post.feature_image}
                                alt="authorImage"
                            />
                        </div>
                    </div>
                    <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
                        <figure className="relative isolate pt-6 sm:pt-12">
                            <svg
                                viewBox="0 0 162 128"
                                fill="none"
                                aria-hidden="true"
                                className="absolute left-0 top-0  h-32 stroke-white/20"
                            >
                                <path
                                    id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
                                    d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                                />
                                <use href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" x={86} />
                            </svg>
                            <blockquote className="text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
                                <p className='text-4xl'>
                                    {post.title}
                                </p>
                            </blockquote>
                            <figcaption className="mt-8 text-base">
                                <div className="font-semibold text-white">Judith Black</div>
                                <div className="mt-1 text-gray-400">Social: </div>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
            <div className='flex pr-6 mt-14 text-gray-900 bg-white border w-36 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>
                <Link className='flex items-center' href="/blogSignUp">
                    <img className='w-7 h-7 mr-1' src='/images/blogpost.png' /> All Posts
                </Link>
            </div>
            <div className='mt-10 max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 justify-center px-6 mx-auto bg-slate-50 rounded-md'>
                <span className='w-86 pr-4 sm:justify-center pl-2 my-4'>
                    <h1 className='font-semibold border border-gray-300 rounded-lg p-2 text-gray-700 text-3xl'>{post.title}
                    </h1>
                    <ul className='mt-2 mb-4 text-sm bg-slate-100 rounded '>
                        {/* <li className='flex item-center border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>
                            <img className='w-7 h-7 mr-1' src='/images/about.png' /> About Judith Black
                        </li> */}
                        <li className='flex item-center border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>
                            <img className='w-7 h-7 mr-1' src='/images/category.png' /> Category: {blogCategory ? blogCategory : "Marketing"}
                        </li>
                        <li className='flex item-center border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>
                            <img className='w-7 h-7 mr-1' src='/images/submit.png' /> Submit product for future article
                        </li>
                        <Link href={'/register'}>
                            <li className='flex item-center border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>
                                <img className='w-7 h-7 mr-1' src='/images/aa.png' />Get Article Assistant for your Blog
                            </li>
                        </Link>
                    </ul>
                    <Button onPress={() => setIsOpen(true)} className="bg-[#878784] hover:bg-slate-700 text-white h-8 m-auto text-center font-thin px-4 rounded-md animate-pulse">
                        <span className='flex'>
                            <Image src="/images/questionmark.png"
                                width={25}
                                height={25}
                                alt="Ask the article" />
                        </span>
                        Chat with this Article
                    </Button>
                </span>

                <span className='col-span-2 my-4'>
                    <span className='text-xs flex justify-end my-2'>Reading time: {post.reading_time} mins</span>
                    <div className='text-lg' dangerouslySetInnerHTML={{ __html: post.html }} />
                    <div className="mb-22 flex w-full flex-row justify-end gap-x-2 text-slate-500">
                        <button className="hover:text-slate-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                ></path>
                                <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
                            </svg>
                        </button>
                        <button
                            className="hover:text-slate-600"
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                ></path>
                                <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"></path>
                            </svg>
                        </button>
                        <button
                            className="hover:text-slate-600"
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                ></path>
                                <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
                                <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
                            </svg>
                        </button>
                    </div>
                    <hr class="w-48 h-1 mx-auto my-4 bg-gray-300 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
                    <span className=''>
                        <CommentBox />
                    </span>
                </span>
            </div>
            <div>
                {<ChatUI postContent={postContent} isOpen={isOpen} setIsOpen={setIsOpen} />}
            </div>
        </div>
    );
};


export async function getStaticPaths() {
    const allPosts = await getPosts();

    const paths = allPosts.map((post) => ({
        params: { slug: post.slug }
    }));

    return {
        paths,
        fallback: false
    };
}


export async function getStaticProps({ params }) {
    const post = await getSinglePost(params.slug);

    if (!post) {
        return {
            notFound: true
        };
    }

    return {
        props: { post }
    };
}

export default PostPage;
