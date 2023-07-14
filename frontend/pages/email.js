import { useState, useEffect } from "react";
import BrevoConversations from "../components/chatWdiget";

export default function Email() {
  const [template, setTemplate] = useState(null);
  const [conversations, setConversations] = useState(null);

  useEffect(() => {
    const sendEmailFunction = async () => {
      try {
        // Fetch the email template
        const templateResponse = await fetchEmailTemplate();
        const templateData = await templateResponse.json();
        const template = templateData.template;

        // Prepare the payload for sending the email
        const emailPayload = {
          sender: {
            email: "support@forgedmart.com",
            name: "ForgedMart",
          },
          subject: "Thank you for testing this tool",
          templateId: 6, // Replace with the desired template ID
          params: {
            title: "This is my default greeting",
            headline: "This is my default headline",
            chatWidget: `<div>${BrevoConversations()}</div>`, // Include the chat widget in the email template
          },
          messageVersions: [
            {
              to: [
                {
                  email: "chrisb@publictrades.com",
                  name: "Chris Boy",
                },
              ],
              params: {
                title: "Product Template",
              },
              subject: "Thank you for testing this tool",
            },
          ],
        };

        // Call BrevoConversations and get the conversations payload
        const conversationsPayload = await fetchConversationsPayload();

        // Merge the conversations payload with the email payload
        const finalPayload = {
          ...emailPayload,
          conversations: conversationsPayload,
        };

        // Send the email with the merged payload
        await sendEmailRequest(finalPayload);

        // Set the template and conversations states
        setTemplate(template);
        setConversations(conversationsPayload);
      } catch (error) {
        console.log("error", error);
      }
    };

    sendEmailFunction();
  }, []);

  const fetchEmailTemplate = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append(
      "api-key",
      "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"
    );

    const raw = JSON.stringify({
      sender: {
        email: "support@forgedmart.com",
        name: "ForgedMart",
      },
      subject: "Thank you for testing this tool",
      templateId: 6, // Replace with the desired template ID
      params: {
        title: "This is my default greeting",
        headline: "This is my default headline",
        chatWidget: `<div>${BrevoConversations()}</div>`, // Include the chat widget in the email template
      },
      messageVersions: [
        {
          to: [
            {
              email: "chrisbitoy@gmail.com",
              name: "Chris Boy",
            },
          ],
          params: {
            title: "Product Template",
          },
          subject: "Thank you for testing this tool",
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      requestOptions
    );
    return response;
  };

  const fetchConversationsPayload = async () => {
    // Fetch the conversations payload using the BrevoConversations component
    // Replace this with your own implementation or API call
    const conversationsPayload = await new Promise((resolve, reject) => {
      // Simulate fetching conversations payload (replace with your own implementation)
      setTimeout(() => {
        resolve({ conversation: "This is the conversations payload" });
      }, 2000);
    });

    return conversationsPayload;
  };

    const sendEmailRequest = async (payload) => {
    // Replace this URL with the correct endpoint to send the email
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
    };

    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      requestOptions
    );
    const result = await response.text();
    console.log(result);
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-2/3 m-10 min-h-fit overflow-hidden py-24 sm:py-32">
      {/* Email body */}
      <div id="content" className="col-span-2">
        {template}
      </div>

      <div>{conversations && <BrevoConversations />}</div>
    </div>
  );
}
