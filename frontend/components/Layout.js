import Navbar from "./Navbar";
import Footer from "./Footer";
import Loading from "../pages/dashboard/loading";
import { Suspense } from "react";
import {
  useSignOut,
  getNhostSession,
  NhostSession,
  useAccessToken,
  useAuthenticated,
  useUserData,
  NhostClient
} from '@nhost/nextjs'

export default function Layout({ children }) {
  const { signOut } = useSignOut();

  return (
    <>
      <Navbar signOut={signOut} />
      <main>
        <Suspense fallback={Loading}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
