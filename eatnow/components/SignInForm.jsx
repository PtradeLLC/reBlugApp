"use client";
import { useEffect, useState } from "react";
import { account, ID } from "../app/appwrite";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

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

  const handleEmailLogin = async () => {
    try {
      await account.createEmailPasswordSession(email, password);
      const loggedInUser = await account.get();
      if (loggedInUser.emailVerification === false) {
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
      if (newUser.emailVerification === false) {
        router.push("/login");
        setEmail("");
        setPassword("");
        setName("");
        setVerMessage(`🫶🏼 Please check your email to verify your account`);
      } else {
        await handleEmailLogin();
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleLogin = async (provider) => {
    try {
      await account.createOAuth2Session(
        provider,
        // "http://localhost:3000/dashboard",
        // "http://localhost:3000/login"
        "https://www.reblug.com/dashboard",
        "https://www.reblug.com"
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
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-green-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mt-4 bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-green-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {showRegister && (
          <input
            type="text"
            placeholder="Name"
            className="w-full mt-4 bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-green-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <button
          className="bg-green-600 mt-4 text-white py-3 px-6 rounded w-full"
          type="submit"
        >
          {showRegister ? "Register" : "Login"}
        </button>
      </form>
      <div className="relative">
        <hr className="my-8 border-t border-gray-300" />
        <span className="px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800">
          Or
        </span>
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
