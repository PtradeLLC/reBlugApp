import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/Navigation";
import Foot from "../components/Footer";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "reBlug App",
  description: "Eat now, Pay Never.",
  manifest: "/manifest.json",

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
    other: {
      rel: "apple-touch-icon",
      url: "/icon.png",
    },
  },

}

export const viewport = {
  themeColor: "#6c6b6a",
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="idText">
        <div>
          <Providers>
            <NavBar />
            {children}
            <Foot />
          </Providers>
        </div>
      </body>
    </html>
  );
}
