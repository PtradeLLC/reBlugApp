"use client";
import SocialMedDashboard from "@/components/DashboardUI";
import { account } from "../appwrite";
import { useState, useEffect } from "react";
import BloggerDashboard from "@/components/BloggerDashboardUI";
import BrandModal from "@/components/BrandModal";
import RestaurantDashboard from "@/components/RestaurantModal";
import TogglePageModal from "@/components/SwitchPageModal";

const DashboardPage = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
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

  const renderComponent = () => {
    switch (selectedUserType) {
      case "Blogger":
        return <BloggerDashboard name={name} setModalOpen={setModalOpen} />;
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
          open={modalOpen}
          setOpen={setModalOpen}
          setUserType={setSelectedUserType}
        />
      </div>
    </>
  );
};

export default DashboardPage;
