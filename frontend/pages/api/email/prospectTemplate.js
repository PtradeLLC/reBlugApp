import sgMail from "@sendgrid/mail";
import { Email } from "../emailfiles/react-email";
import { render } from "@react-email/render";

export async function sendEmail() {
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

  const emailHtml = render(Email({ url: "www.forgedmart.com" }));

  const msg = {
    to: "chrisbitoy@gmail.com", // Change to your recipient
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
