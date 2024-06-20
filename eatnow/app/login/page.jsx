"use client";
import React, { useState } from "react";
import SignInForm from "../../components/SignInForm";
import DashboardComponent from "../../components/DashboardComp";

const SignIn = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);

  const handleUserChange = (loggedInUser) => {
    setUser(loggedInUser);
  };

  return (
    <section className="ezy__signup10 light py-14 md:py-24 bg-white text-white dark:text-white">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-6 gap-6 h-full">
          <div className="col-span-6 md:col-span-2 lg:col-span-3">
            {/* Your image section */}
          </div>
          <div className="col-span-6 md:col-span-4 lg:col-span-3 py-12">
            <div className="max-w-lg w-full h-full">
              <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-4 md:p-12 lg:py-16">
                <h2 className="text-red-900 dark:text-white text-2xl font-bold mb-3">
                  Welcome to Reblug
                </h2>
                {/* Toggle between login and register */}
                <SignInForm
                  showRegister={showRegister}
                  setShowRegister={setShowRegister}
                  setUser={handleUserChange}
                />
                {/* Render DashboardComponent if user is logged in */}
                {console.log("User from signIn", user)}
                {user && <DashboardComponent user={user} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;

// "use client";
// import { useEffect, useState } from "react";
// import { account, ID } from "../appwrite";
// import { useRouter } from "next/navigation";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFacebook,
//   faGoogle,
//   faLinkedin,
// } from "@fortawesome/free-brands-svg-icons";

// const SocialLoginButton = ({ provider, handleLogin, icon, label, bg }) => (
//   <button
//     onClick={() => handleLogin(provider)}
//     className={`bg-${bg}-600 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4`}
//   >
//     <FontAwesomeIcon icon={icon} className="mr-2 text-white" />
//     <span className="text-center">Continue with {label}</span>
//   </button>
// );

// const SignInForm = ({ showRegister, setShowRegister }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     async function getUser() {
//       try {
//         const currentUser = await account.get();
//         setUser(currentUser);
//       } catch (error) {
//         console.log("No user logged in");
//       }
//     }
//     getUser();
//   }, []);

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

//   const handleEmailLogin = async () => {
//     try {
//       await account.createEmailPasswordSession(email, password);
//       const loggedInUser = await account.get();
//       setUser(loggedInUser);
//       setEmail("");
//       setPassword("");
//       router.push("/dashboard");
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Login failed. Please check your credentials.");
//     }
//   };

//   const register = async () => {
//     const passwordError = validatePassword(password);
//     if (passwordError) {
//       console.error("Registration error:", passwordError);
//       alert(passwordError);
//       return;
//     }

//     try {
//       await account.create(ID.unique(), email, password, name);
//       await handleEmailLogin();
//     } catch (error) {
//       console.error("Registration error:", error);
//       alert("Registration failed. Please try again.");
//     }
//   };

//   const handleLogin = async (provider) => {
//     try {
//       await account.createOAuth2Session(
//         provider,
//         "http://localhost:3000/dashboard",
//         "http://localhost:3000/"
//       );
//     } catch (error) {
//       console.error(`Login with ${provider} error:`, error);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (showRegister) {
//       register();
//     } else {
//       handleEmailLogin();
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-red-600"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mt-4 bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         {showRegister && (
//           <input
//             type="text"
//             placeholder="Name"
//             className="w-full mt-4 bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         )}
//         <button
//           className="bg-green-600 mt-4 text-white py-3 px-6 rounded w-full"
//           type="submit"
//         >
//           {showRegister ? "Register" : "Login"}
//         </button>
//       </form>
//       <div className="relative">
//         <hr className="my-8 border-t border-gray-300" />
//         <span className="px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800">
//           Or
//         </span>
//       </div>
//       <SocialLoginButton
//         provider="google"
//         handleLogin={handleLogin}
//         icon={faGoogle}
//         bg="red"
//         label="Google"
//       />
//       <SocialLoginButton
//         provider="facebook"
//         handleLogin={handleLogin}
//         icon={faFacebook}
//         bg="blue"
//         label="Facebook"
//       />
//       <SocialLoginButton
//         provider="linkedin"
//         handleLogin={handleLogin}
//         icon={faLinkedin}
//         bg="blue"
//         label="LinkedIn"
//       />
//     </>
//   );
// };

// const SignIn = () => {
//   const [showRegister, setShowRegister] = useState(false);

//   const handleClick = () => {
//     setShowRegister(!showRegister);
//   };

//   return (
//     <section className="ezy__signup10 light py-14 md:py-24 bg-white text-white dark:text-white">
//       <div className="container px-4 mx-auto">
//         <div className="grid grid-cols-6 gap-6 h-full">
//           <div className="col-span-6 md:col-span-2 lg:col-span-3">
//             <div
//               className="bg-contain bg-center bg-no-repeat min-h-[150px] rounded-xl hidden md:block w-full md:w-[200%] lg:w-[150%] h-full"
//               style={{
//                 backgroundImage: "url(/images/loginimage.jpg)",
//               }}
//             ></div>
//           </div>
//           <div className="col-span-6 md:col-span-4 lg:col-span-3 py-12">
//             <div className="max-w-lg w-full h-full">
//               <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-4 md:p-12 lg:py-16">
//                 <h2 className="text-red-900 dark:text-white text-2xl font-bold mb-3">
//                   Welcome to Reblug
//                 </h2>
//                 {showRegister ? (
//                   <div className="flex items-center mb-6 md:mb-12">
//                     <p className="mb-0 mr-2 opacity-50">
//                       Already have an account?
//                     </p>
//                     <button type="button" onClick={handleClick}>
//                       Login
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex items-center mb-6 md:mb-12">
//                     <p className="mb-0 mr-2 opacity-50">
//                       Don't have an account?
//                     </p>
//                     <button type="button" onClick={handleClick}>
//                       Create Account
//                     </button>
//                   </div>
//                 )}
//                 <SignInForm
//                   showRegister={showRegister}
//                   setShowRegister={setShowRegister}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SignIn;
