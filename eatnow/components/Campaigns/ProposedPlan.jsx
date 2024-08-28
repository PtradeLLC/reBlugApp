import { useState, useEffect } from "react";
import { PlusIcon, PhotoIcon } from "@heroicons/react/20/solid";
import { Tooltip, Button, button } from "@nextui-org/react";
import * as XLSX from "xlsx";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

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

  const providers = [
    {
      name: "Google Drive",
      imageUrl: "/images/google_drive.png",
    },
    {
      name: "Google Sheets",
      imageUrl: "/images/google-sheets.png",
    },
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);

      const emailList = json.map((row) => {
        const firstName =
          row.Firstname ||
          row.firstName ||
          row.first_name ||
          row.firstname ||
          "";
        const lastName =
          row.Lastname || row.lastName || row.last_name || row.lastname || "";
        const fileName = row.name || name || `${firstName} ${lastName}`.trim();

        return { email: row.Email, firstName, lastName, name: fileName };
      });

      setEmails(emailList);
    };
    reader.readAsArrayBuffer(file);
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
          setLoading(true); // Set loading to true before the async operation
          setButtonText("Send Email");

          const response = await fetch("/api/partner/getPostByEmails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              emails: emailData,
              subjectLine: fallbackSubjectLine,
              plan: textData,
              campaignPage,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Emails prepared successfully");

            data.results.forEach((result) => {
              setEmailSubject(result.composedEmailLine);
              setEmailBody(result.composedEmailBody);
            });

            setIsComposed(false);
          } else {
            console.error("Failed to prepare emails");
          }
        } catch (error) {
          console.error("Error during email preparation:", error);
        } finally {
          setLoading(false); // Set loading to false after the async operation
        }
      } else if (buttonText === "Send Email") {
        const emailData =
          emails.length > 0
            ? emails
            : [{ email: singleEmail, firstName, lastName, name }];

        try {
          setLoading(true); // Set loading to true before the async operation
          const response = await fetch("/api/partner/getPostByEmails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
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
            console.error("Failed to send emails");
          }
        } catch (error) {
          console.error("Error during email send request:", error);
        } finally {
          setLoading(false); // Ensure loading is false after the operation
        }
      }
    }
  };

  // const handleSendEmail = async () => {
  //   if (emails.length > 0 || singleEmail) {
  //     if (buttonText === "Prepare Content") {
  //       setComposeEmail(true);
  //       setIsComposed(true);
  //       setButtonText("Compose Email");
  //     } else if (buttonText === "Compose Email") {
  //       const emailData =
  //         emails.length > 0
  //           ? emails
  //           : [{ email: singleEmail, firstName, lastName, name }];

  //       try {
  //         setLoading(true);
  //         setButtonText("Send Email");

  //         const response = await fetch("/api/partner/getPostByEmails", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             emails: emailData,
  //             subjectLine: fallbackSubjectLine,
  //             plan: textData,
  //             campaignPage,
  //           }),
  //         });

  //         if (response.ok) {
  //           const data = await response.json();
  //           console.log("Emails prepared successfully");

  //           data.results.forEach((result) => {
  //             setEmailSubject(result.composedEmailLine);
  //             setEmailBody(result.composedEmailBody);
  //           });

  //           setIsComposed(false);
  //         } else {
  //           console.error("Failed to prepare emails");
  //         }
  //       } catch (error) {
  //         console.error("Error during email preparation:", error);
  //       }
  //     } else if (buttonText === "Send Email") {
  //       const emailData =
  //         emails.length > 0
  //           ? emails
  //           : [{ email: singleEmail, firstName, lastName, name }];

  //       try {
  //         const response = await fetch("/api/partner/getPostByEmails", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             emails: emailData,
  //             subjectLine: fallbackSubjectLine,
  //             campaignPage,
  //             plan: textData,
  //             emailBody,
  //           }),
  //         });

  //         if (response.ok) {
  //           console.log("Emails sent successfully");
  //           setButtonText("Email Sent");
  //         } else {
  //           console.error("Failed to send emails");
  //         }
  //       } catch (error) {
  //         console.error("Error during email send request:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   }
  // };

  const handleEditClick = () => {
    setEditedContent(true);
    setButtonText("Send Email");
  };
  // Function to connect to external sources (e.g., Salesforce, Google Drive)
  const handleConnectSource = (source) => {
    // Logic to connect to the source and fetch emails
  };

  return (
    <>
      {emailBuild ? (
        <div className="mx-auto max-w-md sm:max-w-3xl">
          <div className="text-center">
            <PhotoIcon
              aria-hidden="true"
              className="mx-auto h-12 w-12 text-gray-400"
            />
            <h2 className="mt-2 text-base font-semibold leading-6 text-gray-900">
              Build Email list
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Launch an email campaign. Let's find some donors
            </p>
          </div>

          {/* File Upload Section */}
          <div className="col-span-full">
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              If you already have contact list, please upload the file below OR
              build one below using our API
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  aria-hidden="true"
                  className="mx-auto h-12 w-12 text-gray-300"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
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
              </div>
            </div>
          </div>

          {/* Single Email Input Section */}
          <div className="mt-6">
            <p className="my-2 text-sm text-gray-600">
              Sending to a single donor?
            </p>
            <label
              htmlFor="single-email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Enter Donor's email
            </label>
            <input
              type="email"
              id="single-email"
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
              Enter Donor's Name
            </label>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter single donor's name"
              className="mt-2 px-2 block w-full rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm h-[38px]"
            />
          </div>
          {emailSubject && emailBody ? (
            <div className="my-2">
              <p className="my-2 bg-slate-200 rounded-sm p-3 text-gray-500">
                Below is a preview of your AI generated campaign email{" "}
              </p>
              <p className="mb-2">{emailSubject} </p>
              <p>{emailBody}</p>
              <span className="text-xs flex cursor-pointer my-3">
                {editedContent ? (
                  <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                    <label htmlFor="editor" className="sr-only">
                      Publish post
                    </label>
                    <div className="">
                      <ReactQuill
                        value={emailBody} // Display the current email body in the editor
                        onChange={setEmailBody} // Update the email body as the user edits
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
                        required
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
            singleEmail && (
              <>
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
                            We use artificial intelligence to create
                            personalized email subject lines based on what you
                            post on social media. This helps your emails get
                            opened more often. If we don't have enough
                            information from your social media, we'll use a
                            default subject line.
                          </div>
                        </div>
                      }
                    >
                      <Button className="text-xs mx-2 cursor-pointer justify-center">
                        Why I need this
                      </Button>
                    </Tooltip>
                  </span>
                  <input
                    type="text"
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
                    value={campaignPage}
                    onChange={(e) => setCampaignPage(e.target.value)}
                    placeholder="Enter your donation webpage'"
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                </div>
              </>
            )
          )}

          <div className="mt-4 w-72 flex flex-col justify-center items-center m-auto">
            {isComposed ? (
              <>
                <p className="text-sm mb-2 mt-2 text-gray-700">
                  Employ AI to compose content for your campaign. Click button
                  below to proceed.
                </p>
              </>
            ) : (
              ""
            )}
            {/* <Button
              type="button"
              onClick={handleSendEmail}
              className="bg-red-600 text-white w-full rounded-sm hover:bg-red-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              {buttonText}
            </Button> */}
            <Button
              type="button"
              onClick={handleSendEmail}
              className="bg-red-600 text-white w-full rounded-sm hover:bg-red-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              {!loading && buttonText ? (
                buttonText
              ) : (
                <div className="flex justify-center items-center">
                  <div className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full border-t-white border-red-500"></div>
                  <p className="ml-2 text-white">Processing...</p>
                </div>
              )}
            </Button>
          </div>

          {/* External Sources Section */}
          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-500">
              Connect Email Sources
            </h3>
            <ul
              role="list"
              className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {providers.map((source, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleConnectSource(source)}
                    className="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <span className="flex min-w-0 flex-1 items-center space-x-3">
                      <span className="block flex-shrink-0">
                        <img
                          alt={source.name}
                          src={source.imageUrl}
                          className="h-10 w-10 rounded-full"
                        />
                      </span>
                      <span className="block truncate text-sm font-medium text-gray-900">
                        {source.name}
                      </span>
                    </span>
                    <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center">
                      <PlusIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
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
    </>
  );
};

export default Plan;
