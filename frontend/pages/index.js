import Head from "next/head";
import Hero from "../components/Hero";
import Tools from "../components/Tools";
import Affiliate from "../components/Affliate";
import WaitingList from "../components/waitingList";
import AIBlog from "../components/blogSection";
import LogoTwo from "../components/LogoTwo";
import { useState } from "react";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);


  return (
    <div>
      <Head>
        <title>reBlug</title>
        <meta name="description" content="A platform for brands, bloggers, and marketers to connect in a unified ecosystem. Making blogging useful for marketing through the use of software." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>

      <main className="flex flex-col justify-center items-center">
        <span className="">
          <div className="flex justify-center content-center">
            <Hero />
          </div>
          <div className="flex justify-center content-center">
            <AIBlog />
          </div>
          <div className="mt-3 w-full">
            <Affiliate openModal={openModal} setOpenModal={setOpenModal} />
          </div>
          <div className="flex justify-center content-center mb-10">
            <Tools openModal={openModal} setOpenModal={setOpenModal} />
          </div>
        </span>
        <div className="flex mt-1 w-full justify-center content-center">
          <LogoTwo />
        </div>
      </main>
      <span className="mt-3">
        {openModal && <WaitingList setOpenModal={setOpenModal} />}
      </span>
    </div>
  );
};

export default Home;

