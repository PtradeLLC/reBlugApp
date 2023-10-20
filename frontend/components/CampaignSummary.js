import Link from 'next/link';
import React from 'react'
import { useState } from 'react';
import Summary from './Summary';

const CampaignSummary = ({ selectedComponent, openModal, setOpenModal }) => {
    const [summary, setSummary] = useState("");

    const campSummary = () => {
        setSummary("");
    }

    const handleClick = () => {
        setOpenModal(true);
    };



    return (
        <div className="mt-4  overflow-hidden rounded-lg bg-white">
            {summary ? <div>Here are your summary {summary}</div> :
                !selectedComponent && (
                    <>
                        <span className="bg-white justify-center items-center text-center py-2 font-semibold px-2 text-l">Campaign Summary</span>
                        <p className='mt-2 px-2'>You have no summary.</p>
                        <span className="flex px-2 justify-center items-center mt-2 mb-1 ">
                            <button onClick={handleClick} type='button' className="mx-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" >
                                Launch a campaign
                            </button> to get started
                        </span>
                        <div>
                            <Summary />
                        </div>

                    </>
                )
            }
        </div>
    )
}

export default CampaignSummary