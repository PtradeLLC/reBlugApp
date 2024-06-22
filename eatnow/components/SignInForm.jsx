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

const SocialLoginButton = ({ provider, handleLogin, icon, label, bg }) => (
  <button
    onClick={() => handleLogin(provider)}
    className={`bg-${bg}-600 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4`}
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //   useEffect(() => {
  //     async function getUser() {
  //       try {
  //         const currentUser = await account.get();
  //         setLoading(true);
  //         setUser(currentUser);
  //         setLoading(false);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     getUser();
  //   }, []);

  //   if (loading) {
  //     return (
  //       <div className="flex items-center justify-center min-h-screen">
  //         <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  //           <div className="text-gray-700 text-center font-bold text-xl">
  //             Loading...
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }

  //   useEffect(() => {
  //     if (user) {
  //       router.push("/dashboard");
  //     }
  //   }, [user, router]);

  //   const validatePassword = (password) => {
  //     const minLength = 8;
  //     const maxLength = 256;
  //     const commonPasswords = [
  //       "123456",
  //       "password",
  //       "123456789",
  //       "12345678",
  //       "12345",
  //       "1234567",
  //       "1234567890",
  //       "qwerty",
  //       "abc123",
  //       "password1",
  //     ];

  //     if (password.length < minLength || password.length > maxLength) {
  //       return `Password must be between ${minLength} and ${maxLength} characters long.`;
  //     }

  //     if (commonPasswords.includes(password)) {
  //       return "Password should not be a commonly used password.";
  //     }

  //     return "";
  //   };

  const handleEmailLogin = async () => {
    try {
      console.log("Attempting login with:", email); // Log email to verify input
      await account.createEmailPasswordSession(email, password);
      const loggedInUser = await account.get();
      console.log("Logged in user:", loggedInUser); // Log user object if login is successful
      setUser(loggedInUser);
      setEmail("");
      setPassword("");
      router.push("/dashboard"); // Redirect upon successful login
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const register = async () => {
    try {
      await account.create(ID.unique(), email, password, name);
      await handleEmailLogin();
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
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
