import React, { useState } from 'react'
import CommentBox from './Blogs/BloggerChatBox';
import { PrismaClient } from '@prisma/client';
import BlogActivities from './Charts/AllActivitiesChat/BlogActivities';


const prisma = new PrismaClient();

const BlogsTab = () => {
    const [activeTab, setActiveTab] = useState('comments');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'comments':
                return (
                    <>
                        <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Blog Comments</h3>
                            <CommentBox />
                        </div>
                    </>
                );
            case 'article':
                return (
                    <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                        CLUB ACTIVITIES
                    </div>
                );
            case 'sponsors':
                return (
                    <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                        Sponsors
                    </div>
                );
            case 'my-group':
                return (
                    <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                        My Group
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div>
            <div className="flex gap-4">
                <button title="Comments" type="button" onClick={() => handleTabClick('comments')} className={`inline-flex items-center px-4 py-3 text-white bg-slate-700 rounded-lg active w-full dark:bg-slate-600 ${activeTab === 'metrics' ? 'active' : ''}`}>
                    Comments
                </button>
                <button title="Metrics" type="button" onClick={() => handleTabClick('metrics')} className={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${activeTab === 'calendar' ? 'active' : ''}`}>
                    Metrics
                </button>
                <button title="Articles" type="button" onClick={() => handleTabClick('article')} className={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${activeTab === 'earn' ? 'active' : ''}`}>
                    Write an Articles
                </button>
                <button title="Sponsors" type="button" onClick={() => handleTabClick('sponsors')} className={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${activeTab === 'earn' ? 'active' : ''}`}>
                    My Sponsors
                </button>
                <button title="MyGroup" type="button" onClick={() => handleTabClick('my-group')} className={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${activeTab === 'club' ? 'active' : ''}`}>
                    My Group
                </button>
            </div>
            {/* <div className="md:flex">
                <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                    <li>
                        <button id='comments' title="Comments" type="button" onClick={() => handleTabClick('comments')} className="inline-flex items-center px-4 py-3 text-white bg-slate-700 rounded-lg active w-full dark:bg-slate-600" aria-current="page">
                            <svg class="w-[26px] h-[26px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 10v-2m3 2v-6m3 6v-3m4-11v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z" />
                            </svg>
                            Comments
                        </button>
                    </li>
                    <li>
                        <button id='metrics' title="Metrics" type="button" onClick={() => handleTabClick('metrics')} className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"><path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" /></svg>
                            Metrics
                        </button>
                    </li>
                    <li>
                        <button id='article' title="Article" type="button" onClick={() => handleTabClick('article')} className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                            </svg>
                            Write an Article
                        </button>
                    </li>
                    <li>
                        <button id='sponsors' type='button' onClick={() => handleTabClick('sponsors')} className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7.824 5.937a1 1 0 0 0 .726-.312 2.042 2.042 0 0 1 2.835-.065 1 1 0 0 0 1.388-1.441 3.994 3.994 0 0 0-5.674.13 1 1 0 0 0 .725 1.688Z" />
                                <path d="M17 7A7 7 0 1 0 3 7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V7a5 5 0 1 1 10 0v7.083A2.92 2.92 0 0 1 12.083 17H12a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a1.993 1.993 0 0 0 1.722-1h.361a4.92 4.92 0 0 0 4.824-4H17a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3Z" />
                            </svg>
                            Your Sponsors
                        </button>
                    </li>
                    <li>
                        <button id='my-group' type='button' onClick={() => handleTabClick('my-group')} className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7.824 5.937a1 1 0 0 0 .726-.312 2.042 2.042 0 0 1 2.835-.065 1 1 0 0 0 1.388-1.441 3.994 3.994 0 0 0-5.674.13 1 1 0 0 0 .725 1.688Z" />
                                <path d="M17 7A7 7 0 1 0 3 7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V7a5 5 0 1 1 10 0v7.083A2.92 2.92 0 0 1 12.083 17H12a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a1.993 1.993 0 0 0 1.722-1h.361a4.92 4.92 0 0 0 4.824-4H17a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3Z" />
                            </svg>
                            My Group
                        </button>
                    </li>

                </ul>
            </div> */}
            <div className="md:flex gap-4 w-full">
                {renderTabContent()}
            </div>
        </div>
    )
}

export default BlogsTab

export async function getServerSideProps(req) {
    const { id } = req.query;

    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });

    if (!user) {
        return {
            notFound: true
        }
    }

    const singlePost = await prisma.post.Many({
        where: {
            id: id,
        },
        include: {
            comments: {
                include: {
                    AiResponse: true,
                    user: {
                        select: {
                            firstName: true,
                            email: true
                        }
                    }
                },
            },
            category: true
        },
    });

    return {
        props: {
            posts,
            comments,
            aiResponse
        },
    }
}