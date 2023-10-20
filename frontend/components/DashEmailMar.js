import React, { useState } from 'react'
import DashConvTool from './EmailMarkForm'
import EmailCamp from './EmailCampaign'
import Report from './Report_one'

const DashEmailMar = ({ openModal, setOpenModal }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <div>
                <EmailCamp />
                <DashConvTool openModal={openModal} setOpenModal={setOpenModal} />
            </div>
            <div>
                <Report />
            </div>
        </>
    )
}

export default DashEmailMar