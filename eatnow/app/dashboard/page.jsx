"use client";

import { useState, useEffect } from "react";
import SocialMedDashboard from "@/components/DashboardUI";
import BloggerDashboard from "@/components/BloggerDashboardUI";
import BrandModal from "@/components/BrandModal";
import RestaurantDashboard from "@/components/RestaurantModal";
import TogglePageModal from "@/components/SwitchPageModal";
import { account } from "../appwrite";

const DashboardPage = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [selectedUserType, setSelectedUserType] = useState(() => {
    // Check if window is defined to safely use localStorage
    return typeof window !== "undefined"
      ? localStorage.getItem("selectedUserType") || "Blogger"
      : "Blogger";
  });
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

  useEffect(() => {
    // Check if window is defined to safely use localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedUserType", selectedUserType);
    }
  }, [selectedUserType]);

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
          userType={selectedUserType}
          setUserType={setSelectedUserType}
        />
      </div>
    </>
  );
};

export default DashboardPage;

// "use client";
// import { useState, useEffect } from "react";
// import SocialMedDashboard from "@/components/DashboardUI";
// import BloggerDashboard from "@/components/BloggerDashboardUI";
// import BrandModal from "@/components/BrandModal";
// import RestaurantDashboard from "@/components/RestaurantModal";
// import TogglePageModal from "@/components/SwitchPageModal";
// import { account } from "../appwrite";

// const DashboardPage = () => {
//   const [name, setName] = useState("");
//   const [user, setUser] = useState(null);
//   const [selectedUserType, setSelectedUserType] = useState(() => {
//     return localStorage.getItem("selectedUserType") || "Blogger";
//   });
//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     async function getUser() {
//       try {
//         const currentUser = await account.get();
//         setUser(currentUser);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getUser();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       setName(user.name);
//     }
//   }, [user]);

//   useEffect(() => {
//     localStorage.setItem("selectedUserType", selectedUserType);
//   }, [selectedUserType]);

//   const renderComponent = () => {
//     switch (selectedUserType) {
//       case "Blogger":
//         return <BloggerDashboard name={name} setModalOpen={setModalOpen} />;
//       case "Brand":
//         return <BrandModal name={name} setModalOpen={setModalOpen} />;
//       case "Social Media Partner":
//         return <SocialMedDashboard name={name} setModalOpen={setModalOpen} />;
//       case "Restaurant":
//         return <RestaurantDashboard name={name} setModalOpen={setModalOpen} />;
//       default:
//         return <BloggerDashboard name={name} setModalOpen={setModalOpen} />;
//     }
//   };

//   return (
//     <>
//       <div>
//         {renderComponent()}
//         <TogglePageModal
//           open={modalOpen}
//           setOpen={setModalOpen}
//           userType={selectedUserType}
//           setUserType={setSelectedUserType}
//         />
//       </div>
//     </>
//   );
// };

// export default DashboardPage;
