import React from 'react'
import { useState } from 'react';
import Summary from './Summary';
import DashEmailMar from './DashEmailMar';


const CampaignSummary = ({ selectedComponent, openModal, setOpenModal }) => {
    const [summary, setSummary] = useState("");

    const campSummary = () => {
        setSummary("");
    }

    const handleClick = () => {
        setOpenModal(true);
    };

    return (
        <>
            <div className="mt-4  overflow-hidden rounded-lg bg-white">
                {summary ? <div>Here are your summary {summary}</div> :
                    !selectedComponent && (
                        <>
                            <span className="bg-white justify-center items-center text-center py-2 font-semibold px-2 text-l">Activities</span>
                            <div>
                                <Summary />
                            </div>

                        </>
                    )
                }
            </div>
            <div>
                <DashEmailMar openModal={openModal} setOpenModal={setOpenModal} />
            </div>

        </>
    )
}

export default CampaignSummary