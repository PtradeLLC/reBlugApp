import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout className="overflow-hidden bg-white py-24 sm:py-32">
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </SessionProvider>
  )
}
