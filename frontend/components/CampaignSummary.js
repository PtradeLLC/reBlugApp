import Link from 'next/link';
import React from 'react'
import { useState } from 'react'

const CampaignSummary = () => {
    const [summary, setSummary] = useState("");

    const campSummary = () => {
        setSummary("");
    }


    return (
        <div className="divide-y mt-4 divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            {summary ? <div>Here are your summary {summary}</div> :
                <p>You have no summary. Please <Link href={""}>Launch a campaign to get started</Link></p>}
        </div>
    )
}

export default CampaignSummary