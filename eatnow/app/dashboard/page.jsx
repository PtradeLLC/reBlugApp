"use client";
import DashboardComponent from "@/components/DashboardComp";
import { account, ID } from "../appwrite";
import { useState, useEffect } from "react";

const DashboardPage = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);

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

  return (
    <>
      <div>
        <DashboardComponent name={name} />
      </div>
    </>
  );
};

export default DashboardPage;
