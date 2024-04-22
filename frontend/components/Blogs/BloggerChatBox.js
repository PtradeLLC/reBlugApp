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
            <div>
                <span className='text-xl font-semibold flex justify-center my-4'>Share your thoughts</span>
                <div className="flex mb-7 items-start gap-2.5">
                    <img className="w-8 h-8 rounded-full" src="/images/OtherVar.png" alt="profileImage" />
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">Article Assistant</span>
                            <span className="text-xs font-thin text-gray-500 dark:text-gray-400">Moderator</span>
                        </div>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Posted</span>
                    </div>
                </div>
            </div>
            <div className="overflow-y-auto h-[320px]">
                {!loading ? (
                    <>
                        {comments.length > 0 ? comments.map((comment) => (
                            <Comment key={comment.id} comment={comment} />
                        )) : (
                            <p className='text-sm font-normal text-gray-900 dark:text-white'>
                                There is no comment posted yet for this article
                            </p>
                        )}
                    </>
                ) : (
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
                )}
            </div>
        </div>
    );
};

export default CommentBox;
