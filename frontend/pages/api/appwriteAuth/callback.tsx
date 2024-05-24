import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { account } from "../../../lib/appwrite"; // Ensure this path is correct based on your project structure

const AuthCallback: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    account
      .get()
      .then((response) => {
        console.log("User logged in", response);
        // Redirect to the home page or another protected page
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Login failed", error);
        // Handle login failure (e.g., redirect to login page)
        router.push("/login");
      });
  }, [router]);

  return <div>Loading...</div>;
};

export default AuthCallback;
