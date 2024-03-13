import React, { useEffect, useState } from 'react';
import { CircularProgress } from "@nextui-org/react";
import Image from 'next/image';
import Link from 'next/link';


const CardDisplay = ({ post }) => {
    const { featureImage, title, author, id, content } = post
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(0);

    // console.log(post);


    //Handles setting value for the loader
    useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v >= 100 ? 0 : v + 10));
        }, 500);

        return () => clearInterval(interval);
    }, []);




    return (
        <>
            {loading ? <div className='flex justify-center items-center'>
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
            </div> : <div key={id} className="max-w-[85rem] px-4 py-10 sm:px-4 lg:px-6 lg:py-14 mx-auto">
                <div className="grid sm:grid-cols-1 lg:grid-cols-1 gap-2">
                    <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                        <div className="h-52 flex flex-col justify-center items-center bg-slate-600 rounded-t-xl">
                            {loading ? (
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

                            ) : (<img
                                src={featureImage || "/images/bloger1.jpg"}
                                className='size-full object-cover h-52'
                                alt={post?.title}
                                style={{ objectPosition: 'top' }}
                                fallback={<CircularProgress aria-label="Loading..." size="sm" value={value} color="warning" className='mx-2' showValueLabel={true} />}
                            />)
                            }
                        </div>
                        <div className="p-4 md:p-6">
                            <span className="block mb-1 text-xs font-semibold uppercase text-slate-600 dark:text-slate-500">
                                {author}
                            </span>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
                                {title}
                            </h3>
                            <p className="mt-3 text-gray-500 line-clamp-4">
                                {content}
                            </p>
                        </div>
                        <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                            <a
                                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                href="#"
                            >
                                View sample
                            </a>
                            <Link href={`/posts/${post.id}`} className=" font-thin w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" radius="full" size="sm">Read More</Link>
                        </div>
                    </div>
                </div>
            </div>}
        </>

    )
}

export default CardDisplay