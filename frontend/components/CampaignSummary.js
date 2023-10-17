import Link from 'next/link';
import React from 'react'
import { useState } from 'react'

const CampaignSummary = ({ selectedComponent }) => {
    const [summary, setSummary] = useState("");

    const campSummary = () => {
        setSummary("");
    }


    return (
        <div className="divide-y mt-4 divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            {summary ? <div>Here are your summary {summary}</div> :
                !selectedComponent && (
                    <>
                        <span className="bg-white justify-center items-center text-center py-2 font-semibold text-l">Campaign Summary</span>
                        <p>You have no summary. Please <Link href={""}>Launch a campaign to get started</Link></p>
                    </>
                )

            }
        </div>
    )
}

export default CampaignSummary