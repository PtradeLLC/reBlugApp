/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useWindowSize } from '@react-hook/window-size';
import { Divider } from "@nextui-org/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function BlogCategoriesHero() {
    const [width, height] = useWindowSize();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className='w-full'>
            <>
                {/* Features */}
                <div className="max-w-[85rem] px-4 py-20 sm:px-6 lg:px-8 lg:py-20 mx-auto">

                    {/* Grid */}
                    <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
                        <div className="lg:col-span-7">
                            {/* Grid */}
                            <div className="grid grid-cols-12 gap-2 sm:gap-6 items-center lg:-translate-x-10">
                                <div className="col-span-4">
                                    <img
                                        className="rounded-xl"
                                        src="/images/oneBlog.jpg"
                                        alt="Image Description"
                                    />
                                </div>
                                {/* End Col */}
                                <div className="col-span-3">
                                    <img
                                        className="rounded-xl"
                                        src="/images/superBlog.jpg"
                                        alt="Image Description"
                                    />
                                </div>
                                {/* End Col */}
                                <div className="col-span-5">
                                    <img
                                        className="rounded-xl"
                                        src="/images/sixBlog.jpg"
                                        alt="Image Description"
                                    />
                                </div>
                                {/* End Col */}
                            </div>
                            {/* End Grid */}
                        </div>
                        {/* End Col */}
                        <div className="mt-5 sm:mt-10 lg:mt-0 lg:col-span-5">
                            <div className="space-y-6 sm:space-y-8">
                                {/* Title */}
                                <div className="space-y-2 md:space-y-4">
                                    <h2 className="font-bold text-left text-3xl lg:text-4xl text-gray-800 dark:text-gray-200">
                                        Helping you succeed at your blogging endeavor with smart tools that helps:
                                    </h2>
                                </div>
                                <ul role="list" className="space-y-2 sm:space-y-4">
                                    <li className="flex space-x-2">
                                        {/* Solid Check */}
                                        <span className="mt-0.5 size-5 flex justify-start items-center rounded-full bg-green-50 text-green-600 dark:bg-green-800/30 dark:text-green-500">
                                            <svg
                                                className="flex-shrink-0 size-3.5"
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
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </span>
                                        {/* End Solid Check */}
                                        <span className="text-sm sm:text-base text-gray-500">
                                            <span className="font-bold">Articulate</span> your thoughts
                                        </span>
                                    </li>
                                    <li className="flex space-x-3">
                                        {/* Solid Check */}
                                        <span className="mt-0.5 size-5 flex justify-start rounded-full bg-green-50 text-green-600 dark:bg-green-800/30 dark:text-green-500">
                                            <svg
                                                className="flex-shrink-0 size-3.5"
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
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </span>
                                        {/* End Solid Check */}
                                        <span className="text-sm sm:text-base text-gray-500">
                                            <span className="font-bold">Improve article</span> Engagement
                                        </span>
                                    </li>
                                    <li className="flex space-x-3">
                                        {/* Solid Check */}
                                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-green-50 text-green-600 dark:bg-green-800/30 dark:text-green-500">
                                            <svg
                                                className="flex-shrink-0 size-3.5"
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
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </span>
                                        {/* End Solid Check */}
                                        <span className="text-sm text-left sm:text-base text-gray-500">
                                            <span className="font-bold">Monetize your blog through</span> brand collaboration & sponsorships.
                                        </span>
                                    </li>
                                    <li className="flex space-x-3">
                                        {/* Solid Check */}
                                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-green-50 text-green-600 dark:bg-green-800/30 dark:text-green-500">
                                            <svg
                                                className="flex-shrink-0 size-3.5"
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
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </span>
                                        {/* End Solid Check */}
                                        <span className="text-sm text-left sm:text-base text-gray-500">
                                            <span className="font-bold">AI tools</span> for interaction reader engagement.
                                        </span>
                                    </li>
                                    <li className="flex space-x-3">
                                        {/* Solid Check */}
                                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-green-50 text-green-600 dark:bg-green-800/30 dark:text-green-500">
                                            <svg
                                                className="flex-shrink-0 size-3.5"
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
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </span>
                                        {/* End Solid Check */}
                                        <span className="text-sm sm:text-base text-gray-500">
                                            Increase your <span className="font-bold">readership.</span>
                                        </span>
                                    </li>
                                    <li className="flex space-x-3">
                                        {/* Solid Check */}
                                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-green-50 text-green-600 dark:bg-green-800/30 dark:text-green-500">
                                            <svg
                                                className="flex-shrink-0 size-3.5"
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
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </span>
                                        {/* End Solid Check */}
                                        <span className="text-sm sm:text-base text-gray-500">
                                            Minimize <span className="font-bold">technical challenges.</span>
                                        </span>
                                    </li>
                                </ul>
                                <div>
                                    <p className="text-gray-500 text-left">
                                        Continue telling great stories and share them with the world.
                                        It&apos;s what you do, and our job is to help you grow your reach.
                                    </p>
                                </div>
                                <div className="flex justify-start -space-x-3">
                                    <img className="inline-block size-8 rounded-md ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description" />
                                    <img className="inline-block size-8 rounded-md ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description" />
                                    <img className="inline-block size-8 rounded-md ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80" alt="Image Description" />
                                    <img className="inline-block size-8 rounded-md ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description" />
                                    <span className="inline-flex items-center justify-center size-8 rounded-md ring-2 ring-white bg-gray-800 dark:bg-gray-900 dark:ring-gray-800">
                                        <span className="text-xs font-medium leading-none text-white uppercase">25k+</span>
                                    </span>
                                </div>
                                {/* End List */}
                            </div>
                        </div>
                        {/* End Col */}
                    </div>
                    {/* End Grid */}
                </div>
                {/* End Features */}
                <Divider className="my-4" />
            </>
        </div>
    )
}

