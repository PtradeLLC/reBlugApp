import React, { useState } from "react";
import Features from "../components/Features";
import EmailTool from "../components/Email_Tool"

export default function Tools() {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(true);
  };

  return (
    <div className="overflow-hidden bg-white">
      <div className="sm:mt-3">
        <Features />
      </div>
      <div className="flex justify-center">
        <div className="mt-2">
          <button
            onClick={handleClick}
            className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
          >
            See how it works now
          </button>
        </div>
      </div>
      <span className="mt-3">
        {<EmailTool openModal={openModal} setOpenModal={setOpenModal} />}
      </span>
    </div>
  );
}
