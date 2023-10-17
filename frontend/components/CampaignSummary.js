import Link from 'next/link';
import React from 'react'
import { useState } from 'react'

const CampaignSummary = ({ selectedComponent, openModal, setOpenModal }) => {
    const [summary, setSummary] = useState("");

    const campSummary = () => {
        setSummary("");
    }

    const handleClick = () => {
        setOpenModal(true);
    };



    return (
        <div className="divide-y mt-4 divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            {summary ? <div>Here are your summary {summary}</div> :
                !selectedComponent && (
                    <>
                        <span className="bg-white justify-center items-center text-center py-2 font-semibold mb-2 text-l">Campaign Summary</span>
                        <p>You have no summary.</p>
                        Please <button onClick={handleClick} type='button' className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" >
                            Launch a campaign
                        </button> to get started
                    </>
                )
            }
        </div>
    )
}

export default CampaignSummary