import sgMail from "@sendgrid/mail";
import Email from "../emailfiles/new-user";
import { render } from "@react-email/render";
import { getSession } from "next-auth/react";

export default async function SendNewEmail(req, res, { firstName, token, email, userId, provider }) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    console.log('SESSION FROM EMAIL', session);


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


