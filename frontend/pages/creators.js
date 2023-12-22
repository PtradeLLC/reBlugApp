import { useState } from "react";
import Creators from "../components/Creators";
import Link from "next/link";

export default function CreatorsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-white ">
      <Creators />
      <div className="mx-auto mt-4">
        <div className="mx-auto flex justify-center items-center">
          <div className="">
            <Link
              href="/register"
              className="p-4 w-60 inline-flex bg-red-500 h-9 items-center justify-center gap-x-3 rounded border border-transparent py-4 text-sm font-semibold text-white"
            >
              Try this tool
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
