import Link from 'next/link';
import React from 'react'
import { useState } from 'react'

const CampaignSummary = () => {

    const [summary, setSummary] = useState("");
    return (
        <>
            <div>
                <span className="bg-white sm:col-span-3 justify-center items-center text-center py-2 font-semibold text-xl">Campaign Summary</span>
            </div>
            {summary ? <div>Here are your summary</div> :
                <div>
                    <p>You have no summary.</p>
                    <Link href={""}>Launch a campaign to get started</Link>
                </div>}
        </>
    )
}

export default CampaignSummary