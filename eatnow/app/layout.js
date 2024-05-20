import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

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
      {/* <body className={inter.className}>{children}</body> */}
      <body className={inter.className}>
        <div>
          <Providers>
            <NavBar />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
