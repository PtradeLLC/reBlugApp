import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/Navigation";
import Foot from "../components/Footer";
import { metadata, viewport } from "./metadata";
import ClientStyle from "./ClientStyle"; // Correct import path

export { metadata, viewport };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="idText">
        <div>
          <Providers>
            <NavBar />
            <ClientStyle />
            {children}
            <Foot />
          </Providers>
        </div>
      </body>
    </html>
  );
}
