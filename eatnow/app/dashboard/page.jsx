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
  const [userNiche, setUserNiche] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("Blogger");
  const [modalOpen, setModalOpen] = useState(false);

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
    sessionStorage.removeItem("selectedUserType");
    setSelectedUserType("Blogger");
  };

  const renderComponent = () => {
    switch (selectedUserType) {
      case "Blogger":
        return (
          <BloggerDashboard
            user={user}
            name={name}
            setModalOpen={setModalOpen}
            userNiche={userNiche}
            setUserNiche={setUserNiche}
          />
        );
      case "Brand":
        return (
          <BrandModal
            user={user}
            name={name}
            setModalOpen={setModalOpen}
            userNiche={userNiche}
            setUserNiche={setUserNiche}
          />
        );
      case "Social Media Partner":
        return (
          <SocialMedDashboard
            user={user}
            name={name}
            setModalOpen={setModalOpen}
            userNiche={userNiche}
            setUserNiche={setUserNiche}
          />
        );
      case "Restaurant":
        return (
          <RestaurantDashboard
            user={user}
            name={name}
            setModalOpen={setModalOpen}
            userNiche={userNiche}
            setUserNiche={setUserNiche}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <div>
        {renderComponent()}
        <TogglePageModal
          userType={selectedUserType}
          user={user}
          setUserType={setSelectedUserType}
          open={modalOpen}
          setOpen={setModalOpen}
          onLogout={handleLogout}
        />
      </div>
    </>
  );
};

export default DashboardPage;
