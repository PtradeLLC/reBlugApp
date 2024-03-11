import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from "axios";
import { Pagination } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";

const CatBlogPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(12);
    const [totalPages, setTotalPages] = useState(1);
    const [categoryTitle, setCategoryTitle] = useState('');
    const [value, setValue] = useState(0);

    const loadPosts = async (page) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/blog/categoryBySlug?page=${page}`);
            const { posts, totalPages } = response.data;

            const filteredPosts = posts.filter(post => post.category.id === id);
            const totalPosts = filteredPosts.length;

            const startIndex = (page - 1) * postsPerPage;
            const endIndex = Math.min(startIndex + postsPerPage, totalPosts);

            setCategoryTitle(filteredPosts[0]?.category?.title || '');
            setPosts(filteredPosts.slice(startIndex, endIndex));
            setCurrentPage(page);
            setTotalPages(Math.ceil(totalPosts / postsPerPage));
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    //Handles setting value for the loader
    useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v >= 100 ? 0 : v + 10));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        loadPosts(1);
    }, [id]); // Reload posts when slug changes

    const handlePageChange = (page) => {
        loadPosts(page);
    };

    return (
        <div className='flex flex-col justify-center items-center mt-20'>
            {loading ? (
                <div className="flex justify-center">
                    <CircularProgress
                        aria-label="Loading..."
                        size="lg"
                        value={value}
                        color="warning"
                        className='mx-2'
                        showValueLabel={true}
                    />
                </div>) :
                (
                    <>
                        <div className="max-w-[85rem] mt-6 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                            <h1 className="text-3xl font-semibold mb-6">{categoryTitle}</h1>
                            {!loading && posts && posts.length > 0 && (
                                <ul className="grid sm:grid-cols-2 mt-7 lg:grid-cols-3 gap-6">
                                    {posts.map((item) => (
                                        <li key={item.id}>
                                            <Link
                                                href={`/posts/${item.id}`}
                                                className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 rounded-xl p-5 dark:border-gray-700 dark:hover:border-transparent dark:hover:shadow-black/[.4] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                            >
                                                <div className="aspect-w-16 aspect-h-11">
                                                    <img
                                                        className="w-full object-cover rounded-xl"
                                                        src={item.featureImage}
                                                        alt={item.category.title}
                                                    />
                                                </div>
                                                <div className="my-6">
                                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:group-hover:text-white">
                                                        {item.title}
                                                    </h3>
                                                    <p className="mt-5 line-clamp-3 text-gray-600 dark:text-gray-400">
                                                        {item.content}
                                                    </p>
                                                </div>
                                                <div className="mt-auto flex items-center gap-x-3">
                                                    <img
                                                        className="size-8 rounded-full"
                                                        src={item.image}
                                                        alt="Author Image"
                                                    />
                                                    <div>
                                                        <h5 className="text-sm text-gray-800 dark:text-gray-200">
                                                            By {item.author}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className='flex justify-center items-center my-2'>
                            <Pagination
                                total={Math.ceil(posts.length / postsPerPage)}
                                color="success"
                                initialPage={1}
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default CatBlogPage;



// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import axios from "axios";
// import { Pagination } from "@nextui-org/react";
// import { CircularProgress } from "@nextui-org/react";

// const CatBlogPage = () => {
//     const router = useRouter();
//     const { id } = router.query;
//     const [loading, setLoading] = useState(false);
//     const [posts, setPosts] = useState([]);
//     const [page, setPage] = useState(1);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [postsPerPage] = useState(12);
//     const [totalPages, setTotalPages] = useState(1);
//     const [categoryTitle, setCategoryTitle] = useState('');
//     const [value, setValue] = useState(0);

//     const loadPosts = async (page) => {
//         try {
//             setLoading(true);
//             const response = await axios.get(`/api/blog/categoryBySlug?page=${page}`);
//             const { posts, totalPages } = response.data;

//             const filteredPosts = posts.filter(post => post.category.id === id);
//             const totalPosts = filteredPosts.length;

//             const startIndex = (page - 1) * postsPerPage;
//             const endIndex = Math.min(startIndex + postsPerPage, totalPosts);

//             setCategoryTitle(filteredPosts[0]?.category?.title || '');
//             setPosts(filteredPosts.slice(startIndex, endIndex));
//             setCurrentPage(page);
//             setTotalPages(Math.ceil(totalPosts / postsPerPage));
//         } catch (error) {
//             console.error('Error fetching posts:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     //Handles setting value for the loader
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setValue((v) => (v >= 100 ? 0 : v + 10));
//         }, 500);

//         return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         loadPosts(1);
//     }, [id]); // Reload posts when slug changes

//     const handlePageChange = (page) => {
//         loadPosts(page);
//     };

//     return (
//         <>
//             {loading ? (
//                 <div className="flex justify-center">
//                     <CircularProgress
//                         aria-label="Loading..."
//                         size="lg"
//                         value={value}
//                         color="warning"
//                         className='mx-2'
//                         showValueLabel={true}
//                     />
//                 </div>) :
//                 (
//                     <>
//                         <div className="max-w-[85rem] mt-6 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
//                             <h1 className="text-3xl font-semibold mb-6">{categoryTitle}</h1>
//                             {!loading && posts && posts.length > 0 && (
//                                 <ul className="grid sm:grid-cols-2 mt-7 lg:grid-cols-3 gap-6">
//                                     {posts.length > 0 ? (
//                                         posts
//                                             .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
//                                             .map((item) => {
//                                                 return (
//                                                     <>
//                                                         <li key={item.id}>
//                                                             <Link
//                                                                 href={`/posts/${item.id}`}
//                                                                 className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 rounded-xl p-5 dark:border-gray-700 dark:hover:border-transparent dark:hover:shadow-black/[.4] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                                                             >
//                                                                 <div className="aspect-w-16 aspect-h-11">
//                                                                     <img
//                                                                         className="w-full object-cover rounded-xl"
//                                                                         src={item.featureImage}
//                                                                         alt={item.category.title}
//                                                                     />
//                                                                 </div>
//                                                                 <div className="my-6">
//                                                                     <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:group-hover:text-white">
//                                                                         {item.title}
//                                                                     </h3>
//                                                                     <p className="mt-5 line-clamp-3 text-gray-600 dark:text-gray-400">
//                                                                         {item.content}
//                                                                     </p>
//                                                                 </div>
//                                                                 <div className="mt-auto flex items-center gap-x-3">
//                                                                     <img
//                                                                         className="size-8 rounded-full"
//                                                                         src={item.image}
//                                                                         alt="Author Image"
//                                                                     />
//                                                                     <div>
//                                                                         <h5 className="text-sm text-gray-800 dark:text-gray-200">
//                                                                             By {item.author}
//                                                                         </h5>
//                                                                     </div>
//                                                                 </div>
//                                                             </Link>
//                                                         </li>
//                                                     </>
//                                                 )

//                                             })
//                                     ) : (
//                                         <span>{!loading && (!posts || posts.length === 0) && <p>Loading...</p>}</span>
//                                     )}
//                                 </ul>
//                             )}
//                         </div>
//                         <div className='flex justify-center items-center my-2'>
//                             <Pagination
//                                 total={Math.ceil(posts.length / postsPerPage)}
//                                 color="success"
//                                 initialPage={1}
//                                 page={currentPage}
//                                 onChange={handlePageChange}
//                             />
//                         </div>
//                     </>
//                 )
//             }
//         </>
//     );
// };

// export default CatBlogPage;
