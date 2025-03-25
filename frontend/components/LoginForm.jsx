"use client";
import React, { useState } from "react";
import { Account, ID } from "appwrite";

const LoginForm = () => {
  //   const [login_email, setLoginEmail] = useState("");

  //   const handleChange = (event) => {
  //     setLoginEmail(event.target.value);
  //   };

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     try {
  //       const account = new Account(ID);

  //       // Create Account
  //       const userAccount = await account.create(
  //         ID.unique(),
  //         login_email,
  //         login_email,
  //         ["user"]
  //       );

  //       console.log(userAccount);
  //       if (userAccount) {
  //         // Create Email Session
  //         await account.createEmailSession(login_email);
  //         window.location.href = "/dashboard";
  //         console.log("Account created successfully");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  return (
    <main className="w-full flex flex-col justify-center px-4">
      <div className="max-w-sm w-full text-gray-700 space-y-4">
        {/* <form onSubmit={handleSubmit}>
          <div>
            <label className="font-medium text-slate-900">Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={login_email}
              onChange={handleChange}
              className="w-full mt-2 px-3 py-2 text-slate-900 bg-transparent outline-none border focus:border-white shadow-sm rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 text-black font-medium bg-white hover:bg-stone-500 active:bg-white rounded-lg duration-150"
          >
            Sign in
          </button>
        </form> */}
        {/* <div className="relative">
          <span className="block w-full h-px bg-gray-300"></span>
          <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
            Or continue with
          </p>
        </div> */}
        <div className="space-y-4 text-sm font-medium">
          <button
            type="button"
            className="w-full flex text-slate-900 items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-white"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_17_40)">
                <path
                  d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                  fill="#4285F4"
                />
                <path
                  d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                  fill="#34A853"
                />
                <path
                  d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                  fill="#FBBC04"
                />
                <path
                  d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Continue with Google
          </button>
          <button
            type="button"
            className="w-full flex text-slate-900 items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 48 48"
            >
              <path
                fill="#0288D1"
                d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
              ></path>
              <path
                fill="#FFF"
                d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
              ></path>
            </svg>
            Continue with LinkedIn
          </button>
          <button
            type="button"
            className="w-full flex text-slate-900 items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="21"
              height="21"
              viewBox="0 0 48 48"
            >
              <linearGradient
                id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                x1="9.993"
                x2="40.615"
                y1="9.993"
                y2="40.615"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#2aa4f4"></stop>
                <stop offset="1" stop-color="#007ad9"></stop>
              </linearGradient>
              <path
                fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
              ></path>
              <path
                fill="#fff"
                d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
              ></path>
            </svg>
            Continue with Facebook
          </button>
        </div>
      </div>
      <br />
    </main>
  );
};

export default LoginForm;
