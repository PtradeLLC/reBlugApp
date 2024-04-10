import React, { useState } from 'react';
import { blogTab, articles_tab, sposorship_tab, tools_tab } from "../utils/tabpage";
import Compose from './Blogs/Write';
import Accordion from "./Accordion";

const tabs = [
    { name: 'Features', href: '#features', current: true, content: blogTab },
    { name: 'Tools', href: '#tools', current: false, content: tools_tab },
    { name: 'Latest Article', href: '#outcomes', current: false, content: articles_tab },
    { name: 'Sponsorship Inquiries', href: '#campaign', current: false, content: sposorship_tab },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function BlogTabs() {
    const [selectedTab, setSelectedTab] = useState(tabs.find((tab) => tab.current));
    const [activeUser, setActiveUser] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const handleClick = () => {
        setActiveUser(true);
    }
    const openModal = () => {
        setShowModal(true);
    }

    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
                    value={selectedTab.name}
                    onChange={(e) => setSelectedTab(tabs.find((tab) => tab.name === e.target.value))}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name} value={tab.name}>
                            {tab.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
                    {activeUser && tabs.map((tab, tabIdx) => (
                        <a
                            key={tab.name}
                            href={tab.href}
                            className={classNames(
                                selectedTab === tab ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                                tabIdx === 0 ? 'rounded-l-lg' : '',
                                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
                            )}
                            onClick={() => handleTabClick(tab)}
                            aria-current={selectedTab === tab ? 'page' : undefined}
                        >
                            <span>{tab.name}</span>
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    selectedTab === tab ? 'bg-green-500' : 'bg-transparent',
                                    'absolute inset-x-0 bottom-0 h-0.5'
                                )}
                            />
                        </a>
                    ))}
                </nav>
            </div>
            <div className="mt-4">
                {activeUser && selectedTab.name === "Features" ? (
                    <div className="divide-y divide-gray-100">
                        <div className='bg-slate-50 rounded-md my-8 p-3'>
                            Features:
                            1. Article Assistant: This AI-powered tool enables you to include conversational chatbot seamlessly on your blog page.
                            2. Directory Listing: Directory is a social directory designed to connect you with other like-minded bloggers as well as you with brands.
                            By harnessing this service, you can build Strategic Alliances, and benefit from authentic reviews/recommendations from trusted voices in
                            your industry.
                        </div>
                        <div className="relative flex items-start pb-4 pt-3.5">
                            <div className="min-w-0 flex-1 text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                    Accept Article Sponsorship
                                </label>
                                <p id="comments-description" className="text-gray-500">
                                    Brands are always looking for ways to market their products, consider and accept sponsorship in article.
                                </p>
                            </div>
                            <div className="ml-3 flex h-6 items-center">
                                <input
                                    id="comments"
                                    aria-describedby="comments-description"
                                    name="comments"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                                />
                            </div>
                        </div>
                        <div className="relative flex items-start pb-4 pt-3.5">
                            <div className="min-w-0 flex-1 text-sm leading-6">
                                <label htmlFor="candidates" className="font-medium text-gray-900">
                                    Cross-promotion
                                </label>
                                <p id="candidates-description" className="text-gray-500">
                                    Promote your blog with other bloggers within your niche category.
                                </p>
                            </div>
                            <div className="ml-3 flex h-6 items-center">
                                <input
                                    id="candidates"
                                    aria-describedby="candidates-description"
                                    name="candidates"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                                />
                            </div>
                        </div>
                        <div className="relative flex items-start pb-4 pt-3.5">
                            <div className="min-w-0 flex-1 text-sm leading-6">
                                <label htmlFor="offers" className="font-medium text-gray-900">
                                    Offers
                                </label>
                                <p id="offers-description" className="text-gray-500">
                                    Get notified when a brand accepts or rejects your offer.
                                </p>
                            </div>
                            <div className="ml-3 flex h-6 items-center">
                                <input
                                    id="offers"
                                    aria-describedby="offers-description"
                                    name="offers"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='flex flex-wrap mx-auto py-2 justify-center'>
                            <button className='bg-white border mt-2 mx-2 sm:w-auto md:w-48 rounded-md text-gray-700 p-1' type='button' onClick={openModal}>Write an Article</button>
                            <button className='bg-white border mt-2 mx-2 sm:w-auto md:w-48 rounded-md text-gray-700 p-1' type='button' onClick={handleClick}>Sponsorship Inquiries</button>
                            <button className='bg-white border mt-2 mx-2 sm:w-auto md:w-48 rounded-md text-gray-700 p-1' type='button' onClick={openModal}>Monetize your Blog</button>
                            <button className='bg-white border mt-2 mx-2 sm:w-auto md:w-48 rounded-md text-gray-700 p-1' type='button' onClick={handleClick}>Blog to Podcast</button>
                        </div>
                        <div className='mt-3'>
                            <p className='mt-3 font-thin' >Your Published Articles</p>
                            <Accordion />
                        </div>
                    </>
                )}
            </div>
            <div>
                <Compose showModal={showModal} setShowModal={setShowModal} />
            </div>
        </div>
    );
}