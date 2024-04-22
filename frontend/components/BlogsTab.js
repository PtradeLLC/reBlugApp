import React, { useState } from 'react'
import CommentBox from './Blogs/BloggerChatBox';
import { PrismaClient } from '@prisma/client';
import BlogActivities from './Charts/AllActivitiesChat/BlogActivities';

const prisma = new PrismaClient();

const BlogsTab = () => {
    const [activeTab, setActiveTab] = useState('comments');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

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
                <button title="Comments" type="button" onClick={() => handleTabClick('comments')} className={`inline-flex items-center px-4 py-3 text-white bg-slate-700 rounded-lg active w-full dark:bg-slate-600 ${activeTab === 'comments' ? 'active' : ''}`}>
                    Comments
                </button>
                <button title="Metrics" type="button" onClick={() => handleTabClick('metrics')} className={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${activeTab === 'metrics' ? 'active' : ''}`}>
                    Metrics
                </button>
                <button title="Articles" type="button" onClick={() => handleTabClick('article')} className={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${activeTab === 'article' ? 'active' : ''}`}>
                    Write an Articles
                </button>
                <button title="Sponsors" type="button" onClick={() => handleTabClick('sponsors')} className={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${activeTab === 'sponsors' ? 'active' : ''}`}>
                    My Sponsors
                </button>
                <button title="MyGroup" type="button" onClick={() => handleTabClick('my-group')} className={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${activeTab === 'my-group' ? 'active' : ''}`}>
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
