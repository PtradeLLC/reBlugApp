import sgMail from "@sendgrid/mail";
import Email from "../emailfiles/new-user";
import { render } from "@react-email/render";

export default async function SendNewEmail({ firstName, token, email, userId }) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Render the Email component with ChatComponent prop set to the Chat component
    const emailHtml = render(
        <Email firstName={firstName} token={token} />
    );

    const msg = {
        to: email, // Change to your recipient
        from: "support@forgedmart.com", // Change to your verified sender
        subject: "🎉 Welcome to ForgedMart✨",
        html: emailHtml,
    };

    try {

        if (msg) {
            await sgMail.send(msg);
        }
    } catch (error) {
        console.error("Error sending email:", error);
        if (error.response) {
            console.error("API response:", error.response.body);
        }
    }
}


