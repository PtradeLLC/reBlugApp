import React, { useState } from 'react'
import DashConvTool from './EmailMarkForm'
import EmailCamp from './EmailCampaign'
import Report from './Report_one'

const DashEmailMar = ({ open, setOpen }) => {
    const [openModal, setOpenModal] = useState(false);
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <>
            <div>
                <EmailCamp />
                <DashConvTool openModal={openModal} setOpenModal={openModal} />
            </div>
            <div>
                <Report />
            </div>
        </>
    )
}

export default DashEmailMar