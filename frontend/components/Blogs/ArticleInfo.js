import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import Link from "next/link";

const SubmissionInfo = ({ isOpen, setIsOpen }) => {

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    Article Assistant
                </ModalHeader>
                <ModalBody>
                    <div>
                        {/* Content */}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <span className="text-xs font-thin text-gray-600">
                        Powered by{" "}
                        <Link href="http://forgedmart.com/">ForgedMart</Link>
                    </span>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SubmissionInfo;
