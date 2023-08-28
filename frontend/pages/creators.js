import { useState } from "react";
import WaitingList from "../components/waitingList";
import Creators from "../components/Creators";

export default function CreatorsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-white ">
      <Creators />
      <div className="mx-auto mt-4">
        <div className="mx-auto flex justify-center items-center">
          <div className="">
            <button
              onClick={() => {
                setOpenModal(true);
              }}
              className="p-4 w-60 inline-flex bg-red-500 h-9 items-center justify-center gap-x-3 rounded border border-transparent py-4 text-sm font-semibold text-white"
            >
              Try this tool
            </button>
          </div>
        </div>
      </div>
      <span className="mt-3">
        {openModal && <WaitingList setOpenModal={setOpenModal} />}
      </span>

    </div>
  );
}
