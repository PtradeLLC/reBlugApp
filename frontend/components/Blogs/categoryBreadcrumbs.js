import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import CatBlogPage from "../../pages/categories/[id]";
import { CircularProgress } from "@nextui-org/react";


export default function BlogCategories({ categories }) {
    const [currentPage, setCurrentPage] = useState("Home");
    const router = useRouter();
    const [showCrumbs, setShowCrumbs] = useState(false);
    const uniqueCategoryIds = new Set();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(0);

    useEffect(() => {
        setCurrentPage("Home");
    }, []);

    // Handles setting value for the loader
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
        <>
            <span>
                <h1 className="font-semibold mb-4">Categories</h1>
            </span>
            <div className="flex overflow-hidden hover:overflow-x-auto w-[90%] px-2 flex-grow justify-start items-center">
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
                    maxItems={21}
                    itemsBeforeCollapse={10}
                    itemsAfterCollapse={10}
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
                    {categories && categories.map((category) => (
                        // Render all categories regardless of loading state
                        <BreadcrumbItem
                            key={category.id}
                            href={`/categories/${category.id}`}
                            isCurrent={currentPage === category.id}
                            onPress={() => handleClick(category.id)}
                        >
                            {category.title}
                        </BreadcrumbItem>
                    ))}
                </Breadcrumbs>
                <div>
                    {showCrumbs && categories.length > 0 && <CatBlogPage categories={categories} />}
                </div>
            </div>
        </>
    );
}