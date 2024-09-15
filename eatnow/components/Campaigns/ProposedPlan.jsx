"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { PlusIcon, PhotoIcon } from "@heroicons/react/20/solid";
import { Tooltip, Button } from "@nextui-org/react";
import * as XLSX from "xlsx";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Nango from "@nangohq/frontend";
import { account } from "../../app/appwrite";
import { integrationData } from "./integrationData";
import Image from "next/image";
import axios from "axios";
import CampaignAutomation from "./campaignAutomation";
import Icon from "@mdi/react";
import { mdiArrowUpBoldBox } from "@mdi/js";
import Link from "next/link";

const Plan = ({ textData, isOpen }) => {
  const [emailBuild, setEmailBuild] = useState(false);
  const [emails, setEmails] = useState([]);
  const [singleEmail, setSingleEmail] = useState("");
  const [name, setName] = useState("");
  const [fallbackSubjectLine, setFallbackSubjectLine] = useState("");
  const [campaignPage, setCampaignPage] = useState("");
  const [composeEmail, setComposeEmail] = useState(false);
  const [buttonText, setButtonText] = useState("Prepare Content");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [editedContent, setEditedContent] = useState(false);
  const [isComposed, setIsComposed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [contactProviders, setContactProviders] = useState(false);
  const [providers, setProviders] = useState(integrationData.contacts);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [inputMessage, setInputMessage] = useState("Included");
  const [automationFrequency, setAutomationFrequency] = useState("none");
  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    website: "",
    // ... other fields ...
  });
  const modalRef = useRef(null);

  const fetchConnectedProviders = useCallback(async (userId) => {
    try {
      const response = await fetch(`/api/getProviders?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      updateProviders(data.providers);
    } catch (error) {
      console.error("Error fetching providers:", error);
      setError("Failed to fetch providers. Please try again later.");
    }
  }, []);

  useEffect(() => {
    async function getUser() {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
        if (currentUser && currentUser.$id) {
          await fetchConnectedProviders(currentUser.$id);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setError(
          "Failed to fetch user information. Please try logging in again."
        );
      }
    }
    getUser();
  }, [fetchConnectedProviders]);

  const nango = new Nango({
    publicKey: process.env.NEXT_PUBLIC_NANGO_PUBLIC_PROD,
  });

  useEffect(() => {
    fetchConnectedProviders();
  }, []);

  // New useEffect to handle dynamic button text changes
  useEffect(() => {
    if (
      emails.length > 0 ||
      singleEmail ||
      name ||
      fallbackSubjectLine ||
      campaignPage
    ) {
      if (buttonText === "Please fill out the required fields") {
        setButtonText("Compose Email");
      }
    } else if (buttonText === "Compose Email") {
      setButtonText("Please fill out the required fields");
    }
  }, [
    emails,
    singleEmail,
    name,
    fallbackSubjectLine,
    campaignPage,
    buttonText,
  ]);

  const updateProviders = (connectedProviders) => {
    setProviders((prevProviders) =>
      prevProviders.map((provider) => ({
        ...provider,
        connected: connectedProviders.some(
          (connectedProvider) =>
            connectedProvider.integrationId === provider.integrationId
        ),
      }))
    );
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();

      reader.onload = () => {
        const arrayBuffer = reader.result;
        const data = new Uint8Array(arrayBuffer);

        try {
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          const headers = jsonData[0].map((header) =>
            header.trim().toLowerCase()
          );

          const emailIndex = headers.findIndex((header) =>
            header.includes("email")
          );
          const firstNameIndex = headers.findIndex(
            (header) =>
              header.includes("firstName") ||
              header.includes("first-name") ||
              header.includes("firstname") ||
              header.includes("first name") ||
              header.includes("first_name")
          );
          const lastNameIndex = headers.findIndex(
            (header) =>
              header.includes("lastName") ||
              header.includes("last-name") ||
              header.includes("lastname") ||
              header.includes("last name") ||
              header.includes("last_name")
          );

          const emailList = jsonData.slice(1).map((row) => {
            const email = emailIndex >= 0 ? row[emailIndex] : "";
            const firstName = firstNameIndex >= 0 ? row[firstNameIndex] : "";
            const lastName = lastNameIndex >= 0 ? row[lastNameIndex] : "";
            return {
              email,
              firstName,
              lastName,
              name: `${firstName} ${lastName}`.trim(),
            };
          });

          setEmails(emailList);
        } catch (error) {
          console.error("Error reading Excel file:", error);
          setError(
            "There was an error processing the Excel file. Please ensure it is a valid .xlsx or .xls file."
          );
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleSendEmail = async () => {
    if (emails.length > 0 || singleEmail) {
      if (buttonText === "Prepare Content") {
        setComposeEmail(true);
        setIsComposed(true);
        setButtonText("Compose Email");
      } else if (buttonText === "Compose Email") {
        const emailData =
          emails.length > 0
            ? emails
            : [{ email: singleEmail, firstName, lastName, name }];

        try {
          setLoading(true);
          setButtonText("Send Email");

          const response = await fetch("/api/partner/getPostByEmails", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              emails: emailData,
              subjectLine: fallbackSubjectLine,
              plan: textData,
              campaignPage,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            data.results.forEach((result) => {
              setEmailSubject(result.composedEmailLine);
              setEmailBody(result.composedEmailBody);
            });
            setIsComposed(false);
          } else {
            throw new Error("Failed to prepare emails");
          }
        } catch (error) {
          console.error("Error during email preparation:", error);
          setError("Failed to prepare emails. Please try again.");
        } finally {
          setLoading(false);
        }
      } else if (buttonText === "Send Email") {
        const emailData =
          emails.length > 0
            ? emails
            : [{ email: singleEmail, firstName, lastName, name }];

        try {
          setLoading(true);
          const response = await fetch("/api/partner/getPostByEmails", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              emails: emailData,
              subjectLine: fallbackSubjectLine,
              campaignPage,
              plan: textData,
              emailBody,
            }),
          });

          if (response.ok) {
            console.log("Emails sent successfully");
            setButtonText("Email Sent");
          } else {
            throw new Error("Failed to send emails");
          }
        } catch (error) {
          console.error("Error during email send request:", error);
          setError("Failed to send emails. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    } else {
      setButtonText("Please fill out the required fields");
      setInputMessage("");
    }
  };

  const handleEditClick = () => {
    setEditedContent(true);
    setButtonText("Send Email");
  };

  const handleConnectSource = async (provider) => {
    try {
      if (!user || !user.$id) {
        throw new Error("User ID is missing. Please log in again.");
      }

      const result = await nango.auth(provider.integrationId, user.$id);

      const response = await fetch("/api/connectProvider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          integrationId: provider.integrationId,
          connectionId: result.connectionId,
          userId: user.$id,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to connect ${provider.name}: ${await response.text()}`
        );
      }

      setProviders((prevProviders) =>
        prevProviders.map((p) =>
          p.integrationId === provider.integrationId
            ? { ...p, connected: true }
            : p
        )
      );
      await fetchConnectedProviders(user.$id);
    } catch (error) {
      console.error(
        `Error in handleConnectSource for ${provider.name}:`,
        error
      );
      setError(`Error connecting to ${provider.name}: ${error.message}`);
    }
  };

  //Get emails from external sources
  const handleMoreEmail = async (e) => {
    e.preventDefault();
    const baseUrl = "/api/contact_enrichment";
    try {
      const response = await axios.post(baseUrl, { details });
      console.log("Enriched data:", response.data);
      // Handle the enriched data as needed
    } catch (error) {
      console.error("Error enriching data:", error);
    }
  };

  const handleFrequencyChange = (frequency) => {
    setAutomationFrequency(frequency);
  };

  const scheduleAutomation = useCallback(() => {
    if (automationFrequency === "none") return;

    const runCampaign = async () => {
      // Implement your campaign logic here
      await handleSendEmail();
    };

    const interval =
      automationFrequency === "twoWeeks"
        ? 14 * 24 * 60 * 60 * 1000
        : 30 * 24 * 60 * 60 * 1000;

    const timer = setInterval(runCampaign, interval);

    return () => clearInterval(timer);
  }, [automationFrequency, handleSendEmail]);

  useEffect(() => {
    const cleanup = scheduleAutomation();
    return cleanup;
  }, [scheduleAutomation]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  const scrollToTop = () => {
    if (modalRef.current) {
      modalRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={modalRef} className="max-h-[90vh] overflow-y-auto">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {emailBuild ? (
        <div className="mx-auto max-w-md sm:max-w-3xl">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-400"
              aria-hidden="true"
            />
            <h2 className="mt-2 text-base font-semibold leading-6 text-gray-900">
              Build Email list
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Launch an email campaign. Let's find some donors
            </p>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              If you have a contact list to share, please upload the file below
              OR build one below using our API
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
                  >
                    <span>
                      Upload a file{" "}
                      <span className="text-xs">(** Required)</span>
                    </span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      required
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={handleFileUpload}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  Excel files only (.xlsx, .xls)
                </p>
                {fileName && (
                  <p className="mt-2 text-sm text-gray-700">
                    Uploaded File: <strong>{fileName}</strong>
                  </p>
                )}
              </div>
            </div>
          </div>

          {emailSubject && emailBody ? (
            <div className="my-2">
              <p className="my-2 bg-slate-200 rounded-sm p-3 text-gray-500">
                Below is a preview of your AI generated campaign email
              </p>
              <p className="mb-2">{emailSubject}</p>
              <p>{emailBody}</p>
              <span className="text-xs flex cursor-pointer my-3">
                {editedContent ? (
                  <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                    <label htmlFor="editor" className="sr-only">
                      Publish post
                    </label>
                    <div className="">
                      <ReactQuill
                        value={emailBody}
                        required
                        onChange={setEmailBody}
                        modules={{
                          toolbar: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["bold", "italic", "underline"],
                            [{ align: [] }],
                            ["link", "image"],
                            ["clean"],
                          ],
                        }}
                        formats={[
                          "header",
                          "font",
                          "list",
                          "bullet",
                          "bold",
                          "italic",
                          "underline",
                          "align",
                          "link",
                          "image",
                        ]}
                        className="max-h-48 overflow-y-auto block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                        placeholder="Start your article here..."
                      />
                    </div>
                  </div>
                ) : (
                  <span
                    onClick={handleEditClick}
                    className="cursor-pointer text-sm text-red-600"
                  >
                    Edit Content
                  </span>
                )}
              </span>
            </div>
          ) : (
            <>
              {/* <div className="mt-6">
                <p className="my-2 text-sm text-gray-600">
                  Sending to a single donor?
                </p>
                <label
                  htmlFor="single-email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter Donor's email{" "}
                  <span className="text-xs">(** Required)</span>
                </label>
                <input
                  type="email"
                  id="single-email"
                  required
                  value={singleEmail}
                  onChange={(e) => setSingleEmail(e.target.value)}
                  placeholder="Enter Donor's email"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter Donor's Name{" "}
                  <span className="text-xs">(** Required)</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter single donor's name"
                  className="mt-2 px-2 block w-full rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm h-[38px]"
                />
              </div> */}
              <div className="mt-6">
                <span className="flex text-center">
                  <label
                    htmlFor="subject-line"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Subject Line
                  </label>
                  <Tooltip
                    content={
                      <div className="px-1">
                        <div className="text-sm w-3/4 lg:w-1/4 bg-slate-600 p-4 text-white font-bold">
                          Composing subject line
                        </div>
                        <div className="text-xs w-3/4 lg:w-1/4 bg-slate-600 text-white p-4 rounded-t-none rounded-b-md">
                          We use artificial intelligence to create personalized
                          email subject lines based on what recipients post on
                          social media as this helps increase open rate.
                          However, if we don't have enough information from
                          their social media posts, then we'll use this default
                          subject line.
                        </div>
                      </div>
                    }
                  >
                    <Button className="text-xs mx-2 cursor-pointer justify-center">
                      Why do I need this?
                    </Button>
                  </Tooltip>
                </span>
                <input
                  type="text"
                  required
                  id="subject-line"
                  value={fallbackSubjectLine}
                  onChange={(e) => setFallbackSubjectLine(e.target.value)}
                  placeholder="Enter a 'Fallback Subject Line'"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>
              <div className="mt-6">
                <span className="flex text-center">
                  <label
                    htmlFor="campaignPage"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Donation page
                  </label>
                </span>
                <input
                  type="text"
                  id="campaignPage"
                  required
                  value={campaignPage}
                  onChange={(e) => setCampaignPage(e.target.value)}
                  placeholder="Enter your donation webpage"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>
            </>
          )}

          <div className="mt-4 flex flex-col justify-center items-center m-auto">
            {isComposed && (
              <span className="outline-dashed outline-2 outline-offset-2 px-4 w-3/4">
                <p className="text-sm mb-2 mt-2 text-gray-600">
                  Let's employ AI to compose content for your email campaign.
                  Click 'Compose Email' button below to proceed with your
                  contact list you uploaded and/or you may use the 'Get More
                  Emails' button to find email addresses based on the Ideal
                  Profiles generated for the campaign.
                </p>
              </span>
            )}

            <div className="mt-10 mb-10">
              {/* Under Review */}
              {/* <h3 className="text-sm font-medium text-gray-500 mt-4">
                You can also connect your contact data from external sources
              </h3> */}
              <div className="flex flex-wrap gap-2">
                {providers.map((provider) => (
                  <div key={provider.integrationId} className="flex-none">
                    <Button
                      onClick={() => handleConnectSource(provider)}
                      className="flex justify-between items-center w-full"
                      disabled={provider.connected}
                    >
                      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="flex items-center">
                          <Image
                            src={provider.image}
                            alt={provider.name}
                            width={24}
                            height={24}
                            className="mr-2 h-4 w-4 shrink-0"
                          />
                          <span className="text-sm font-medium text-gray-900 dark:text-white mx-2">
                            {provider.name}
                          </span>
                        </div>
                        {provider.connected ? (
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
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="my-3">
              <CampaignAutomation onFrequencyChange={handleFrequencyChange} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mt-2 mb-2">
                Additionally, you can enrich your contact list data by using our
                API to find emails based on the generated Ideal Donor Profile.
              </h3>
            </div>
            <div className="flex justify-between px-2">
              {/* SET THIS TO COLUMN FOR SM SCREENS */}
              <div className="mx-1">
                <Button
                  type="button"
                  onClick={handleMoreEmail}
                  className="bg-red-600 text-white w-full rounded-sm hover:bg-red-500"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Get More Emails
                  <span className="text-xs flex justify-end">
                    (Additional cost)
                  </span>
                </Button>
              </div>
              <div className="mx-1">
                <Button
                  type="button"
                  onClick={handleSendEmail}
                  className="bg-red-600 text-white w-full rounded-sm hover:bg-red-500"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  {!loading && buttonText ? (
                    <>
                      {buttonText}
                      <span className="text-xs flex justify-end">
                        {inputMessage}
                      </span>
                    </>
                  ) : (
                    <div className="flex justify-center items-center">
                      <div className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full border-t-white border-red-500"></div>
                      <p className="ml-2 text-white">Processing...</p>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
          {/* <p className="fixed bottom-4 right-4 z-50">Hellooo</p> */}
        </div>
      ) : (
        <div className="mt-6 border-t border-gray-100">
          {textData.map((data, index) => (
            <div key={index} className="mt-6">
              <dl className="divide-y divide-gray-100">
                <div className="mt-6 border-t border-gray-100">
                  <div className="px-4 py-6 flex flex-col sm:px-0">
                    <p className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 whitespace-pre-line">
                      {data.assistantResponse}
                    </p>
                  </div>
                </div>
                <div className="fixed right-4 z-50">Scroll up</div>
              </dl>
              <div className="flex justify-center text-sm flex-col text-gray-600">
                <p className="mb-4">
                  Next, let's find and build an email list of donors based on
                  the ideal profile.
                </p>
                <Button
                  type="button"
                  onClick={() => setEmailBuild(true)}
                  className="build-email bg-slate-500 rounded-md mb-3 text-white w-[200px] m-auto"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Build email list{" "}
                  {!loading && textData ? (
                    textData.name
                  ) : (
                    <div className="flex justify-center items-center">
                      <div className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full border-t-white border-red-500"></div>
                      <p className="ml-2 text-white">Processing...</p>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={scrollToTop}
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
        >
          <Icon path={mdiArrowUpBoldBox} size={1} />
        </button>
      </div>
    </div>
  );
};

export default Plan;
