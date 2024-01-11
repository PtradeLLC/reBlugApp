import React, { useState } from 'react';
import { emailTab, marketing_tab, outcomes_tab, blogTab, articles_tab, sposorship_tab, tools_tab, toolsArray } from "../utils/tabpage";

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

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const handleClick = (e) => {
        console.log("AI is active");
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
                    className="block w-full rounded-md border-gray-300 focus:border-red-500 focus:ring-red-500"
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
                    {tabs.map((tab, tabIdx) => (
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
                                    selectedTab === tab ? 'bg-red-500' : 'bg-transparent',
                                    'absolute inset-x-0 bottom-0 h-0.5'
                                )}
                            />
                        </a>
                    ))}
                </nav>
            </div>
            <div className="mt-4">
                {selectedTab.name === "Tools" ? (
                    selectedTab.content.map((item, index) => (
                        item.isActive ? (
                            <div className=''>
                                <p className='font-semibold'>Enabled Tools</p>
                                <button className='bg-green-600 mt-2 rounded-md text-white p-2' type='button' onClick={handleClick}>{item.name}</button>
                            </div>
                        ) : (<div className=''>
                            <p className='font-semibold'>Select available tool from the list below to install and enable:</p>
                            <button className='bg-red-600 mt-2 rounded-md text-white p-2' type='button' onClick={handleClick}>{item.name}</button>
                        </div>)
                    ))
                ) : selectedTab.content.split('\n').map((str, index) => <p key={index}>{str}</p>)}
            </div>


        </div>
    );
}
