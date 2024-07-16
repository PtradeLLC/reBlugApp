import React from "react";
import Modal from "./Modal";
import BrandSponsorshipForm from "@/components/SponsorsMessage";

const SponsorsModalComponent = ({ isOpen, onClose, formData, setFormData }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <BrandSponsorshipForm formData={formData} setFormData={setFormData} />
    </Modal>
  );
};

export default SponsorsModalComponent;
