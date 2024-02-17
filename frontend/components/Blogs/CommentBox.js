import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession } from "next-auth/react";

const CommentBox = ({ post }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const postId = post.id;

    ///////////////////////////////////////////////
    // LOCAL STORAGE
    // const [comments, setComments] = useState(() => {
    //     // Retrieve comments from local storage
    //     const storedComments = localStorage.getItem('comments');
    //     return storedComments ? JSON.parse(storedComments) : [];
    // });

    // useEffect(() => {
    //     // Save comments to local storage whenever it changes
    //     localStorage.setItem('comments', JSON.stringify(comments));
    // }, [comments]);
    /////////////////////////////////////////////////

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newComment.trim() !== '' && session) {
            const user = session.user;

            const commentObject = {
                articleContent: newComment,
                user: user,
                date: new Date().toLocaleString(),
            };

            const { user: articleUser, name: articleEmail } = user;
            const title = post.title;

            try {
                const response = await fetch('/api/blog/commentsystem', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user: articleUser, articleContent: newComment, email: articleEmail, postTitle: title, postId: postId })
                });

                if (!response.ok) {
                    throw new Error('Failed to post comment');
                }

                const responseData = await response.json();

                setComments(prevComments => [...prevComments, { ...commentObject, responseData }]);
                setNewComment('');

            } catch (error) {
                console.error('Error posting comment:', error.message);
            }
        }
    };


    const handleTextAreaClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSignUp = () => {
        if (!session) {
            router.push('/register');
        }
    };



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
                        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                            <p className="text-sm font-normal text-gray-900 dark:text-white">Let the author know what you think about this article and perhaps what you've learned. Please keep it clean and reader friendly.</p>
                        </div>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Posted</span>
                    </div>
                </div>
            </div>
            <div>
                <ul className="comments-list">
                    {comments.length > 0 ? comments.map((comment, index) => (
                        <li key={index} className="comment-item">
                            {/* Display the user's comment */}
                            {console.log("Comments JSX:", comment)}
                            <div className="user-comment">
                                <p>{comment.articleContent}</p>
                                <p className="comment-date">Posted: {comment.date}</p>
                            </div>

                            {/* Display the response */}
                            <div className="response">
                                {/* <p>{comment.articleContent.responseData.allData.finalResponse}</p> */}
                                {/* Display additional information if needed */}
                            </div>

                            {/* Display additional comments if available */}
                            {/* {comment.articleContent.responseData.allData.articleComments && comment.articleContent.responseData.allData.articleComments.length > 0 && (
                                <div className="additional-comments">
                                    <p>Additional Comments:</p>
                                    <ul>
                                        {comment.articleContent.responseData.allData.articleComments.map((additionalComment, idx) => (
                                            <li key={idx}>
                                                <p>{additionalComment.comment}</p>
                                                <p className="comment-date">Posted: {additionalComment.date}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )} */}
                        </li>
                    )) : null}
                </ul>
            </div>
            {/* <ul className="overflow-y-auto h-[250px]">
                {comments.length > 0 ? comments.map((comment) => (
                    <>
                        <li key={comment.id} className="">
                            {comment.articleComments && comment.articleComments.map((article, idx) => (
                                <>
                                    <span className='flex'>
                                        {comment.user.image ? (
                                            <img className="w-8 h-8 mr-2 rounded-full" src={comment.user.image} alt="profileImage" />
                                        ) : (
                                            <img className="w-8 h-8 mr-2 rounded-full" src="/images/OtherVar.png" alt="profileImage" />
                                        )}
                                        <span className='flex text-sm justify-center items-center font-thin'>{comment.user.name}</span>
                                    </span>

                                    <span key={idx} className="flex flex-col w-full mb-4 leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                        <p className="text-sm font-normal text-gray-900 dark:text-white">{article.comment}</p>
                                        <p className="text-sm font-normal text-gray-500 mt-1">posted: {comment.date}</p>
                                    </span>
                                </>
                            )
                            )}
                            <>
                                <span className='flex'>
                                    <img className="w-8 h-8 mr-2 rounded-full" src="/images/OtherVar.png" alt="profileImage" />
                                    <span className='flex text-sm justify-center items-center font-thin'>Article Assistant</span>
                                </span>
                                <span className="flex flex-col w-full mb-4 leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                    <p className="text-sm font-normal text-gray-900 dark:text-white">{comment.finalResponse.split('* ').join('\n* ')}</p>
                                    <p className="text-sm text-gray-500 mt-1 font-thin">posted: {comment.date}</p>
                                </span>
                            </>
                        </li>
                    </>
                )) : null}
            </ul> */}
            {/* <ul className="overflow-y-auto h-[250px]">
                {comments.map((comment) => (
                    <>
                        <li key={comment.id} className="">
                            {comment.articleComments && comment.articleComments.map((article, idx) => (
                                <>
                                    <span className='flex'>
                                        {comment.user.image ? (
                                            <img className="w-8 h-8 mr-2 rounded-full" src={comment.user.image} alt="profileImage" />
                                        ) : (
                                            <img className="w-8 h-8 mr-2 rounded-full" src="/images/OtherVar.png" alt="profileImage" />
                                        )}
                                        <span className='flex text-sm justify-center items-center font-thin'>{comment.user.name}</span>
                                    </span>
                                    {console.log("COMM", comment)}
                                    <span key={idx} className="flex flex-col w-full mb-4 leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                        <p className="text-sm font-normal text-gray-900 dark:text-white">{article.comment}</p>
                                        <p className="text-sm font-normal text-gray-500 mt-1">posted: {comment.date}</p>
                                    </span>
                                </>
                            )
                            )}
                            <>
                                <span className='flex'>
                                    <img className="w-8 h-8 mr-2 rounded-full" src="/images/OtherVar.png" alt="profileImage" />
                                    <span className='flex text-sm justify-center items-center font-thin'>Article Assistant</span>
                                </span>
                                <span className="flex flex-col w-full mb-4 leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                    <p className="text-sm font-normal text-gray-900 dark:text-white">{comment.finalResponse.split('* ').join('\n* ')}</p>
                                    <p className="text-sm text-gray-500 mt-1 font-thin">posted: {comment.date}</p>
                                </span>
                            </>
                        </li>

                    </>
                ))}
            </ul> */}
            <form onSubmit={handleSubmit}>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label htmlFor="comment" className="sr-only">Share your thoughts</label>
                        <textarea
                            id="comment"
                            rows="4"
                            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                            placeholder="Share your thoughts..."
                            value={newComment}
                            onChange={handleCommentChange}
                            onClick={handleTextAreaClick}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800">
                            Post comment
                        </button>
                    </div>
                </div>
            </form>
            <div className='flex px-2'>
                <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-red-600 dark:text-red-500 hover:underline">Community Guidelines</a>.</p>
                <span className="text-xs ml-2 font-thin text-gray-600">
                    Powered by{" "}
                    <Link href="http://forgedmart.com/">ForgedMart</Link>
                </span>
            </div>
            {!session && showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <img src='/images/Marttwainxyz.png' />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Please create an account or login to share your thoughts on this article
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                If you don't have an account yet, you can <button onClick={handleSignUp} className="text-red-600 dark:text-red-500 hover:underline">sign up here</button>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-700 text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentBox;
