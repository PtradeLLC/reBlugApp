"use client";
import { useState } from "react";
// import Head from "next/head";
import Hero from "../components/Hero";
import AIBlog from "../components/BlogSection";
import FoodiesComponent from "../components/Foodies";
import EatNow from "../components/EatNow";
import BrandInfo from "../components/BrandInfo";

// import LogoTwo from "../components/LogoTwo";
// import Document from "./_document";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="overflow-hidden bg-white px-4 sm:px-6 lg:px-8">
      {/* <Head>
        <title>ReBlug</title>
        <meta
          name="description"
          content="A platform for brands, bloggers, and marketers to connect in a unified ecosystem. Making blogging useful for marketing through the use of software and AI tools."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/android-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/images/favicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head> */}

      <main className="flex flex-col justify-center items-center">
        <span className="">
          <div className="flex justify-center content-center">
            <Hero />
          </div>
          <div className="flex justify-center content-center">
            <AIBlog />
          </div>
          <div className="flex justify-center content-center">
            <FoodiesComponent />
          </div>
          {/* <div className="flex justify-center content-center">
            <EatNow />
          </div> */}
          {/* <div className="flex justify-center content-center">
            <BrandInfo />
          </div> */}
        </span>
      </main>
    </div>
  );
};

export default Home;
