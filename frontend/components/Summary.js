import { useState } from "react";
import ContentTabs from "./ContentTabs";
import { Tabs, Tab, Card, CardBody, Switch } from "@nextui-org/react";

const statuses = { Completed: 'text-green-400 bg-green-400/10', Error: 'text-rose-400 bg-rose-400/10' }

const activityItems = [
    // {
    //     user: {
    //         name: 'Michael Foster',
    //         imageUrl:
    //             'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    //     },
    //     "engaged": 'Yes',
    //     branch: 'main',
    //     status: 'Delivered',
    //     duration: '25s',
    //     date: '45 minutes ago',
    //     dateTime: '2023-01-23T11:00',
    // },
    // {
    //     user: {
    //         name: 'Courtney Henry',
    //         imageUrl:
    //             'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    //     },
    //     "engaged": 'No',
    //     branch: 'main',
    //     status: 'Bounced',
    //     duration: '1m 4s',
    //     date: '12 hours ago',
    //     dateTime: '2023-01-23T00:00',
    // },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Summary() {
    const [summary, setSummary] = useState(`Features
    Article Assistant This AI-powered tool enables you to include conversational chatbot seamlessly on your page. conversational chatbot seamlessly on your page.
    `);

    return (
        <div className="bg-white py-10 border rounded-sm">
            <span className="shadow-xl border-b border-white/10 bg-slate-200">
                {/* <h2 className="px-4 text-base font-semibold leading-7 flex text-black sm:px-6 lg:px-8"><Square3Stack3DIcon className="text-base px-1 w-6 h-6 text-neutral-400" />Latest activity</h2> */}
            </span>
            <ContentTabs />
        </div >
    )
}
