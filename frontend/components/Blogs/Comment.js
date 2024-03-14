import React from 'react';
import { useSession } from "next-auth/react";

const Comment = ({ comment }) => {
    const { data: session } = useSession();

    return (
        <div>
            <div>
                <div>
                    <div>
                        <div className="flex mb-7 items-start gap-2.5">
                            <div className="flex flex-col gap-1 w-full">
                                <img className="w-8 h-8 rounded-full" src={comment?.user?.image || "/images/OtherVar.png"} alt="profileImage" />
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{comment?.user?.firstName}</span>
                                </div>
                                <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                    <p className="text-sm font-normal text-gray-900 dark:text-white">{comment?.content}</p>
                                </div>
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Posted</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex mb-7 items-start gap-2.5">
                            <img className="w-8 h-8 rounded-full" src="/images/OtherVar.png" alt="profileImage" />
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Article Assistant</span>
                                </div>
                                <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                    <p className="text-sm font-normal text-gray-900 dark:text-white">{comment?.aiResponse}</p>
                                </div>
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Posted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
