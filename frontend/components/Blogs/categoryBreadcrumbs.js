import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";

export default function BlogCategories() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState("home");
    const [blogCategories, setBlogCategories] = useState([]);

    const getCategories = async () => {
        try {
            const response = await fetch('/api/blog/allBlogsCategories');

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }



            const createdCategories = await response.json();

            // console.log(createdCategories);

            setBlogCategories(createdCategories);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleClick = (slug) => {
        setCurrentPage(slug);
        router.push(`/categories/${slug}`);
    };

    // console.log(blogCategories);

    return (
        <>
            <span><h1 className="font-semibold mb-4">Categories</h1></span>
            <div className="flex overflow-hidden hover:overflow-x-auto w-[90%] px-2 flex-grow justify-start items-center">
                <Breadcrumbs
                    size="sm"
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
                        Blog Home
                    </BreadcrumbItem>
                </Breadcrumbs>
                {/* {blogCategories?.map((item) => (
                    <Breadcrumbs
                        key={item._id}
                        size="sm"
                        onAction={() => handleClick(item.slug)} // Pass the slug to handleClick
                        classNames={{
                            list: "gap-2",
                        }}
                        itemClasses={{
                            item: [
                                "px-2 mx-1 py-0.5 border-small border-default-400 rounded-small",
                                "data-[current=true]:border-foreground data-[current=true]:bg-foreground data-[current=true]:text-background transition-colors",
                                "data-[disabled=true]:border-default-400 data-[disabled=true]:bg-default-100",
                            ],
                            separator: "hidden",
                        }}
                    >
                        <BreadcrumbItem
                            key={item._id}
                            isCurrent={currentPage === item.slug} // Check against the slug
                            href={`#${item.slug}`}
                        >
                            {item.title}
                        </BreadcrumbItem>
                    </Breadcrumbs>
                ))} */}
            </div>
        </>
    );
}

