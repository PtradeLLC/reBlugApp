import React from 'react'
import BlogListGroup from './BlogListGroup'
import Link from 'next/link'

const BlogComponent = () => {
    return (
        <div id='blog-tool' className='bg-slate-50 w-fit'>

            <div className="max-w-[85rem] px-4 mt-1 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

                <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
                    <div className="lg:col-span-7">

                        <div className="grid grid-cols-12 gap-2 sm:gap-6 items-center lg:-translate-x-10">
                            <div className="col-span-4 ml-2 pl-2">
                                <img className="rounded-xl" src="/images/AIblogger4.jpg" alt="Image Description" />
                            </div>
                            <div className="col-span-3">
                                <img className="rounded-xl" src="/images/blogger1.jpg" alt="Image Description" />
                            </div>
                            <div className="col-span-5">
                                <img className="rounded-xl" src="/images/AIblogger2.jpg" alt="Image Description" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-10 lg:mt-0 lg:col-span-5 ">
                        <div className="space-y-6 sm:space-y-8">

                            <div className="space-y-2 md:space-y-4">
                                <h2 className="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-gray-200">
                                    Running a blog?
                                </h2>
                                <p className="font-bold text-2xl lg:text-3xl text-gray-700 dark:text-gray-200">
                                    Give your articles superpowers
                                </p>
                                <p className="text-gray-500">
                                    Include our AI-powered Article Assistant tool as part of your marketing strategy.
                                </p>
                            </div>

                            <ul role="list" className="space-y-2 sm:space-y-4">
                                <li className="flex space-x-3">

                                    <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-red-50 text-red-600 dark:bg-red-800/30 dark:text-red-500">
                                        <svg className="flex-shrink-0 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>


                                    <span className="text-sm sm:text-base text-gray-500">
                                        <span className="font-bold">AI Powered Assistant</span> – Each published article gets its own AI assistant to provide 'In-article research' to readers.
                                    </span>
                                </li>
                                <li className="flex space-x-3">

                                    <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-red-50 text-red-600 dark:bg-red-800/30 dark:text-red-500">
                                        <svg className="flex-shrink-0 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>


                                    <span className="text-sm sm:text-base text-gray-500">
                                        <span className="font-bold">Knowledge Base</span> – The tool reads and uses the content of the article as a knowledge base document, also sources various information from the web to provide answers readers may have.
                                    </span>
                                </li>
                                <li className="flex space-x-3">

                                    <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-red-50 text-red-600 dark:bg-red-800/30 dark:text-red-500">
                                        <svg className="flex-shrink-0 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>


                                    <span className="text-sm sm:text-base text-gray-500">
                                        <span className="font-bold">Reader Interaction</span> – Your readers can ask related questions. The AI assistant conduct web researches and provide answers with sources on subject matter right on the article page.
                                    </span>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
                <div className='w-full mt-7'>
                    <BlogListGroup />
                </div>
                <div id="Blogger-as-platform" className="mt-8 flex justify-end items-center gap-x-6">
                    <Link href="/creators" className="text-sm font-semibold text-gray-900">
                        How it works <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BlogComponent