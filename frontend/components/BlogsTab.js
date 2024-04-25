import React, { useState, useEffect } from 'react'
import Comment from './Blogs/Comment';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { useSession } from "next-auth/react";
import { CircularProgress } from "@nextui-org/react";

const prisma = new PrismaClient();

const BlogsTab = ({ comment }) => {
    const [activeTab, setActiveTab] = useState('comments');
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [value, setValue] = useState(0);

    const { data: session } = useSession();

    const { user } = session;
    const userEmail = user?.email;

    const getUserPosts = async () => {
        try {
            const request = await axios.get(`/api/blog/postcommentAi?email=${userEmail}`);
            setPosts(request.data);

        } catch (error) {
            console.error("Error fetching user posts:", error);
            // Handle error gracefully
        }
    };

    useEffect(() => {
        getUserPosts();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v >= 100 ? 0 : v + 10));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (newComment.trim() !== '') {
            try {
                const { email } = session.user;
                const title = uniqPost.title;
                const content = uniqPost.content;

                // Validate comment content
                if (!newComment.trim()) {
                    console.error('Comment content is empty');
                    return;
                }

                // const response = await fetch('/api/blog/commentsystem', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({ comment: newComment, content: content, email: email, postTitle: title, postId: uniqPost.id })
                // }, { cache: 'force-cache' });

                // if (!response.ok) {
                //     throw new Error('Failed to post comment');
                // }

                // const responseData = await response.json();
                // setNewComment('');
                // setLoading(false);
            } catch (error) {
                console.error('Error posting comment:', error.message);
            }
        }
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'comments':
                return (
                    <>
                        <div className="gap-4 w-full mb-2 mt-3 ">
                            <div className='w-11/12 mx-auto bg-gray-100 rounded-lg p-4'>
                                <h3 className="text-lg font-thin text-gray-900 dark:text-white mb-2">All Comments</h3>
                                {posts && posts.map((post) => (
                                    <>
                                        <div className="flex justify-between px-4 ">
                                            <img className='w-7 h-7 rounded mr-2 ' src={post.featureImage || '/images/OtherVar.png'} alt={post.title} />
                                            <div className='text-xs line-clamp-2'>{post.title}</div>
                                        </div>
                                    </>
                                ))}
                                <form onSubmit={handleSubmit}>
                                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                            <label htmlFor="comment" className="sr-only">Share your thoughts</label>
                                            <textarea
                                                id="comment"
                                                rows="3"
                                                className="w-full px-4 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                                placeholder="Share your thoughts..."
                                                value={newComment}
                                                onChange={handleCommentChange}
                                                required
                                            />
                                        </div>
                                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                            <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800">
                                                Post comment
                                                {loading && (
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
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/* <div>
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
                            </div> */}
                        </div>
                    </>
                );
            case 'article':
                return (
                    <div className="gap-4 w-full mb-2 ">
                        Club Articles
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
                    Sponsors
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

export default BlogsTab;
