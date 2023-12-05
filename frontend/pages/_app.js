import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { UserProvider } from "../components/UserProvider";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <Layout className="overflow-hidden bg-white py-24 sm:py-32">
          <Component {...pageProps} />
          <Analytics />
          <ToastContainer />
        </Layout>
      </UserProvider>
    </SessionProvider>
  );
}

export default MyApp;




// import { SessionProvider } from "next-auth/react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../styles/globals.css";
// import Layout from "../components/Layout";
// import { UserProvider } from "../components/UserProvider";


// function MyApp({ Component, pageProps: { session, ...pageProps } }) {

//   return (
//     <SessionProvider session={session}>
//       <UserProvider>
//         <Layout className="overflow-hidden bg-white py-24 sm:py-32">
//           <Component {...pageProps} />
//           <ToastContainer />
//         </Layout>
//       </UserProvider>
//     </SessionProvider>
//   );
// }

// export default MyApp;
