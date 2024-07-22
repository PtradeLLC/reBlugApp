import React, { useState } from "react";
import Modal from "./Modal";
import SampleCopy from "@/components/SampleAdCopy";
import BrandCopyAd from "@/components/BrandCopyForProd";

const BrandSponsorshipForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    brandName: "",
    productName: "",
    productImage: null,
    website: "",
    socialMedia: "",
    productMessage: "",
    additionalInfo: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [previewCopy, setPreviewCopy] = useState(false);
  const [error, setError] = useState(""); // State to hold error message

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "productImage") {
      if (files[0]) {
        // Validate file size (5MB limit)
        const file = files[0];
        if (file.size > 5 * 1024 * 1024) {
          setError("File size exceeds 5MB limit.");
          return;
        }
        setError(""); // Clear error message if file size is valid
        setFormData({ ...formData, productImage: file });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      console.error("Error:", error);
      return; // Prevent form submission if there is an error
    }

    const formDataToSend = new FormData();
    formDataToSend.append("brandName", formData.brandName);
    formDataToSend.append("productName", formData.productName);
    formDataToSend.append("productImage", formData.productImage);
    formDataToSend.append("website", formData.website);
    formDataToSend.append("productMessage", formData.productMessage);
    formDataToSend.append("notes", formData.additionalInfo);

    try {
      const response = await fetch("/api/uploadv2", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        console.error("There has been an error");
      }

      const data = await response.json();
      setFormData({
        brandName: "",
        productName: "",
        productImage: null,
        website: "",
        socialMedia: "",
        productMessage: "",
        additionalInfo: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openModalClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePrevCopy = () => {
    setPreviewCopy(!previewCopy);
  };

  return (
    <div className="overflow-y-auto h-96">
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-6 bg-white shadow-md rounded-md"
      >
        <h2 className="text-2xl font-bold mb-6">Sponsorship</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex justify-center items-center">
              <label
                htmlFor="brandName"
                className="block text-xs md:text-sm font-medium text-gray-700 mr-1 "
              >
                Brand Name
              </label>
              <input
                type="text"
                name="brandName"
                placeholder="Enter brand's name"
                id="brandName"
                value={formData.brandName}
                onChange={handleChange}
                required
                className="mt-1 block w-2/3 p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
          <div>
            <div className="mb-4 flex justify-center items-center">
              <label
                htmlFor="productName"
                className="block text-xs md:text-sm font-medium text-gray-700 mr-1"
              >
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                placeholder="Enter product name"
                id="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                className="mt-1 block w-2/3 p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="mb-4 flex justify-center items-center">
          <label
            htmlFor="productImage"
            className="block text-xs md:text-sm font-medium text-gray-700 mr-1"
          >
            Product Image
          </label>
          <input
            type="file"
            name="productImage"
            id="productImage"
            onChange={handleChange}
            required
            className="mt-1 block w-2/3 border border-gray-300 rounded-md shadow-sm"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}{" "}
          {/* Display error message */}
        </div>

        <div className="grid grid-cols-1">
          <div>
            <div className="mb-4 flex justify-center items-center">
              <label
                htmlFor="website"
                className="block text-xs md:text-sm font-medium text-gray-700 mr-1"
              >
                Website
              </label>
              <input
                type="url"
                name="website"
                id="website"
                placeholder="Enter product web page"
                value={formData.website}
                onChange={handleChange}
                required
                className="mt-1 block w-2/3 p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="productMessage"
            className="block text-xs md:text-sm font-medium text-gray-700"
          >
            Product Message
          </label>
          <button type="button" onClick={openModalClick} className="text-xs">
            Show me example in an article
          </button>
          <textarea
            name="productMessage"
            id="productMessage"
            placeholder="This is where you introduce the product and describe how it fits into your story. Click on 'Show me example in an article' to see how we integrate a hot sauce product in an article"
            value={formData.productMessage}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="additionalInfo"
            className="block text-xs md:text-sm font-medium text-gray-700"
          >
            Note (optional)
          </label>
          <span className="text-xs">
            You can take and save notes about this product and brand here
          </span>
          <textarea
            name="additionalInfo"
            id="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            rows="4"
          ></textarea>
        </div>

        <div>
          {previewCopy && (
            <>
              <BrandCopyAd
                productName={formData.productName}
                image={formData.productImage}
                message={formData.productMessage}
                className="mb-3"
              />
            </>
          )}
        </div>

        <div className="mb-4 flex flex-col md:flex-row w-full">
          <button
            type="submit"
            className="w-full md:w-1/4 p-2 mx-2 my-2 bg-green-600 text-white rounded-md shadow-sm"
          >
            Save Copy
          </button>
          <p
            className="text-green-800 text-sm my-6 cursor-pointer"
            onClick={handlePrevCopy}
          >
            {previewCopy ? "Close Preview" : "Preview Copy"}
          </p>
        </div>
      </form>
      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <SampleCopy />
        </Modal>
      )}
    </div>
  );
};

export default BrandSponsorshipForm;
