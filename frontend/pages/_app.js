import React, { useEffect } from "react";
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider, useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { UserProvider } from "../components/UserProvider";
import { RecoilRoot } from 'recoil';
import { NextUIProvider } from '@nextui-org/react';
import { account } from '../lib/appwrite';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    const checkAuth = async () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('next-auth.session-token'))?.split('=')[1];
      if (token) {
        try {
          const userSession = await account.get();
          console.log("User logged in", userSession);
          // Handle session state if needed
        } catch (error) {
          console.error("Failed to get session from Appwrite", error);
          // Handle error, token might be invalid
        }
      }
    };

    checkAuth();
  }, []);

  return (
    <SessionProvider session={session}>
      <UserProvider>
        <RecoilRoot>
          <Layout className="overflow-hidden bg-white py-24 sm:py-32 portrait:hidden">
            <NextUIProvider>
              <Component {...pageProps} />
            </NextUIProvider>
            <Analytics />
            <ToastContainer />
          </Layout>
        </RecoilRoot>
      </UserProvider>
    </SessionProvider>
  );
}

export default MyApp;



// import React, { Suspense, useEffect, useState } from "react";
// import { Analytics } from '@vercel/analytics/react';
// import { SessionProvider } from "next-auth/react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../styles/globals.css";
// import Layout from "../components/Layout";
// import { UserProvider } from "../components/UserProvider";
// import { RecoilRoot } from 'recoil';
// import { NextUIProvider } from '@nextui-org/react';

// function MyApp({ Component, pageProps: { session, ...pageProps } }) {

//   return (
//     <SessionProvider session={session}>
//       <UserProvider>
//         <RecoilRoot>
//           <Layout className="overflow-hidden bg-white py-24 sm:py-32 portrait:hidden">
//             <NextUIProvider>
//               <Component {...pageProps} />
//             </NextUIProvider>
//             <Analytics />
//             <ToastContainer />
//           </Layout>
//         </RecoilRoot>
//       </UserProvider>
//     </SessionProvider>
//   );
// }

// export default MyApp;
