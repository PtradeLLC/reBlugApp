import { Dropdown } from '@nextui-org/react';
import React from 'react'

const CommChat = () => {

    const blogCategories = [
        { name: "Books and Literature", href: "#", icon: "booksIcon" },
        { name: "DIY and Crafts", href: "#", icon: "diyIcon" },
        { name: "Learning", href: "#", icon: "educationIcon" },
        { name: "Entertainment", href: "#", icon: "entertainmentIcon" },
        { name: "Marketing", href: "#", icon: "entertainmentIcon" },
        { name: "Pop Culture", href: "#", icon: "environmentIcon" },
        { name: "Environmentalism", href: "#", icon: "environmentIcon" },
        { name: "Fashion and Beauty", href: "#", icon: "fashionIcon" },
        { name: "Finance", href: "#", icon: "financeIcon" },
        { name: "Food and Cooking", href: "#", icon: "foodIcon" },
        { name: "Health and Wellness", href: "#", icon: "healthIcon" },
        { name: "Lifestyle", href: "#", icon: "lifestyleIcon" },
        { name: "Parenting", href: "#", icon: "parentingIcon" },
        { name: "Photography", href: "#", icon: "photographyIcon" },
        { name: "Current Events", href: "#", icon: "politicsIcon" },
        { name: "Relationships", href: "#", icon: "relationshipsIcon" },
        { name: "Science and Technology", href: "#", icon: "scienceIcon" },
        { name: "Sports and Fitness", href: "#", icon: "sportsIcon" },
        { name: "Travel", href: "#", icon: "travelIcon" }
    ];


    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     const baseurl = "/api/chatContent";
    // };


    return (
        <div className="w-11/12">
            <>

                {/* Chat Bot */}
                <div className="relative w-full">
                    {/* Search */}
                    <footer className="max-w-4xl mx-auto sticky top-0 p-3 sm:py-6">
                        <div className="lg:hidden flex justify-end mb-2 sm:mb-3">
                            {/* Sidebar Toggle */}
                            <button
                                type="button"
                                className="p-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                data-hs-overlay="#application-sidebar"
                                aria-controls="application-sidebar"
                                aria-label="Toggle navigation"
                            >
                                <svg
                                    className="flex-shrink-0 size-3.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1={3} x2={21} y1={6} y2={6} />
                                    <line x1={3} x2={21} y1={12} y2={12} />
                                    <line x1={3} x2={21} y1={18} y2={18} />
                                </svg>
                                <span>Sidebar</span>
                            </button>
                        </div>
                        {/* Input */}
                        <form handleSubmit={handleSubmit}>
                            {/* <label>
                                <Dropdown>
                                    <Dropdown.Button flat>
                                        Select Category
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        color="secondary"
                                        onAction={(key) => console.log(key)}
                                    >
                                        {blogCategories.map((item) => (
                                            <Dropdown.Item key={item.name} color="secondary" css={{ tt: "capitalize" }}>
                                                {item.name}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </label> */}
                            <div className="relative">
                                <textarea
                                    className="p-4 pb-12 block w-full bg-gray-100 border-gray-200 rounded-lg text-sm focus:border-red-500 focus:ring-red-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    placeholder="What's going on today..."
                                    defaultValue={""}
                                />
                                {/* Toolbar */}
                                <div className="absolute bottom-px inset-x-px p-2 rounded-b-md bg-gray-100 dark:bg-neutral-800">
                                    <div className="flex justify-between items-center">
                                        {/* Button Group */}
                                        <div className="flex items-center">
                                            <button
                                                type="button"
                                                className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-red-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-neutral-500 dark:hover:text-red-500"
                                            >
                                                <svg
                                                    className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <rect width={18} height={18} x={3} y={3} rx={2} />
                                                    <line x1={9} x2={15} y1={15} y2={9} />
                                                </svg>
                                            </button>

                                            <button
                                                type="button"
                                                className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-red-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-neutral-500 dark:hover:text-red-500"
                                            >
                                                <svg
                                                    className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-x-1">
                                            <button
                                                type="button"
                                                className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-red-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-neutral-500 dark:hover:text-red-500"
                                            >
                                                <svg
                                                    className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                                    <line x1={12} x2={12} y1={19} y2={22} />
                                                </svg>
                                            </button>

                                            <button
                                                type="button"
                                                className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-white bg-red-600 hover:bg-red-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                <svg
                                                    className="flex-shrink-0 size-3.5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={16}
                                                    height={16}
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </footer>
                </div>
            </>
        </div>
    )
}
export default CommChat