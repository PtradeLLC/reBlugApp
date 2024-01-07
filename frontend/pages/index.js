import Head from "next/head";
import Hero from "../components/Hero";
import Tools from "../components/Tools";
import Influencer from "../components/Influencers";
import Affiliate from "../components/Affliate";
import WaitingList from "../components/waitingList";
import LogoTwo from "../components/LogoTwo";
import { useState } from "react";
import Blog from "../components/Blog"

const Home = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Head>
        <title>ForgedMart</title>
        <meta name="description" content="Our workflow automation tools helps brand marketers automate their marketing tasks, such as email marketing, lead generation, and social media marketing. By developing marketing workflow automation tools to help brand marketers save time and resources, brands can improve efficiency, and generate more sales and brand awareness." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <Hero />
        </div>
        <div className="flex justify-center content-center">
          <Tools openModal={openModal} setOpenModal={setOpenModal} />
        </div>
        <div className="flex mt-3 mb-2 w-full justify-center content-center">
          <LogoTwo />
        </div>
        <div className="flex justify-center content-center mt-3">
          <Influencer openModal={openModal} setOpenModal={setOpenModal} />
        </div>
        <div className="flex justify-center content-center mt-3">
          <Blog />
        </div>
        <div className="mt-3 w-full">
          <Affiliate openModal={openModal} setOpenModal={setOpenModal} />
        </div>
      </main>
      <span className="mt-3">
        {openModal && <WaitingList setOpenModal={setOpenModal} />}
      </span>
    </div>
  );
};

export default Home;

