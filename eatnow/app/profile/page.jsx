import React from "react";
import ProfilePg from "@/components/BlogrProfile";

const ProPage = () => {
  //Gets User from database
  const getUserDb = async () => {
    const response = await fetch("/api/savedUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error with the response.");
    }

    const data = await response.json();
    setUser(data);
  };

  return (
    <div>
      <ProfilePg />
    </div>
  );
};

export default ProPage;
