import sgMail from "@sendgrid/mail";
import { Email } from "../emailfiles/react-email";
import { render } from "@react-email/render";
import { Chat } from "../../../components/Chat"; // Update the import path to the correct location

export async function sendEmail(messages, input, loading) {
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

  // Render the Email component with ChatComponent prop set to the Chat component
  const emailHtml = render(
    <Email
      messages={messages}
      input={input}
      loading={loading}
      ChatComponent={Chat}
    />
  );

  const msg = {
    to: "ins-qnc1xlog@isnotspam.com", // Change to your recipient
    from: "support@forgedmart.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: emailHtml,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
}
