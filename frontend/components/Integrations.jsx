"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Nango from "@nangohq/frontend";
import { account } from "../app/appwrite";
import { integrationData } from "@/components/Campaigns/integrationData";

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
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {integrations.map((integration) => (
        <div key={integration.integrationId} className="relative">
          <button
            onClick={() => handleSources(integration)}
            className="w-full"
            disabled={integration.connected}
          >
            <div className="flex items-between items-center mx-auto rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
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
  const [integrations, setIntegrations] = useState(integrationData);

  useEffect(() => {
    async function getUser() {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
        if (currentUser) {
          fetchConnectedIntegrations(currentUser.$id);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  const fetchConnectedIntegrations = async (userId) => {
    try {
      const response = await fetch(`/api/data_sources?userId=${userId}`);
      if (response.ok) {
        const connectedIntegrations = await response.json();
        updateIntegrationsState(connectedIntegrations);
      }
    } catch (error) {
      console.error("Error fetching connected integrations:", error);
    }
  };

  const updateIntegrationsState = (connectedIntegrations) => {
    setIntegrations((prevIntegrations) => {
      const updatedIntegrations = { ...prevIntegrations };
      for (const category in updatedIntegrations) {
        updatedIntegrations[category] = updatedIntegrations[category].map(
          (integration) => ({
            ...integration,
            connected: connectedIntegrations.some(
              (connectedIntegration) =>
                connectedIntegration.integrationId === integration.integrationId
            ),
          })
        );
      }
      return updatedIntegrations;
    });
  };

  // Initialize Nango client
  const nango = new Nango({
    publicKey: process.env.NEXT_PUBLIC_NANGO_PUBLIC_PROD,
  });

  const handleSources = async (integration) => {
    const { integrationId, name } = integration;
    const connectionId = user ? `${user.$id}` : "";

    try {
      if (!integration.connected) {
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
              userId: user.$id,
            }),
          });

          if (!response.ok) {
            console.error("Error saving to the database:", response.statusText);
            return;
          }

          const responseData = await response.json();
          console.log("Integration saved successfully:", responseData);

          // Update the state to reflect the clicked integration as connected
          setIntegrations((prevIntegrations) => {
            const updatedIntegrations = { ...prevIntegrations };
            for (const category in updatedIntegrations) {
              updatedIntegrations[category] = updatedIntegrations[category].map(
                (item) =>
                  item.integrationId === integrationId
                    ? { ...item, connected: true }
                    : item
              );
            }
            return updatedIntegrations;
          });
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
              Click to enable sources below to connect your data
            </p>
          </div>

          <IntegrationSection
            title="Social"
            subtitle="Connect your social media account"
            integrations={integrations.social}
            handleSources={handleSources}
          />

          <IntegrationSection
            title="Contents"
            subtitle="Publish to these platforms"
            integrations={integrations.contents}
            handleSources={handleSources}
          />

          <IntegrationSection
            title="Contacts"
            subtitle="Connect to import your contact list"
            integrations={integrations.contacts}
            handleSources={handleSources}
          />
        </div>
      </section>
    </div>
  );
};

export default Integrations;
