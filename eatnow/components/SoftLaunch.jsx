import React, { useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";

export default function SoftLaunch({ setOpenModal }) {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [formInput, setFormInput] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormInput(e.target.value);
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => setOpenModal(false)}
      >
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                    <Image
                      src={"/images/Marttwainxyz.png"}
                      alt="logo"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Thanks for your Interest in reBlug App
                    </Dialog.Title>
                    <div className="mt-2">
                      {success ? (
                        <p>Our app is now live at the App stores</p>
                      ) : (
                        <>
                          <p className="text-sm text-gray-500">
                            Click on your favorite app store to download:
                          </p>
                          <div className="flex lg:flex-row justify-center items-center pb-2 flex-wrap gap-x-6 gap-y-6 mt-6">
                            <img
                              src="/images/foodini/gplay.png"
                              className="w-32"
                              alt="googleplay"
                            />
                            <img
                              src="/images/foodini/appleimg.webp"
                              className="w-32"
                              alt="apple-store"
                            />
                            <img
                              src="/images/foodini/micsoft.png"
                              className="w-32"
                              alt="microsoft-store"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
