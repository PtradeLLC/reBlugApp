"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Nango from "@nangohq/frontend";
import { account } from "../app/appwrite";

const integrationData = {
  contacts: [
    {
      name: "Airtable",
      url: "",
      image: "/images/air.png",
      integrationId: "airtable",
      connected: false,
    },
    {
      name: "Box",
      url: "",
      image: "/images/box.png",
      integrationId: "box",
      connected: false,
    },
    {
      name: "Dropbox",
      url: "",
      image: "/images/dropbx.png",
      integrationId: "dropbox",
      connected: false,
    },
  ],
  contents: [
    {
      name: "Tumblr",
      url: "",
      image: "/images/tumblr.png",
      integrationId: "tumblr",
      connected: false,
    },
    {
      name: "NationBuilder",
      url: "",
      image: "/images/nationbuild.png",
      integrationId: "nationbuilder",
      connected: false,
    },
    {
      name: "Webflow",
      url: "",
      image: "/images/webflow.png",
      integrationId: "webflow",
      connected: false,
    },
    {
      name: "Medium",
      url: "",
      image: "/images/med.png",
      integrationId: "medium",
      connected: false,
    },
    {
      name: "Blogger",
      url: "",
      image: "/images/blog.png",
      integrationId: "blogger",
      connected: false,
    },
    {
      name: "Dev",
      url: "",
      image: "/images/dev.png",
      integrationId: "dev",
      connected: false,
    },
  ],
  payments: [
    {
      name: "ReBlug Card",
      url: "",
      image: "/images/faviconfb.png",
      integrationId: "",
      connected: true, // Set to true by default
    },
    // {
    //   name: "Contentstack",
    //   url: "",
    //   image: "/images/contentsta-svg.png",
    //   integrationId: "contentstack",
    //   connected: false,
    //   connectionConfig: {
    //     subdomain: `compass-starter---blt1482cdc67e-production`,
    //     appId: `${process.env.NEXT_PUBLIC_CONTENTSTACK_APP_ID}`,
    //   },
    // },
    // {
    //   name: "Paypal",
    //   url: "",
    //   image: "/images/paypal.png",
    //   integrationId: "paypal",
    //   connected: false,
    // },
    // {
    //   name: "Square",
    //   url: "",
    //   image: "/images/square.png",
    //   integrationId: "squareup",
    //   connected: false,
    // },
    // {
    //   name: "Braintree",
    //   url: "",
    //   image: "/images/paypal.png",
    //   integrationId: "braintree",
    //   connected: false,
    // },
  ],
};

const IntegrationSection = ({
  title,
  subtitle,
  integrations,
  handleSources,
}) => (
  <div className="flex flex-col mt-3">
    <p className="text-md font-bold">
      {title} <span className="text-xs">({subtitle})</span>
    </p>
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {integrations.map((integration) => (
        <div key={integration.integrationId} className="relative">
          <button
            onClick={() => handleSources(integration)}
            className="w-full"
            disabled={integration.connected}
          >
            <div className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <Image
                src={integration.image}
                alt={integration.name}
                width={24}
                height={24}
                className="me-2 h-4 w-4 shrink-0 text-gray-900 dark:text-white"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white mr-3">
                {integration.name}
              </span>
              {integration.connected ? (
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              ) : (
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
            </div>
          </button>
        </div>
      ))}
    </div>
  </div>
);

const Integrations = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enabledIntegrations, setEnabledIntegrations] = useState(() => {
    const initialState = {};
    for (const category in integrationData) {
      integrationData[category].forEach((integration) => {
        initialState[integration.integrationId] = integration.connected;
      });
    }
    return initialState;
  });

  useEffect(() => {
    async function getUser() {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  // Initialize Nango client
  const nango = new Nango({
    publicKey: process.env.NEXT_PUBLIC_NANGO_PUBLIC_PROD,
  });

  const handleSources = async (integration) => {
    const { integrationId, name } = integration;
    const connectionId = user ? `${user.$id}` : "";

    try {
      if (!enabledIntegrations[integrationId]) {
        const result = await nango.auth(integrationId, connectionId);

        if (result && result.connectionId) {
          const baseUrl = "/api/data_sources";
          const response = await fetch(baseUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              connectionId,
              integrationId,
            }),
          });

          if (!response.ok) {
            console.error("Error saving to the database:", response.statusText);
            return;
          }

          const responseData = await response.json();
          console.log("Integration saved successfully:", responseData);

          // Update the state to reflect only the clicked integration as connected
          setEnabledIntegrations((prev) => ({
            ...prev,
            [integrationId]: true,
          }));
        } else {
          console.error("Authorization failed or was cancelled.");
        }
      } else {
        console.log(`${name} is already connected.`);
      }
    } catch (error) {
      console.error(`Error handling sources for ${name}:`, error);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 antialiased dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 flex flex-col gap-4 md:mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Connect with your favorite apps
            </h2>
            <p className="text-sm my-2">
              Enable sources below to connect your data
            </p>
          </div>

          <IntegrationSection
            title="Monetize"
            subtitle="Connect your payment methods"
            integrations={integrationData.payments.map((integration) => ({
              ...integration,
              connected:
                enabledIntegrations[integration.integrationId] ||
                integration.connected,
            }))}
            handleSources={handleSources}
          />

          <IntegrationSection
            title="Contents"
            subtitle="Publish to these platforms"
            integrations={integrationData.contents.map((integration) => ({
              ...integration,
              connected:
                enabledIntegrations[integration.integrationId] ||
                integration.connected,
            }))}
            handleSources={handleSources}
          />

          <IntegrationSection
            title="Contacts"
            subtitle="Connect to import your contact list"
            integrations={integrationData.contacts.map((integration) => ({
              ...integration,
              connected:
                enabledIntegrations[integration.integrationId] ||
                integration.connected,
            }))}
            handleSources={handleSources}
          />
        </div>
      </section>
    </div>
  );
};

export default Integrations;
