import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function BlogCategories() {
    const [currentPage, setCurrentPage] = useState("Home");
    const router = useRouter();
    const [showCrumbs, setShowCrumbs] = useState(true);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(0);
    const [categories, setCategories] = useState(null);
    const { id } = router.query;

    // console.log(id);

    let singleCat;

    if (process.env.NODE_ENV === 'production') {
        singleCat = `/api/blog/uniqueCategory/${id}`;
    } else if (process.env.NODE_ENV === 'development') {
        singleCat = `/api/blog/uniqueCategory/${id}`;
    }

    const { data, error, isValidating, mutate } = useSWR(`https://www.reblug.com/api/blog/uniqueCategory/${id}`, fetcher);

    useEffect(() => {
        if (error) console.error("An error occurred:", error);
        if (!isValidating) setLoading(false);
    }, [error, isValidating]);


    useEffect(() => {
        if (data) {
            setLoading(false)
            setCategories(data)
        }
    }, [data]);

    useEffect(() => {
        setCurrentPage("Home");
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v >= 100 ? 0 : v + 10));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const handleClick = (id) => {
        setCurrentPage(id);
        setShowCrumbs(true);
        router.push(`/categories/${id}`);
    };

    return (
        <div className="mt-20">
            <>
                <span>
                    <h1 className="font-semibold mb-4">Categories</h1>
                </span>
                <div className="flex overflow-hidden hover:overflow-x-auto w-[90%] px-2 flex-grow justify-start h-[60px] items-center">
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
                    <Breadcrumbs
                        size="sm"
                        maxItems={41}
                        itemsBeforeCollapse={21}
                        itemsAfterCollapse={22}
                        onAction={(key) => setCurrentPage(key)}
                        classNames={{
                            list: "gap-2",
                        }}
                        itemClasses={{
                            item: [
                                "px-2 py-0.5 border-small border-default-400 rounded-small",
                                "data-[current=true]:border-foreground data-[current=true]:bg-foreground data-[current=true]:text-background transition-colors",
                                "data-[disabled=true]:border-default-400 data-[disabled=true]:bg-default-100",
                            ],
                            separator: "hidden",
                        }}
                    >
                        <BreadcrumbItem key="home" href={`/posts`} isCurrent={currentPage === "home"}>
                            All Blogs
                        </BreadcrumbItem>
                        {categories && categories.posts && Array.isArray(categories.posts) &&
                            Array.from(new Set(categories.posts.map(post => post.category.id))).map(categoryId => {
                                const post = categories.posts.find(post => post.category.id === categoryId);
                                return (
                                    <BreadcrumbItem
                                        key={categoryId}
                                        href={`/categories/${categoryId}`}
                                        isCurrent={currentPage === categoryId}
                                        onPress={() => handleClick(categoryId)}
                                    >
                                        {post.category.title}
                                    </BreadcrumbItem>
                                );
                            })
                        }
                    </Breadcrumbs>
                </div>
                <div className="max-w-[85rem] mt-6 px-4 py-10 sm:px-6 lg:px-8 mx-auto">
                    {!loading && categories && categories.posts && categories.posts.length > 0 && (
                        <ul className="grid sm:grid-cols-2 mt-7 lg:grid-cols-3 gap-6">
                            {categories.posts.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={`/posts/${item.id}`}
                                        className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 rounded-xl p-5 dark:border-gray-700 dark:hover:border-transparent dark:hover:shadow-black/[.4] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                    >
                                        <div className="relative flex justify-center aspect-[2/1] h-full xl:aspect-auto">
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
                                            ) : (
                                                <Image
                                                    src={item.featureImage || "/images/bloger2.jpg"}
                                                    sizes="100vw"
                                                    style={{
                                                        width: '100%',
                                                        height: 'auto',
                                                    }}
                                                    width={500}
                                                    height={300}
                                                    // style={{ objectPosition: 'top' }}
                                                    alt={item?.title}
                                                    fallback={<CircularProgress aria-label="Loading..." size="sm" value={value} color="warning" className='mx-2' showValueLabel={true} />}
                                                />
                                            )}
                                        </div>
                                        <div className="my-6">
                                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:group-hover:text-white">
                                                {item.title}
                                            </h3>
                                            <p className="mt-5 line-clamp-1 text-gray-600 dark:text-gray-400">
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
                                                    {/* {console.log(item)} */}
                                                </h5>
                                                <h5 className="text-sm text-gray-800 dark:text-gray-200">
                                                    {item.category.title}
                                                </h5>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </>
        </div>
    );
}