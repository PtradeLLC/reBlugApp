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
                    Submit your product
                </ModalHeader>
                <ModalBody>
                    <div>
                        <p>
                            Please use the form below to submit your product or services for review by the author for potential inclusion
                            in upcoming articles. Kindly note that this is a sponsored inquiry. If your
                            product aligns with the author's current projects and is under consideration,
                            the author will reach out to you to discuss their review process and next steps.
                        </p>
                        <p>
                            Click here to see sample sponsored article.
                        </p>
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
