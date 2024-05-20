import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

import Navbar from "./Navbar";
import Footer from "./Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SideBarNarrow from "./SideBarNarrow";
import { useSession } from "next-auth/react";
import PrelineScript from "./PrelineScript";

export default function Layout({ children }) {
  const { data: session } = useSession();

  return (
    <>
      <div className="flex justify-center px-1 m-auto">
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
          <PrelineScript />
          <Footer />
        </div>
      </div>
    </>
  );
}

// Define propTypes for the Layout component
Layout.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is a node and required
};




// import React from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { SpeedInsights } from "@vercel/speed-insights/next"
// import SideBarNarrow from "./SideBarNarrow";
// import { useSession, signIn, signOut } from "next-auth/react";
// import PrelineScript from "./PrelineScript";

// export default function Layout({ children }) {
//   const { data: session } = useSession();


//   return (
//     <>
//       <div className="flex justify-center px-1 m-auto">
//         {session && (
//           <div className="w-1/30 h-2/5 flex-none ">
//             <SideBarNarrow />
//           </div>
//         )}

//         <div className="w-11/12 h-auto justify-center items-center">
//           <Navbar />
//           <main>
//             {children}
//           </main>
//           <SpeedInsights />
//           <PrelineScript />
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// }