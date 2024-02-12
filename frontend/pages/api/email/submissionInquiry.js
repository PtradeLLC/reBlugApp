import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import sgMail from "@sendgrid/mail";
import { render } from "@react-email/render";
import SubmissionTemplate from '../emailfiles/submissionTemplate';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    try {
        if (req.method === 'POST') {
            const submission = req.body;

            const fullName = submission.fullName;
            const description = submission.description;

            // Retrieve user session
            const session = await getServerSession(req, res);
            const userEmail = session.user.email;

            // Render email template
            const emailHtml = render(<SubmissionTemplate fullName={fullName} description={description} firstName={firstName} />, { pretty: true });

            // Create email message
            const msg = {
                to: userEmail,
                from: "support@forgedmart.com",
                subject: `ForgedMart just landed you a sponsorship request`,
                html: emailHtml,
            };

            // Send email using SendGrid
            await sgMail.send(msg);

            // Respond with success
            res.status(200).json({ success: true });
        } else {
            res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
