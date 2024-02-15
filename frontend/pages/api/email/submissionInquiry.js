import { PrismaClient } from '@prisma/client';
import sgMail from "@sendgrid/mail";
import { render } from "@react-email/render";
import SubmissionTemplate from '../emailfiles/submissionTemplate';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    try {
        if (req.method === 'POST') {
            const { submission, userEmail, firstName } = req.body;

            // Render email template
            const emailHtml = render(
                <SubmissionTemplate
                    fullName={submission.fullName}
                    description={submission.description}
                    firstName={firstName}
                    email={submission.email}
                    website={submission.website}
                />,
                { pretty: true }
            );

            const msg = {
                to: userEmail,
                from: "support@forgedmart.com",
                subject: `ForgedMart just landed you request for sponsorship `,
                html: emailHtml,
            };

            // Send email using SendGrid
            await sgMail.send(msg);

            const newSubmission = await prisma.submission.create({
                data: {
                    fullName: submission.fullName,
                    description: submission.description,
                    email: submission.email,
                    website: submission.website,
                },
            });

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