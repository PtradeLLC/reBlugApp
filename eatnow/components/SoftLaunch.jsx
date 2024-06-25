import React, { useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";

// eslint-disable-next-line react/prop-types
export default function SoftLaunch({ setOpenModal }) {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [formInput, setFormInput] = useState("");
  const [success, setSuccess] = useState("");
  const [count, setCount] = useState(null);

  const handleChange = (e) => {
    setFormInput(e.target.value);
  };

  function updateCountdown() {
    const now = new Date();
    const timeDifference = targetDate - now;

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Format hours, minutes, and seconds
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    // Display the countdown in the UI
    let countDown = `${formattedHours}hr : ${formattedMinutes}mins : ${formattedSeconds}sec`;
    setCount(countDown);

    // If the countdown reaches zero, do something
    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      setCount("We Launched, Yay!");
      // Do something when the countdown finishes
    }
  }

  // Set the target date 24 hours from now
  const targetDate = new Date("May 1, 2024 12:00:00");
  targetDate.setDate(targetDate.getDate() + 1);

  // Update the countdown every second
  const timerInterval = setInterval(updateCountdown, 1000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/waitingList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formInput }), // Sending the formInput value as data
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.ok) {
        setFormInput("");
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => setOpenModal(false)} // Close the modal when the dialog is closed
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
                    <div className="mt-2"></div>
                    <div className="mt-2">
                      {success ? (
                        <p>Our app is now live at the App stores</p>
                      ) : (
                        <>
                          <p className="text-sm text-gray-500">
                            Click on your corresponding app store to download:
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
                              alt="apple-store"
                            />
                          </div>
                        </>
                      )}
                    </div>
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
