import { useState } from "react";
import Head from "next/head";
import Hero from "../components/Hero";
import Tools from "../components/Tools";
import Influencer from "../components/Influencers";
import Affiliate from "../components/Affliate";
import WaitingList from "../components/waitingList";
import { Client, Account } from 'appwrite';

const Home = ({ emailMessages }) => {
  const [openModal, setOpenModal] = useState(false);

  // CREATE ACC 
  const createAccount = async () => {
    const client = new Client()
    const account = new Account(client)

    client
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_PROJECT);

    const response = account.create("username", "email", "password")

  }
  // LOGIN
  const logInSession = async () => {
    const client = new Client()
    const account = new Account(client)

    client
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_PROJECT);

    const response = account.create("email", "password")
  }

  // LOGOUT 
  const logOutSession = async () => {
    const client = new Client()
    const account = new Account(client)

    client
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_PROJECT);

    const response = account.delete();
  }
  return (
    <>
      <Head>
        <title>ForgedMart</title>
        <meta name="description" content="Gen" />
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
        <div className="flex justify-center content-center mt-3">
          <Influencer openModal={openModal} setOpenModal={setOpenModal} />
        </div>
        <div className="mt-3">
          <Affiliate openModal={openModal} setOpenModal={setOpenModal} />
        </div>
      </main>
      <span className="mt-3">
        {openModal && <WaitingList setOpenModal={setOpenModal} />}
      </span>
    </>
  );
};

export default Home;

