"use client";
import React, { useState, useEffect } from "react";
import SocialMedDashboard from "@/components/DashboardUI";
import BloggerDashboard from "@/components/BloggerDashboardUI";
import BrandModal from "@/components/BrandModal";
import RestaurantDashboard from "@/components/RestaurantModal";
import TogglePageModal from "@/components/SwitchPageModal";
import { account } from "../appwrite";

const DashboardPage = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [selectedUserType, setSelectedUserType] = useState("Blogger");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Check if running in the browser before accessing sessionStorage
    if (typeof window !== "undefined") {
      const storedUserType = sessionStorage.getItem("selectedUserType");
      setSelectedUserType(storedUserType || "Blogger");
    }
  }, []);

  useEffect(() => {
    async function getUser() {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleLogout = () => {
    // Clear sessionStorage on logout
    sessionStorage.removeItem("selectedUserType");
    setSelectedUserType("Blogger");
  };

  const handleUserTypeChange = (newUserType) => {
    setSelectedUserType(newUserType);
    // Check if running in the browser before accessing sessionStorage
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedUserType", newUserType);
    }
  };

  const renderComponent = () => {
    switch (selectedUserType) {
      case "Blogger":
        return (
          <BloggerDashboard
            user={user}
            name={name}
            setModalOpen={setModalOpen}
          />
        );
      case "Brand":
        return <BrandModal name={name} setModalOpen={setModalOpen} />;
      case "Social Media Partner":
        return <SocialMedDashboard name={name} setModalOpen={setModalOpen} />;
      case "Restaurant":
        return <RestaurantDashboard name={name} setModalOpen={setModalOpen} />;
      default:
        return <BloggerDashboard name={name} setModalOpen={setModalOpen} />;
    }
  };

  return (
    <>
      <div>
        {renderComponent()}
        <TogglePageModal
          userType={selectedUserType}
          setUserType={handleUserTypeChange}
          open={modalOpen}
          setOpen={setModalOpen}
          onLogout={handleLogout}
        />
      </div>
    </>
  );
};

export default DashboardPage;
