import React from 'react'
import DashConvTool from './EmailMarkForm'
import EmailCamp from './EmailCampaign'
import Report from './Report_one'

const DashEmailMar = () => {
    return (
        <>
            <div>
                <EmailCamp />
                <DashConvTool />
            </div>
            <div>
                <Report />
            </div>
        </>
    )
}

export default DashEmailMar