import React, { useState } from 'react';
import AreaActivities from './Charts/AllActivitiesChat/AreaActivities';
import BlogActivities from './Charts/AllActivitiesChat/BlogActivities';
import Earnings from './Charts/AllActivitiesChat/Earnings';
import OpenVsClick from './Charts/AllActivitiesChat/OpenClick';
import CalendarComponent from './CalendarComponent';
import CommChat from './ChatBot/CommChat';
import BlogChatUI from './BlogChatUI';

const AllActivitiesTab = () => {
    const [activeTab, setActiveTab] = useState('metrics');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'metrics':
                return (
                    <div className="flex-col gap-4 w-full">
                        <div className="gap-4 w-full mb-2 ">
                            <span>
                                <CommChat />
                            </span>
                        </div>
                        <hr />
                        <div className="gap-4 mb-2 w-full">
                            {/* <BlogChatUI /> */}
                        </div>
                    </div>
                );
            case 'calendar':
                return (
                    <div className="gap-4 w-full mb-2">
                        <CalendarComponent />
                    </div>
                );
            case 'earn':
                return (
                    <div className="gap-4 w-full mb-2">
                        <Earnings />
                    </div>
                );
            case 'club':
                return (
                    <div className="gap-4 w-full mb-2">
                        There are no activities.
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="flex gap-4 w-[11/12] h-[30] mb-2">
                <button title="Metrics" type="button" onClick={() => handleTabClick('metrics')} className={`inline-flex items-center px-4  h-[36px] py-3 text-sm text-gray-700 bg-slate-100 rounded-lg active w-full dark:bg-slate-50 ${activeTab === 'metrics' ? 'active' : ''}`}>
                    <img className="w-6 h-6 rounded-full" src="/images/chat.png" alt="chatImage" />
                    Chat
                </button>
                <button title="Calendar" type="button" onClick={() => handleTabClick('calendar')} className={`inline-flex items-center px-4 h-[36px] py-3 text-sm rounded-lg hover:text-gray-300 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-300 dark:hover:bg-gray-100 dark:hover:text-white ${activeTab === 'calendar' ? 'active' : ''}`}>
                    <img className="w-6 h-6 rounded-full" src="/images/calendar.png" alt="calendarImage" />
                    Calendar
                </button>
                <button title="Earning" type="button" onClick={() => handleTabClick('earn')} className={`inline-flex items-center px-4 py-3 h-[36px] text-sm rounded-lg hover:text-gray-300 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-300 dark:hover:bg-gray-100 dark:hover:text-white ${activeTab === 'earn' ? 'active' : ''}`}>
                    <img className="w-6 h-6 rounded-full" src="/images/earn.png" alt="earnImage" />
                    Earnings
                </button>
                <button title="MyClub" type="button" onClick={() => handleTabClick('club')} className={`inline-flex items-center px-4 py-3 h-[36px] text-sm rounded-lg hover:text-gray-300 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-300 dark:hover:bg-gray-100 dark:hover:text-white ${activeTab === 'club' ? 'active' : ''}`}>
                    <img className="w-6 h-6 rounded-full" src="/images/email.png" alt="email_marketing" />
                    Email
                </button>
            </div>
            {/* Render content based on activeTab */}
            <div className="md:flex gap-4 w-full">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default AllActivitiesTab;