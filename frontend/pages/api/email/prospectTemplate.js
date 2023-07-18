import sgMail from "@sendgrid/mail";

export async function sendEmail(emailTemplate) {
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

  const msg = {
    to: "chrisbitoy@gmail.com", // Change to your recipient
    from: "support@forgedmart.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: emailTemplate,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
}
