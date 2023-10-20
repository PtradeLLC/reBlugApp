import React, { useState } from 'react'
import DashConvTool from './EmailMarkForm'
import EmailCamp from './EmailCampaign'
import Report from './Report_one'

const DashEmailMar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div>
                <EmailCamp />
                <DashConvTool open={open} setOpen={setOpen} />
            </div>
            <div>
                <Report />
            </div>
        </>
    )
}

export default DashEmailMar