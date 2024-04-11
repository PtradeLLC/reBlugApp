import sgMail from "@sendgrid/mail";
import Email from "../emailfiles/new-user";
import { render } from "@react-email/render";
import { getSession } from "next-auth/react";
import { Resend } from 'resend';

export default async function SendNewEmail({ firstName, token, email, userId, provider }) {

    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailHtml = render(
        <Email firstName={firstName} token={token} />
    );

    // const msg = {
    //     to: [email], // Change to your recipient
    //     from: "reBlug <support@reblug.com>",
    //     subject: "🎉 Welcome to reBlug✨",
    //     react: emailHtml,
    // };

    try {
        const { data, error } = await resend.emails.send({
            from: 'support@reblug.com',
            to: { email },
            subject: "🎉 Welcome to reBlug✨",
            react: Email({ firstName, token, email, userId, provider }),
        });

        if (error) {
            res.status(400).json({ error });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Error sending email:", error);
        if (error.response) {
            console.error("API response:", error.response.body);
        }
    }
}


