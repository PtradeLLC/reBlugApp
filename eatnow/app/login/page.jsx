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
