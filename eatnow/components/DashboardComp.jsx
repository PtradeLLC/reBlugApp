"use client";
import React from "react";

const DashboardComponent = ({ user }) => {
  return (
    <div>
      {console.log(user)}
      <h2>Welcome, {user}!</h2>
      {/* Add more components to display user information */}
    </div>
  );
};

export default DashboardComponent;
