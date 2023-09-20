import Layout from "../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { NhostProvider, NhostClient } from '@nhost/nextjs';
import { UserProvider } from "../components/UserProvider";

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || '',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || ''
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <NhostProvider nhost={nhost} initial={pageProps.nhostSession}>
        <UserProvider>
          <Layout className="overflow-hidden bg-white py-24 sm:py-32">
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </UserProvider>
      </NhostProvider >
    </>
  )
}
