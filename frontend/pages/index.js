import Head from "next/head";
import Hero from "../components/Hero";
import Tools from "../components/Tools";
import Influencer from "../components/Influencers";
import Affiliate from "../components/Affliate";
import WaitingList from "../components/waitingList";
import AIBlog from "../components/blogSection";
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

      <main className="flex flex-col justify-center items-center">
        <span className="">
          <div className="flex justify-center content-center">
            <Hero />
          </div>
          <div className="flex justify-center content-center mb-10">
            <Tools openModal={openModal} setOpenModal={setOpenModal} />
          </div>
        </span>
        <div className="flex justify-center content-center">
          <AIBlog />
        </div>
        <div className="flex mt-1 w-full justify-center content-center">
          <LogoTwo />
        </div>
        <div className="flex justify-center content-center">
          <Blog />
        </div>
        <div className="mt-3 w-full">
          <Affiliate openModal={openModal} setOpenModal={setOpenModal} />
        </div>
        {/* <div className="flex justify-center content-center mt-3">
          <Influencer openModal={openModal} setOpenModal={setOpenModal} />
        </div> */}
      </main>
      <span className="mt-3">
        {openModal && <WaitingList setOpenModal={setOpenModal} />}
      </span>
    </div>
  );
};

export default Home;

