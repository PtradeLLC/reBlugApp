import React, { useState } from 'react'
import Comment from './Blogs/Comment';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const BlogsTab = ({ comment }) => {
    const [activeTab, setActiveTab] = useState('comments');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'comments':
                return (
                    <>
                        <div className="gap-4 w-full mb-2 ">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Blog Comments</h3>
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
                    </>
                );
            case 'article':
                return (
                    <div className="gap-4 w-full mb-2 ">
                        CLUB ACTIVITIES
                    </div>
                );
            case 'sponsors':
                return (
                    <div className="gap-4 w-full mb-2 ">
                        Sponsors
                    </div>
                );
            case 'my-group':
                return (
                    <div className="gap-4 w-full mb-2 ">
                        My Group
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div>
            <div className="flex gap-4 blogCommentButtons">
                <button title="Comments" type="button" onClick={() => handleTabClick('comments')} className={`inline-flex items-center px-4 py-3 text-sm text-white bg-slate-700 rounded-lg active w-full dark:bg-slate-600 ${activeTab === 'comments' ? 'active' : ''}`}>
                    Comments
                </button>
                <button title="Metrics" type="button" onClick={() => handleTabClick('metrics')} className={`inline-flex items-center px-4 py-3 text-sm rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${activeTab === 'metrics' ? 'active' : ''}`}>
                    Metrics
                </button>
                <button title="Articles" type="button" onClick={() => handleTabClick('article')} className={`inline-flex items-center px-4 py-3 text-sm rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${activeTab === 'article' ? 'active' : ''}`}>
                    Write Article
                </button>
                <button title="Sponsors" type="button" onClick={() => handleTabClick('sponsors')} className={`inline-flex items-center px-4 py-3 text-sm rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${activeTab === 'sponsors' ? 'active' : ''}`}>
                    My Sponsors
                </button>
                <button title="MyGroup" type="button" onClick={() => handleTabClick('my-group')} className={`inline-flex items-center px-4 py-3 text-sm rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${activeTab === 'my-group' ? 'active' : ''}`}>
                    My Group
                </button>
            </div>
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
