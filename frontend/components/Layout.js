import Navbar from "./Navbar";
import Footer from "./Footer";
import { SpeedInsights } from "@vercel/speed-insights/next"
import SideBarNarrow from "./SideBarNarrow";
import { useSession, signIn, signOut } from "next-auth/react";




export default function Layout({ children }) {
  const { data: session, status } = useSession();
  return (
    <>
      <div className="flex m-auto">
        {session && (
          <div className="w-1/30 h-2/5 flex-none ">
            <SideBarNarrow />
          </div>
        )}

        <div className="w-11/12 h-auto justify-center items-center">
          <Navbar />
          <main>
            {children}
          </main>
          <SpeedInsights />
          <Footer />
        </div>
      </div>
    </>
  );
}