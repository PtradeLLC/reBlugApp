
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";


export default function BlogCategories({ categories }) {
    const [currentPage, setCurrentPage] = useState("Home");
    const router = useRouter();
    const [showCrumbs, setShowCrumbs] = useState(true);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(0);
    const [valueddd, setValueddd] = useState(null);

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

    // Filter out duplicate categories based on ID
    const uniqueCategories = categories.filter(
        (category, index) => categories.findIndex(c => c.id === category.id) === index
    );

    return (
        <>
            <span>
                <h1 className="font-semibold mb-4">Categories</h1>
            </span>
            <div className="flex overflow-hidden hover:overflow-x-auto flex-grow justify-start p-2 items-center">
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
                            "px-2 py-2 border-small border-default-400 rounded-small",
                            "data-[current=true]:border-foreground data-[current=true]:bg-foreground data-[current=true]:text-background transition-colors",
                            "data-[disabled=true]:border-default-400 data-[disabled=true]:bg-default-100",
                        ],
                        separator: "hidden",
                    }}
                >
                    <BreadcrumbItem key="home" href={`/posts`} isCurrent={currentPage === "home"}>
                        All Blogs
                    </BreadcrumbItem>
                    {uniqueCategories && uniqueCategories.map((category) => (
                        <BreadcrumbItem
                            key={category.id} // or category.slug if unique
                            href={`/categories/${category.id}`}
                            isCurrent={currentPage === category.id}
                            onPress={() => handleClick(category.id)}
                        >
                            {category.title}
                        </BreadcrumbItem>
                    ))}
                </Breadcrumbs>
            </div>
        </>
    );
}



