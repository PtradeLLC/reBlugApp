import Navbar from "./Navbar";
import Footer from "./Footer";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <SpeedInsights />
      <Footer />
    </>
  );
}
