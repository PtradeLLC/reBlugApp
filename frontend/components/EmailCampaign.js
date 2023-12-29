import { EnvelopeIcon, PencilSquareIcon, EnvelopeOpenIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';
import EmailForm from "./EmailConvoForm";
import { useSession } from "next-auth/react";


const campaignsProducts = [
    {
        id: 1,
        Name: 'SaaS',
        icon: EnvelopeIcon,
        type: 'Saas',
        span: 1,
        buttonClick: (type) => {
            setCampaignEmail(type);
        }
    },
    {
        id: 2,
        Name: 'Raise awareness',
        icon: EnvelopeIcon,
        type: 'raiseAwareness',
        span: 1,
        buttonClick: (type) => {
            setCampaignEmail(type);
        }
    },
    {
        id: 3,
        Name: 'eCommerce',
        icon: EnvelopeIcon,
        type: 'Commerce',
        span: 1,
        buttonClick: (type) => {
            setCampaignEmail(type);
        }
    },
    {
        id: 4,
        Name: 'Fund Raise',
        icon: EnvelopeIcon,
        type: 'fundRaise',
        span: 1,
        buttonClick: (type) => {
            setCampaignEmail(type);
        }
    },
    {
        id: 5,
        Name: 'Email & Newsletter',
        icon: EnvelopeIcon,
        type: 'emailNewsletter',
        span: 2,
        buttonClick: (type) => {
            setCampaignEmail(type);
        }
    },
]

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

    return (
        <>
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-6 mt-4 grid grid-cols-3 gap-2">
                        {campaignsProducts.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => item.buttonClick(item.type)}
                                className={`relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 col-span-${item.span}`}
                            >
                                {item.icon && <item.icon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />}
                                <span className='text-sm inline-flex'>{item.Name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                <EmailForm user={user} campaignEmail={campaignEmail} />
            </div>
        </>
    )
}
