"use client";
import DashboardComponent from "@/components/DashboardComp";
import { account, ID } from "../appwrite";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        console.log("No user logged in");
      }
    }
    getUser();
  }, []);

  console.log("User from dash", user);

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
