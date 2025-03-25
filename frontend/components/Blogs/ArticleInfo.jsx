import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Link from "next/link";

const SubmissionInfo = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="m-auto">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Article Assistant
        </ModalHeader>
        <ModalBody>
          <div>
            Whether you are managing a personal, corporate, or freelance
            blogging endeavor, empower your audience by integrating Article
            Assistant into your blog. When combined with our intelligent
            commenting system, Article Assistant enables readers to engage with
            your content, interact with each other, and provides you with
            insights into their consumption patterns. While we recommend
            utilizing both features, you have the flexibility to implement one
            or both on your blogging platform. To begin, simply log in or create
            an account.
            <br />
            <br />
            To see how it works, Please close this window and click on 'Chat
            with this Article' on this page.
          </div>
          <div className="flex justify-end">
            <Link
              href={"/register"}
              type="submit"
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Get Started
            </Link>
          </div>
        </ModalBody>
        <ModalFooter>
          <span className="text-xs font-thin text-gray-600">
            Powered by <Link href="https://reblug.com/">reBlug</Link>
          </span>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SubmissionInfo;
