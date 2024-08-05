"use client";

import React, { useState, useEffect } from "react";
import ProfilePg from "@/components/BlogrProfile";
import { account } from "../appwrite";

const ProPage = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);

  //Gets User from database
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
    <div>
      <ProfilePg user={user} />
    </div>
  );
};

export default ProPage;
