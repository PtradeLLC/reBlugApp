import "../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Layout from "../components/Layout";
import BrevoConversations from "../components/chatWdiget";

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          helpPageUrl: "https://forgedmart.com/support",
          logoImageUrl: "/images/Mart.png",
          logoPlacement: "inside",
          privacyPageUrl: "https://forgedmart.com/privacy",
          showOptionalFields: true,
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "iconButton",
          termsPageUrl: "https://forgedmart.com/terms",
        },
      }}
      {...pageProps}
    >
      <Layout className="overflow-hidden bg-white py-24 sm:py-32">
        <Component {...pageProps} />
        <BrevoConversations />
      </Layout>
    </ClerkProvider>
  );
}
