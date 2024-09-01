"use client";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import Image from "next/image";
import Nango from "@nangohq/frontend";

const integrationData = {
  contacts: [
    {
      name: "Airtable",
      url: "",
      image: "/images/air.png",
      isDefault: "No",
      integrationId: "airtable",
      deployed: false,
      connected: false,
    },
    {
      name: "Box",
      url: "",
      image: "/images/box.png",
      isDefault: "No",
      integrationId: "box",
      deployed: false,
      connected: false,
    },
    {
      name: "Dropbox",
      url: "",
      image: "/images/dropbx.png",
      isDefault: "No",
      integrationId: "dropbox",
      deployed: false,
      connected: false,
    },
  ],
  contents: [
    {
      name: "Wordpress",
      url: "",
      image: "/images/wordpress.png",
      isDefault: "No",
      integrationId: "wordpress",
      deployed: false,
      connected: false,
    },
    {
      name: "Tumblr",
      url: "",
      image: "/images/tumblr.png",
      isDefault: "No",
      integrationId: "tumblr",
      deployed: false,
      connected: false,
    },
    {
      name: "Webflow",
      url: "",
      image: "/images/webflow.png",
      isDefault: "No",
      integrationId: "webflow",
      deployed: false,
      connected: false,
    },
    {
      name: "Medium",
      url: "",
      image: "/images/med.png",
      isDefault: "No",
      integrationId: "medium",
      deployed: false,
      connected: false,
    },
    {
      name: "Blogger",
      url: "",
      image: "/images/blog.png",
      isDefault: "No",
      integrationId: "blogger",
      deployed: false,
      connected: false,
    },
    {
      name: "Dev",
      url: "",
      image: "/images/dev.png",
      isDefault: "No",
      integrationId: "dev",
      deployed: false,
      connected: false,
    },
  ],
  payments: [
    {
      name: "ReBlug Card",
      url: "",
      image: "/images/faviconfb.png",
      isDefault: "Yes",
      integrationId: "",
      deployed: false,
      connected: false,
    },
    {
      name: "Paypal",
      url: "",
      image: "/images/paypal.png",
      isDefault: "No",
      integrationId: "paypal",
      deployed: false,
      connected: false,
    },
    {
      name: "Square",
      url: "",
      image: "/images/square.png",
      isDefault: "No",
      integrationId: "square",
      deployed: false,
      connected: false,
    },
    {
      name: "Braintree",
      url: "",
      image: "/images/paypal.png",
      isDefault: "No",
      integrationId: "braintree",
      deployed: false,
      connected: false,
    },
  ],
};

const IntegrationSection = ({
  title,
  subtitle,
  integrations,
  handleSources,
  handleToggleChange,
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
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <Image
                src={integration.image}
                alt={integration.name}
                width={24}
                height={24}
                className="me-2 h-4 w-4 shrink-0 text-gray-900 dark:text-white"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {integration.name}
              </span>
              <Switch
                checked={integration.connected}
                onChange={() => handleToggleChange(integration)}
                className={`group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 ${
                  integration.connected ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute h-full w-full rounded-md bg-white"
                />
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute mx-auto h-4 w-9 rounded-full bg-gray-200 transition-colors duration-200 ease-in-out ${
                    integration.connected ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out ${
                    integration.connected ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </Switch>
            </div>
          </button>
        </div>
      ))}
    </div>
  </div>
);

const Integrations = () => {
  const [enabledIntegrations, setEnabledIntegrations] = useState({});

  // Initialize Nango client
  const nango = new Nango({
    publicKey: process.env.NEXT_PUBLIC_NANGO_PUBLIC_KEY_PROD,
  });

  const handleToggleChange = async (integration) => {
    const integrationId = integration.integrationId;

    try {
      // Initiate OAuth flow
      const result = await nango.auth(integrationId, "user123");

      if (result.ok) {
        setEnabledIntegrations((prev) => ({
          ...prev,
          [integration.integrationId]: !prev[integration.integrationId],
        }));
      } else {
        console.log(`Failed to connect to ${integrationId}`);
      }
    } catch (error) {
      console.error("Error during OAuth flow:", error);
    }
  };

  const handleSources = async (integration) => {
    const { integrationId, name } = integration;
    const connectionId = "user123"; // Replace with a unique identifier for the user

    try {
      // Only start the authentication flow if not already connected
      if (!enabledIntegrations[integrationId]) {
        const result = await nango.auth(integrationId, connectionId);

        if (result.ok) {
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

          // Update the state to reflect the connected status
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
            title="Payments"
            subtitle="Manage your payment methods"
            integrations={integrationData.payments}
            handleSources={handleSources}
            handleToggleChange={handleToggleChange}
          />

          <IntegrationSection
            title="Contents"
            subtitle="Publish to these platforms"
            integrations={integrationData.contents}
            handleSources={handleSources}
            handleToggleChange={handleToggleChange}
          />

          <IntegrationSection
            title="Contacts"
            subtitle="Import your contact list"
            integrations={integrationData.contacts}
            handleSources={handleSources}
            handleToggleChange={handleToggleChange}
          />
        </div>
      </section>
    </div>
  );
};

export default Integrations;

// "use client";
// import { useState } from "react";
// import { Switch } from "@headlessui/react";
// import Link from "next/link";
// import Image from "next/image";
// import Nango from "@nangohq/frontend";

// const integrationData = {
//   contacts: [
//     {
//       name: "Airtable",
//       url: "",
//       image: "/images/air.png",
//       isDefault: "No",
//       integrationId: "airtable",
//       deployed: false,
//       connected: false,
//     },
//     {
//       name: "Box",
//       url: "",
//       image: "/images/box.png",
//       isDefault: "No",
//       integrationId: "box",
//       deployed: false,
//       connected: false,
//     },
//     {
//       name: "Dropbox",
//       url: "",
//       image: "/images/dropbx.png",
//       isDefault: "No",
//       integrationId: "dropbox",
//       deployed: false,
//       connected: false,
//     },
//   ],
//   contents: [
//     {
//       name: "Wordpress",
//       url: "",
//       image: "/images/wordpress.png",
//       isDefault: "No",
//       integrationId: "wordpress",
//       deployed: false,
//       connected: false,
//     },
//     {
//       name: "Tumblr",
//       url: "",
//       image: "/images/tumblr.png",
//       isDefault: "No",
//       integrationId: "tumblr",
//       deployed: false,
//       connected: false,
//     },
//     {
//       name: "Webflow",
//       url: "",
//       image: "/images/webflow.png",
//       isDefault: "No",
//       integrationId: "webflow",
//       deployed: false,
//       connected: false,
//     },
//     {
//       name: "Medium",
//       url: "",
//       image: "/images/med.png",
//       isDefault: "No",
//       integrationId: "medium",
//       deployed: false,
//       connected: false,
//     },
//     {
//       name: "Blogger",
//       url: "",
//       image: "/images/blog.png",
//       isDefault: "No",
//       integrationId: "blogger",
//       deployed: false,
//       connected: false,
//     },
//     {
//       name: "Dev",
//       url: "",
//       image: "/images/dev.png",
//       isDefault: "No",
//       integrationId: "dev",
//       deployed: false,
//       connected: false,
//     },
//   ],
//   payments: [
//     {
//       name: "ReBlug Card",
//       url: "",
//       image: "/images/faviconfb.png",
//       isDefault: "Yes",
//       integrationId: "",
//       deployed: false,
//       connected: false,
//     },
//     {
//       name: "Paypal",
//       url: "",
//       image: "/images/paypal.png",
//       isDefault: "No",
//       integrationId: "paypal",
//       deployed: false,
//       connected: false,
//     },
//     {
//       name: "Square",
//       url: "",
//       image: "/images/square.png",
//       isDefault: "No",
//       integrationId: "square",
//       deployed: false,
//       connected: false,
//     },
//     {
//       name: "Braintree",
//       url: "",
//       image: "/images/paypal.png",
//       isDefault: "No",
//       integrationId: "braintree",
//       deployed: false,
//       connected: false,
//     },
//   ],
// };

// const IntegrationSection = ({
//   title,
//   subtitle,
//   integrations,
//   handleSources,
//   handleToggleChange,
// }) => (
//   <div className="flex flex-col mt-3">
//     <p className="text-md font-bold">
//       {title} <span className="text-xs">({subtitle})</span>
//     </p>
//     <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//       {integrations.map((integration) => (
//         <div key={integration.integrationId} className="relative">
//           <button onClick={() => handleSources(integration)} className="w-full">
//             <Link
//               href="#"
//               className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
//             >
//               <Image
//                 src={integration.image}
//                 alt={integration.name}
//                 width={24}
//                 height={24}
//                 className="me-2 h-4 w-4 shrink-0 text-gray-900 dark:text-white"
//               />
//               <span className="text-sm font-medium text-gray-900 dark:text-white">
//                 {integration.name}
//               </span>
//               <Switch
//                 checked={integration.connected}
//                 onChange={() => handleToggleChange(integration)}
//                 className={`group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 ${
//                   integration.connected ? "bg-green-600" : "bg-gray-200"
//                 }`}
//               >
//                 <span className="sr-only">Use setting</span>
//                 <span
//                   aria-hidden="true"
//                   className="pointer-events-none absolute h-full w-full rounded-md bg-white"
//                 />
//                 <span
//                   aria-hidden="true"
//                   className={`pointer-events-none absolute mx-auto h-4 w-9 rounded-full bg-gray-200 transition-colors duration-200 ease-in-out ${
//                     integration.connected ? "bg-green-600" : "bg-gray-200"
//                   }`}
//                 />
//                 <span
//                   aria-hidden="true"
//                   className={`pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out ${
//                     integration.connected ? "translate-x-5" : "translate-x-0"
//                   }`}
//                 />
//               </Switch>
//             </Link>
//           </button>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const Integrations = () => {
//   const [enabledIntegrations, setEnabledIntegrations] = useState({});

//   // Initialize Nango client
//   const nango = new Nango({
//     publicKey: process.env.NEXT_PUBLIC_NANGO_PUBLIC_KEY_PROD,
//   });

//   const handleToggleChange = async (integration) => {
//     const integrationId = integration.integrationId;

//     try {
//       // Initiate OAuth flow
//       const result = await nango.auth(integrationId, "user123");

//       if (result.ok) {
//         setEnabledIntegrations((prev) => ({
//           ...prev,
//           [integration.integrationId]: !prev[integration.integrationId],
//         }));
//       } else {
//         console.log(`Failed to connect to ${integrationId}`);
//       }
//     } catch (error) {
//       console.error("Error during OAuth flow:", error);
//     }
//   };

//   const handleSources = async (integration) => {
//     const { integrationId, name } = integration;
//     const connectionId = "user123"; // Replace with a unique identifier for the user

//     try {
//       const result = await nango.auth(integrationId, connectionId);

//       if (result.ok) {
//         const baseUrl = "/api/data_sources";
//         const response = await fetch(baseUrl, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             connectionId,
//             integrationId,
//           }),
//         });

//         if (!response.ok) {
//           console.error("Error saving to the database:", response.statusText);
//           return;
//         }

//         const responseData = await response.json();
//         console.log("Integration saved successfully:", responseData);
//       } else {
//         console.error("Authorization failed or was cancelled.");
//       }
//     } catch (error) {
//       console.error(`Error handling sources for ${name}:`, error);
//     }
//   };

//   return (
//     <div>
//       <section className="bg-gray-50 antialiased dark:bg-gray-900">
//         <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
//           <div className="mb-4 flex flex-col gap-4 md:mb-8">
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
//               Connect with your favorite apps
//             </h2>
//             <p className="text-sm my-2">
//               Enable sources below to connect your data
//             </p>
//           </div>

//           <IntegrationSection
//             title="Payments"
//             subtitle="Manage your payment methods"
//             integrations={integrationData.payments}
//             handleSources={handleSources}
//             handleToggleChange={handleToggleChange}
//           />

//           <IntegrationSection
//             title="Contents"
//             subtitle="Publish to these platforms"
//             integrations={integrationData.contents}
//             handleSources={handleSources}
//             handleToggleChange={handleToggleChange}
//           />

//           <IntegrationSection
//             title="Contacts"
//             subtitle="Import your contact list"
//             integrations={integrationData.contacts}
//             handleSources={handleSources}
//             handleToggleChange={handleToggleChange}
//           />
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Integrations;
