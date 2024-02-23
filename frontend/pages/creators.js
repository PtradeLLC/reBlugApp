import { useState } from "react";
import Bloggers from "../components/Bloggers";
import Link from "next/link";

export default function BloggersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-white ">
      <Bloggers />
      <div className="mx-auto mt-4">
        <div className="mx-auto flex justify-center items-center">
          <div className="">
            <Link
              href="/posts"
              className="p-4 w-60 inline-flex bg-red-500 h-9 items-center justify-center gap-x-3 rounded border border-transparent py-4 text-sm font-semibold text-white"
            >
              checkout our demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
