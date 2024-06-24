import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/Navigation";
import Foot from "../components/Footer";
import { metadata, viewport } from "./metadata";
// import ClientStyle from "./ClientStyle";
import myMiddleware from '../_middleware';

export { metadata, viewport };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="">
        <div>
          <Providers>
            <NavBar />
            {/* <ClientStyle /> - swap this for new fontFamily */}
            {children}
            <Foot />
          </Providers>
        </div>
      </body>
    </html>
  );
}
