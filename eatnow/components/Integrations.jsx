"use client";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import Link from "next/link";
import { Badge } from "@nextui-org/react";

const Integrations = () => {
  const integrationContacts = [
    { name: "Airtable", url: "", image: "/images/air.png", isDefault: "No" },
    { name: "Box", url: "", image: "/images/box.png", isDefault: "No" },
    { name: "Dropbox", url: "", image: "/images/dropbx.png", isDefault: "No" },
  ];

  const integrationContents = [
    {
      name: "Wordpress",
      url: "",
      image: "/images/wordpress.png",
      isDefault: "No",
    },
    { name: "Tumblr", url: "", image: "/images/tumblr.png", isDefault: "No" },
    { name: "Webflow", url: "", image: "/images/webflow.png", isDefault: "No" },
    { name: "Medium", url: "", image: "/images/med.png", isDefault: "No" },
    { name: "Blogger", url: "", image: "/images/blog.png", isDefault: "No" },
    { name: "Dev", url: "", image: "/images/dev.png", isDefault: "No" },
  ];

  const integrationPayments = [
    {
      name: "ReBlug Card",
      url: "",
      image: "/images/faviconfb.png",
      isDefault: "Yes",
    },
    { name: "Paypal", url: "", image: "/images/paypal.png", isDefault: "No" },
    { name: "Square", url: "", image: "/images/square.png", isDefault: "No" },
    {
      name: "Braintree",
      url: "",
      image: "/images/paypal.png",
      isDefault: "No",
    },
  ];

  const [enabledIntegrations, setEnabledIntegrations] = useState({});

  const handleToggleChange = (name) => {
    setEnabledIntegrations((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const renderIntegrationItem = (item) => (
    <Link
      href="#"
      className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        src={item.image}
        alt={item.name}
        className="me-2 h-4 w-4 shrink-0 text-gray-900 dark:text-white"
        width="24"
        height="24"
      />
      <span className="text-sm font-medium text-gray-900 dark:text-white">
        {item.name}
      </span>
      <Switch
        checked={enabledIntegrations[item.name] || false}
        onChange={() => handleToggleChange(item.name)}
        className={`group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 ${
          enabledIntegrations[item.name] ? "bg-green-600" : "bg-gray-200"
        }`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute h-full w-full rounded-md bg-white`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute mx-auto h-4 w-9 rounded-full bg-gray-200 transition-colors duration-200 ease-in-out ${
            enabledIntegrations[item.name] ? "bg-green-600" : "bg-gray-200"
          }`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out ${
            enabledIntegrations[item.name] ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </Switch>
    </Link>
  );

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

          {/* Payments Section */}
          <div className="flex flex-col">
            <p className="text-md font-bold">Payments</p>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3">
              {integrationPayments.map((payment) => (
                <div key={payment.name}>
                  {payment.isDefault === "Yes" ? (
                    <Badge
                      className="bg-green-400 text-slate-800 text-xs"
                      content="default"
                      color="success"
                      size="sm"
                    >
                      {renderIntegrationItem(payment)}
                    </Badge>
                  ) : (
                    renderIntegrationItem(payment)
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contents Section */}
          <div className="flex flex-col mt-3">
            <p className="text-md font-bold">
              Contents{" "}
              <span className="text-xs">(Publish to these platforms)</span>
            </p>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {integrationContents.map((content) => (
                <div key={content.name}>{renderIntegrationItem(content)}</div>
              ))}
            </div>
          </div>

          {/* Contacts Section */}
          <div className="flex flex-col mt-3">
            <p className="text-md font-bold">
              Contacts{" "}
              <span className="text-xs">(Import your contact list)</span>
            </p>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {integrationContacts.map((contact) => (
                <div key={contact.name}>{renderIntegrationItem(contact)}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Integrations;

// import { useState } from "react";
// import { Switch } from "@headlessui/react";
// import Link from "next/link";
// import { Badge } from "@nextui-org/react";

// const Integrations = () => {
//   const integrationContacts = [
//     {
//       name: "Airtable",
//       url: "",
//       image: "/images/air.png",
//       isDefault: "No",
//     },
//     {
//       name: "Box",
//       url: "",
//       image: "/images/box.png",
//       isDefault: "No",
//     },
//     {
//       name: "Dropbox",
//       url: "",
//       image: "/images/dropbx.png",
//       isDefault: "No",
//     },
//   ];
//   const integrationContents = [
//     {
//       name: "Wordpress",
//       url: "",
//       image: "/images/wordpress.png",
//       isDefault: "No",
//     },
//     {
//       name: "Tumblr",
//       url: "",
//       image: "/images/tumblr.png",
//       isDefault: "No",
//     },
//     {
//       name: "Webflow",
//       url: "",
//       image: "/images/webflow.png",
//       isDefault: "No",
//     },
//     {
//       name: "Medium",
//       url: "",
//       image: "/images/med.png",
//       isDefault: "No",
//     },
//   ];

//   const integrationPayments = [
//     {
//       name: "ReBlug Virtual Card",
//       url: "",
//       image: "/images/faviconfb.png",
//       isDefault: "Yes",
//     },
//     {
//       name: "Paypal",
//       url: "",
//       image: "/images/paypal.png",
//       isDefault: "No",
//     },
//     {
//       name: "Square",
//       url: "",
//       image: "/images/square.png",
//       isDefault: "No",
//     },
//     {
//       name: "Braintree",
//       url: "",
//       image: "/images/paypal.png",
//       isDefault: "No",
//     },
//   ];

//   const [enabled, setEnabled] = useState(false);

//   const renderIntegrationItem = (item) => {
//     return (
//       <Link
//         href="#"
//         className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
//       >
//         <img
//           className="me-2 h-4 w-4 shrink-0 text-gray-900 dark:text-white"
//           width="24"
//           height="24"
//           fill="none"
//           viewBox="0 0 24 24"
//           src={item.image}
//         />

//         <span className="text-sm font-medium text-gray-900 dark:text-white">
//           {item.name}
//         </span>
//         <Switch
//           checked={enabled}
//           onChange={setEnabled}
//           className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
//         >
//           <span className="sr-only">Use setting</span>
//           <span
//             aria-hidden="true"
//             className="pointer-events-none absolute h-full w-full rounded-md bg-white"
//           />
//           <span
//             aria-hidden="true"
//             className="pointer-events-none absolute mx-auto h-4 w-9 rounded-full bg-gray-200 transition-colors duration-200 ease-in-out group-data-[checked]:bg-green-600"
//           />
//           <span
//             aria-hidden="true"
//             className="pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out group-data-[checked]:translate-x-5"
//           />
//         </Switch>
//       </Link>
//     );
//   };

//   return (
//     <div>
//       <section className="bg-gray-50 antialiased dark:bg-gray-900">
//         <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
//           <div className="mb-4 flex flex-col gap-4 md:mb-8">
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
//               Connect with your favorite apps
//             </h2>
//             <p className="text-sm my-2">Click below to connect your data</p>
//           </div>

//           {/* Payments Section */}
//           <div className="flex flex-col">
//             <p className="text-md font-bold">Payments</p>
//             <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3">
//               {integrationPayments.map((payment) => (
//                 <div key={payment.name}>
//                   {payment.isDefault === "Yes" ? (
//                     <Badge
//                       className="bg-green-400 text-slate-800 text-xs"
//                       content="default"
//                       color="danger"
//                       size="sm"
//                     >
//                       {renderIntegrationItem(payment)}
//                     </Badge>
//                   ) : (
//                     <>renderIntegrationItem(payment)</>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Contents Section */}
//           <div className="flex flex-col mt-3">
//             <p className="text-md font-bold">Contents</p>
//             <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//               {integrationContents.map((content) => (
//                 <div key={content.name}>{renderIntegrationItem(content)}</div>
//               ))}
//             </div>
//           </div>

//           {/* Contacts Section */}
//           <div className="flex flex-col mt-3">
//             <p className="text-md font-bold">Contacts</p>
//             <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//               {integrationContacts.map((contact) => (
//                 <div key={contact.name}>{renderIntegrationItem(contact)}</div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Integrations;
