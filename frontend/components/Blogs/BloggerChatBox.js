import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import { CircularProgress } from "@nextui-org/react";
import Comment from './Comment';

const CommentBox = ({ comments }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(0);

    // Handles setting value for the loader
    useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v >= 100 ? 0 : v + 10));
        }, 500);

        return () => clearInterval(interval);
    }, []);


    return (
        <div>
            <div className="flex items-start gap-2.5">
                <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image" />
                <div className="flex flex-col gap-1 w-full max-w-[320px]">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                    </div>
                    <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div classNameName="overflow-y-auto h-[320px]">
                            {!loading ? (
                                <>
                                    {comments.length > 0 ? comments.map((comment) => (
                                        <Comment key={comment.id} comment={comment} />
                                    )) : (
                                        <p classNameName='text-sm font-normal text-gray-900 dark:text-white'>
                                            There is no comment posted yet for this article
                                        </p>
                                    )}
                                </>
                            ) : (
                                <div classNameName="flex justify-center">
                                    <CircularProgress
                                        aria-label="Loading..."
                                        size="sm"
                                        value={value}
                                        color="warning"
                                        classNameName='mx-2'
                                        showValueLabel={true}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                </div>
                <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                </button>
                {/* <div id="dropdownDots" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                        </li>
                    </ul>
                </div> */}
            </div>
        </div>
    );
};

export default CommentBox;
