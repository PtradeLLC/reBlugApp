import sgMail from "@sendgrid/mail";
import Email from "../emailfiles/new-user";
import { render } from "@react-email/render";

export async function sendNewEmail({ firstName, token, email }) {
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
        await sgMail.send(msg);
        console.log("MSG FROM newUser:", msg, "token:", token, "email:", email);
    } catch (error) {
        console.log("MSG FROM newUser-Error:", msg, "token:", token, "email:", email);
        console.error("Error sending email:", error);
        if (error.response) {
            console.error("SendGrid API response:", error.response.body);
        }
    }
}
