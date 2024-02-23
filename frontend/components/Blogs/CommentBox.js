import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import useSWR, { mutate } from 'swr';

const CommentBox = ({ post, comments }) => {
    const [showModal, setShowModal] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const handleSignUp = () => {
        if (!session) {
            router.push('/register');
        }
    };

    // console.log('post', post);

    // const fetcher = async (url) => {
    //     const res = await fetch(url);

    //     const data = await res.json();

    //     if (!res.ok) {
    //         throw new Error('Failed to fetch comments');
    //     }

    //     return data;

    // }

    // // const postId = post.Id;
    // const { data: commentsData, error } = useSWR(`/api/blog/commentsystem?postId=${post.id}`, fetcher);

    // console.log(commentsData);

    return (
        <div>
            <div>
                <span className='text-xl font-semibold flex justify-center my-4'>Share your thoughts</span>
                <div className="flex mb-7 items-start gap-2.5">
                    <img className="w-8 h-8 rounded-full" src="/images/OtherVar.png" alt="profileImage" />
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">Article Assistant</span>
                            <span className="text-xs font-thin text-gray-500 dark:text-gray-400">Moderator</span>
                        </div>
                        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                            <p className="text-sm font-normal text-gray-900 dark:text-white">
                                Let the author know what you think about this article and perhaps what you've learned.
                                Please keep it clean and reader friendly. Please use 'Chat with this Article' button on
                                this page to ask questions about this article or conduct article related researches.
                            </p>
                        </div>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Posted</span>
                    </div>
                </div>
            </div>
            <div className="overflow-y-auto h-[250px]">
                {/* {commentsData && commentsData.map((item, index) => {
                    console.log("Data Item::", item)
                    return (
                        <>
                            <div key={item.id}>
                                {Array.isArray(item.comments) && item.comments.map((comment, commentIndex) => (
                                    <div>
                                        <div key={comment.id}>
                                            {console.log('post items', item)}
                                            <div className="flex mb-7 items-start gap-2.5">
                                                <img className="w-8 h-8 rounded-full" src="/images/OtherVar.png" alt="profileImage" />
                                                <div className="flex flex-col gap-1 w-full">
                                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{comment.commentBy}</span>
                                                    </div>
                                                    <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                                        <p className="text-sm font-normal text-gray-900 dark:text-white">{comment.comment}</p>
                                                    </div>
                                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Posted</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {comment.aiResponse && comment.aiResponse.map((response, aiIndex) => (
                                                <div key={response.id}>
                                                    <div className="flex mb-7 items-start gap-2.5">
                                                        <img className="w-8 h-8 rounded-full" src="/images/OtherVar.png" alt="profileImage" />
                                                        <div className="flex flex-col gap-1 w-full">
                                                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">Article Assistant</span>
                                                            </div>
                                                            <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                                                <p className="text-sm font-normal text-gray-900 dark:text-white">{response.response}</p>
                                                            </div>
                                                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Posted</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    );
                })} */}
            </div>
            <div className='flex px-2'>
                <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-red-600 dark:text-red-500 hover:underline">Community Guidelines</a>.</p>
                <span className="text-xs ml-2 font-thin text-gray-600">
                    Powered by{" "}
                    <Link href="http://forgedmart.com/">ForgedMart</Link>
                </span>
            </div>
            {!session && showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <img src='/images/Marttwainxyz.png' />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Please create an account or login to share your thoughts on this article
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                If you don't have an account yet, you can <button onClick={handleSignUp} className="text-red-600 dark:text-red-500 hover:underline">sign up here</button>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-700 text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentBox;
