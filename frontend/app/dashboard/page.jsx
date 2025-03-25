"use client";
import React, { useState, useEffect } from "react";
import SocialMedDashboard from "@/components/DashboardUI";
import BloggerDashboard from "@/components/BloggerDashboardUI";
import BrandModal from "@/components/BrandModal";
import RestaurantDashboard from "@/components/RestaurantModal";
import TogglePageModal from "@/components/SwitchPageModal";
import { account } from "../appwrite";
import { setCookie } from "nookies"; // Add this import

const DashboardPage = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [accountUser, setAccountUser] = useState(null);
  const [userNiche, setUserNiche] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("Blogger");
  const [modalOpen, setModalOpen] = useState(false);
  // const [isVerified, setIsVerified] = useState(false);

  // Fetch the user on component mount
  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await account.get();
        setAccountUser(currentUser);
        setUser(currentUser);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    getUser();
  }, []);

  // Save user information when user is set
  useEffect(() => {
    if (user) {
      setName(user.name);

      const saveUser = async () => {
        try {
          const response = await fetch("/api/savedUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: user.$id,
              name: user.name,
              email: user.email,
              isVerified: user.emailVerification,
            }),
          });

          if (!response.ok) {
            throw new Error("Error saving user");
          }

          const data = await response.json();
        } catch (error) {
          console.error("Error saving user:", error);
        }
      };

      saveUser();
    }
  }, [user]);

  // Handle user logout
  const handleLogout = () => {
    sessionStorage.removeItem("selectedUserType");
    setSelectedUserType("Blogger");
    setCookie(null, "userId", "", { maxAge: -1, path: "/" });
  };

  // Render appropriate component based on selectedUserType
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
  );
};

export default DashboardPage;
