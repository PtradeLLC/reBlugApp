import { PaperClipIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export default function Report() {
    const [campaign, setCampaign] = useState({
        Title: "Test",
        Email_Contacts: ["test@gmail.com", " test2@gmail.com"],
        Campaign_Goals: "testGoal",
        Insight: "",
        Attachments: {
            report: "",
            conversations: ""
        }


    });

    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Campaign Insight</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Here are detail about your latest campaign.</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Title</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{campaign.Title}</dd>
                    </div>
                    <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Email Contacts</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{campaign.Email_Contacts}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Campaign Goals</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{campaign.Campaign_Goals}</dd>
                    </div>
                    <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Insight</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {campaign.Insight}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Download as Attachments</dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                    <div className="flex w-0 flex-1 items-center">
                                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                            <span className="truncate font-medium">{campaign.Attachments.report}</span>
                                            <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <a href="#" className="font-medium text-red-600 hover:text-red-500">
                                            Download
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                    <div className="flex w-0 flex-1 items-center">
                                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                            <span className="truncate font-medium">{campaign.Attachments.conversations}</span>
                                            <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <a href="#" className="font-medium text-red-600 hover:text-red-500">
                                            Download
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}
