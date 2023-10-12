import React, { useState } from 'react';
import { emailTab, marketing_tab, outcomes_tab } from "../utils/tabpage";

const tabs = [
    { name: 'Features', href: '#features', current: true, content: emailTab },
    { name: 'Latest Campaign', href: '#campaign', current: false, content: 'Content for Company tab' },
    { name: 'Outcomes', href: '#outcomes', current: false, content: 'Content for Team Members tab' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function EmailTabs() {
    const [selectedTab, setSelectedTab] = useState(tabs.find((tab) => tab.current));

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

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
            <div className="mt-4">{selectedTab.content}</div>
        </div>
    );
}
