import { EnvelopeIcon } from '@heroicons/react/20/solid';
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
        type: 'Awareness',
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
        type: 'FundRaise',
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

    const handleButtonClick = (type) => {
        setCampaignEmail(type);
    };

    if (status === 'loading' || !session) {
        return <div className="flex justify-center items-center w-full h-full"><Loading /></div>;
    }

    return (
        <>
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="sm:grid-cols-2 sm:w-full ml-6 mt-4 grid grid-cols-3 gap-2 lg:w-full ">
                        {campaignsProducts.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handleButtonClick(item.type)}
                                className={`flex justify-between items-center rounded-md hover:bg-slate-200 ${campaignEmail === item.type ? 'bg-slate-300/50 hover:bg-slate-300/50 shadow-lg ' : 'bg-white'}
    px-3 py-2 sm:text-lg font-semibold
    ${campaignEmail === item.type ? 'text-gray-700' : 'text-gray-900'}
    shadow-sm ring-1 ring-inset ring-gray-300
    col-span-${item.span}
`}
                            >
                                {/* {item.icon && <item.icon className="-ml-0.5 flex mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />} */}
                                <span className='sm:text-sm m-auto text-center md:text-base inline-flex'>{item.Name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                <EmailForm user={user} campaignEmail={campaignEmail} />
            </div>
        </>
    );
}
