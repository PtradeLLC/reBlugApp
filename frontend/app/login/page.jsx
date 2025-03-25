"use client";
import { useState } from "react";
import SignInForm from "@/components/SignInForm";

const SignIn = () => {
  const [showRegister, setShowRegister] = useState(false);

  const handleClick = () => {
    setShowRegister(!showRegister);
  };

  return (
    <section className="ezy__signup10 light py-14 md:py-24 bg-white text-white dark:text-white">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-6 gap-6 h-full">
          <div className="col-span-6 md:col-span-2 lg:col-span-3">
            <div
              className="bg-contain bg-center bg-no-repeat min-h-[150px] rounded-xl hidden md:block w-full md:w-[200%] lg:w-[150%] h-full"
              style={{
                backgroundImage: "url(/images/userss.jpg)",
              }}
            ></div>
          </div>
          <div className="col-span-6 md:col-span-4 lg:col-span-3 py-12">
            <div className="max-w-lg w-full h-full">
              <div className="bg-white text-gray-900 dark:bg-slate-800 shadow-xl rounded-2xl p-4 md:p-12 lg:py-16">
                <h2 className="text-red-900 dark:text-white text-2xl font-bold mb-3">
                  Welcome to ReBlug
                </h2>
                {showRegister ? (
                  <div className="flex text-black items-center mb-6 md:mb-12">
                    <p className="mb-0 mr-2 opacity-50 text-black">
                      Already have an account?
                    </p>
                    <button
                      className="text-gray-900 hover:underline cursor-pointer"
                      onClick={handleClick}
                    >
                      Login
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center mb-6 md:mb-12">
                    <p className="mb-0 mr-2 opacity-50">New to Reblug?</p>
                    <button
                      className="text-gray-900 hover:underline cursor-pointer"
                      onClick={handleClick}
                    >
                      Register
                    </button>
                  </div>
                )}
                <SignInForm
                  showRegister={showRegister}
                  setShowRegister={setShowRegister}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
