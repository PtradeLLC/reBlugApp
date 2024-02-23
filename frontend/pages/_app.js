import React, { Suspense, useEffect, useState } from "react";
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { UserProvider } from "../components/UserProvider";
import { RecoilRoot } from 'recoil';
import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

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
