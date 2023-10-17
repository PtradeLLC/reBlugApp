import Link from 'next/link';
import React from 'react'
import { useState } from 'react'

const CampaignSummary = () => {

    const [summary, setSummary] = useState("");
    return (
        <div className="divide-y mt-4 divide-gray-200 overflow-hidden rounded-lg bg-white shadow sm:grid sm:grid-cols-1 lg:gap-4 sm:gap-px sm:divide-y-0">
            <div>
                <span className="bg-white sm:col-span-1 justify-center items-center text-center py-2 font-semibold text-xl">Campaign Summary</span>
            </div>
            {summary ? <div>Here are your summary</div> :
                <div>
                    <p>You have no summary. <Link href={""}>Launch a campaign to get started</Link></p>
                </div>}
        </div>
    )
}

export default CampaignSummary