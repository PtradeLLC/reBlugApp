import React, { useState } from 'react';
import DashConvTool from './EmailMarkForm';
import EmailCamp from './EmailCampaign';
import Report from './Report_one';

const DashEmailMar = ({ isOpen, closeModal, children }) => {
    const [openModal, setOpenModal] = useState(false);
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>
                    &times;
                </span>
                <div>
                    What happens
                    {/* <DashConvTool openModal={openModal} setOpenModal={setOpenModal} /> */}

                    {/* <EmailCamp /> */}
                    {/* <Report /> */}
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default DashEmailMar