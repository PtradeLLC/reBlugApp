import { EnvelopeIcon, PencilSquareIcon, EnvelopeOpenIcon } from '@heroicons/react/20/solid';
import { useUserData } from '@nhost/nextjs';
import { useState } from 'react';
import EmailForm from "./EmailConvoForm";

export default function EmailCamp({ emailForm, surveyForm, newsletterForm }) {
    const [campaignEmail, setCampaignEmail] = useState(false);
    // const [campaignSurvey, setCampaignSurvey] = useState(false);
    // const [campaignNewsletter, setCampaignNewsletter] = useState(false);
    const user = useUserData();


    const baseUrl = "";

    const salesCall = fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify()
    });

    const onButtonClick = (button) => {
        if (button === "survey") {
            return setCampaignEmail(true);
        } else if (button === "email") {
            return setCampaignEmail(true);
        } else if (button === "newsletter") {
            return setCampaignEmail(true);
        } else {
            console.log("There is no selection");
        }
        return;
    }

    return (
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                className="h-12 w-12 rounded-full"
                                src={user?.avatarUrl}
                                alt="profile image"
                            />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">{user?.displayName}</h3>
                            <p className="text-sm text-gray-500">
                                <a href="#">@{user?.displayName.split(' ').join('_')}</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="ml-5 mt-4 flex flex-shrink-0">
                    <button
                        type="button"
                        onClick={() => onButtonClick('survey')}
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        <PencilSquareIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Survey</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => onButtonClick('email')}
                        className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        <EnvelopeIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Email</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => onButtonClick('newsletter')}
                        className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        <EnvelopeOpenIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Newsletter</span>
                    </button>
                </div>
            </div>

            {campaignEmail && (
                <div>
                    <EmailForm emailForm={emailForm} surveyForm={surveyForm} newsletterForm={newsletterForm} />
                </div>
            )}
        </div>
    )
}
