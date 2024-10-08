import React from "react";
import Modal from "./Modal";
import BrandSponsorshipForm from "@/components/SponsorsMessage";

const SponsorsModalComponent = ({ isOpen, onClose, formData, setFormData }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <BrandSponsorshipForm
        onClose={onClose}
        isOpen={isOpen}
        formData={formData}
        setFormData={setFormData}
      />
    </Modal>
  );
};

export default SponsorsModalComponent;
