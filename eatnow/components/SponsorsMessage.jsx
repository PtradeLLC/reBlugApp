import React, { useState } from "react";

const BrandSponsorshipForm = () => {
  const [formData, setFormData] = useState({
    brandName: "",
    productName: "",
    productImage: null,
    website: "",
    socialMedia: "",
    productMessage: "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "productImage") {
      setFormData({ ...formData, productImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
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
                className="block text-sm font-medium text-gray-700 mr-1"
              >
                Brand Name
              </label>
              <input
                type="text"
                name="brandName"
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
                className="block text-sm font-medium text-gray-700 mr-1"
              >
                Product Name
              </label>
              <input
                type="text"
                name="productName"
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
            className="block text-sm font-medium text-gray-700 mr-1"
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
        </div>

        <div className="grid grid-cols-2">
          <div>
            <div className="mb-4 flex justify-center items-center">
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700 mr-1"
              >
                Website
              </label>
              <input
                type="url"
                name="website"
                id="website"
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
            className="block text-sm font-medium text-gray-700"
          >
            Product Message
          </label>
          <textarea
            name="productMessage"
            id="productMessage"
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
            className="block text-sm font-medium text-gray-700"
          >
            Additional Information
          </label>
          <textarea
            name="additionalInfo"
            id="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            rows="4"
          ></textarea>
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-1/4 p-2 bg-blue-600 text-white rounded-md shadow-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandSponsorshipForm;
