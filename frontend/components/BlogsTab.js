import React from 'react';
import CommentBox from './Blogs/BloggerChatBox';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const BlogsTab = ({ singlePost }) => {
    return (
        <div>
            <div className="md:flex">
                <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                    <li>
                        <a href="#" className="inline-flex items-center px-4 py-3 text-white bg-slate-700 rounded-lg active w-full dark:bg-slate-600" aria-current="page">
                            <svg className="w-[26px] h-[26px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 10v-2m3 2v-6m3 6v-3m4-11v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z" />
                            </svg>
                            Comments
                        </a>
                    </li>
                    {/* Other list items */}
                </ul>
                <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Blog Comments</h3>
                    <CommentBox comments={singlePost?.comments} />
                </div>
            </div>
        </div>
    );
};

export default BlogsTab;

export async function getServerSideProps({ params }) {
    const { id } = params;

    try {
        const singlePost = await prisma.post.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                comments: {
                    include: {
                        AiResponse: true,
                        user: {
                            select: {
                                firstName: true,
                                email: true,
                            },
                        },
                    },
                },
                category: true,
            },
        });

        if (!singlePost) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                singlePost,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                error: 'Unable to fetch data',
            },
        };
    }
}
