import { useState } from "react";
import ContentTabs from "./ContentTabs";

const statuses = { Completed: 'text-green-400 bg-green-400/10', Error: 'text-rose-400 bg-rose-400/10' }

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
