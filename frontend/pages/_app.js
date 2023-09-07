import Layout from "../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import AuthProvider, { useAuth } from './AuthContext';
import { SessionProvider } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // const { data: session } = useSession();
  return (
    <SessionProvider session={session}>
      <Layout className="overflow-hidden bg-white py-24 sm:py-32">
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </SessionProvider>
    // <AuthProvider>
    //   <Layout className="overflow-hidden bg-white py-24 sm:py-32">
    //     <Component {...pageProps} />
    //     <ToastContainer />
    //   </Layout>
    // </AuthProvider>
  )
}
