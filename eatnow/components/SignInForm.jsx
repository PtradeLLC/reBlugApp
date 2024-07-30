"use client";
import { useState, useEffect } from "react";
import { account, ID, databases } from "../app/appwrite";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Cookies from "js-cookie";
import generateReferralCode from "../utils/generateReferralCode"; // Note to self: Ensure you have this utility function as mentioned previously

const backgroundClasses = {
  red: "bg-red-600",
  blue: "bg-blue-600",
  green: "bg-green-600",
};

const SocialLoginButton = ({ provider, handleLogin, icon, label, bg }) => (
  <button
    onClick={() => handleLogin(provider)}
    className={`${backgroundClasses[bg]} text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4`}
  >
    <FontAwesomeIcon icon={icon} className="mr-2 text-white" />
    <span className="text-center">Continue with {label}</span>
  </button>
);

const SignInForm = ({ showRegister, setShowRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [verMessage, setVerMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passValidated, setPassValidated] = useState("");

  const router = useRouter();

  useEffect(() => {
    const referralCode = Cookies.get("referralCode");
    if (referralCode) {
      // Use referralCode if needed
    }
  }, []);

  const handleEmailLogin = async () => {
    try {
      await account.createEmailSession(email, password);
      const loggedInUser = await account.get();
      if (!loggedInUser.emailVerification) {
        router.push("/login");
      } else {
        setUser(loggedInUser);
        setEmail("");
        setPassword("");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const register = async () => {
    try {
      const newUser = await account.create(ID.unique(), email, password, name);
      const referralCode = generateReferralCode(email);

      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        "users", // collectionId for users
        newUser.$id,
        { referralCode }
      );

      const referrerCode = Cookies.get("referralCode");
      if (referrerCode) {
        const referrer = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          "users", // collectionId for users
          [Query.equal("referralCode", referrerCode)]
        );

        if (referrer.documents.length > 0) {
          await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            "referrals", // collectionId for referrals
            ID.unique(),
            {
              referrerId: referrer.documents[0].$id,
              referredUserId: newUser.$id,
              status: "pending",
            }
          );
        }
      }

      await account.createEmailSession(email, password);
      let link = await account.createVerification(
        "https://www.reblug.com/verify"
      );
      if (!newUser.emailVerification) {
        setEmail("");
        setPassword("");
        setName("");
        router.push("/verify");
      } else {
        await handleEmailLogin();
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleLogin = async (provider) => {
    try {
      account.createOAuth2Session(
        provider,
        "http://localhost:3000/dashboard",
        "http://localhost:3000/"
        // "https://www.reblug.com/dashboard",
        // "https://www.reblug.com"
      );
    } catch (error) {
      console.error(`Login with ${provider} error:`, error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (showRegister) {
      register();
    } else {
      handleEmailLogin();
    }
  };

  return (
    <>
      <div className="bg-[#f97316] px-2 items-center mx-auto rounded-md mb-2">
        {verMessage}
      </div>
      <SocialLoginButton
        provider="google"
        handleLogin={handleLogin}
        icon={faGoogle}
        bg="red"
        label="Google"
      />
      <SocialLoginButton
        provider="facebook"
        handleLogin={handleLogin}
        icon={faFacebook}
        bg="blue"
        label="Facebook"
      />
      <SocialLoginButton
        provider="linkedin"
        handleLogin={handleLogin}
        icon={faLinkedin}
        bg="blue"
        label="LinkedIn"
      />
    </>
  );
};

export default SignInForm;
