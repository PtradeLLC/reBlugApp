import { EnvelopeIcon, PencilSquareIcon, EnvelopeOpenIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';
import EmailForm from "./EmailConvoForm";
import { useSession } from "next-auth/react";

export default function EmailCamp({ openModal, setOpenModal }) {
    const [campaignEmail, setCampaignEmail] = useState(null);
    const { data: session, status } = useSession();
    const [user, setUser] = useState('');

    useEffect(() => {
        if (status === 'loading') {
            return;
        }

        if (session && session.user) {
            const baseUrl = "/api/fetchUser";
            const userData = async () => {
                try {
                    const response = await fetch(baseUrl, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUser(data);
                    } else {
                        console.error("Error fetching user:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error fetching user:", error.message);
                }
            };

            userData();
        }
    }, [status, session]);


    if (status === 'loading' || !session) {
        return <div className="flex justify-center items-center w-full h-full"><Loading /></div>;
    }


    const onButtonClick = (type) => {
        setCampaignEmail(type);
    }
    return (
        <>
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-12 w-12 rounded-full"
                                    src={session.user?.image || user?.image || "/images/brand.png"}
                                    alt="profile image"
                                />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">{user?.name}</h3>
                                <p className="text-sm text-gray-500">
                                    <a href="#">@{session.user?.name || `${user.firstName} ${user.lastName}`}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="ml-6 mt-4 flex flex-shrink-0">
                        <button
                            type="button"
                            onClick={() => onButtonClick('email')}
                            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            <EnvelopeIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Product Email</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => onButtonClick('survey')}
                            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            <PencilSquareIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Survey</span>
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
            </div>
            <div className='mt-3'>
                <EmailForm campaignEmail={campaignEmail} />
            </div>
        </>
    )
}
