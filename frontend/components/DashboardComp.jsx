"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const DashboardComponent = ({ name }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (name) {
      setLoading(false);
    }
  }, [name]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="text-gray-700 text-center font-bold text-xl">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {name}!</h1>
      {/* Add more components to display user information */}
    </div>
  );
};

DashboardComponent.propTypes = {
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DashboardComponent;
