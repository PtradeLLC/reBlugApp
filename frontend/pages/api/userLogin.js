import { PrismaClient } from "@prisma/client";
import { MailerSend } from "mailersend";
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)

    if (req.method === "POST") {
        try {
            const { email } = req.body;

            console.log("from userLogin", session);

            await prisma.user.create({
                data: {
                    email: email,
                },
            });

            const sender = new MailerSend({
                apiKey: process.env.MAILERSEND_API_KEY,
            });

            const redirectUrl = "https://forgedmart.com/dashboard"

            const emailParams = {
                to: [{ email: email }],
                subject: "Confirmation Email",
                text: `Hi, please confirm your email by clicking on the link below. ${redirectUrl}`,
                "html": `<b> Hi, please confirm your email by clicking on the link: ${redirectUrl}</b>`,
                from: {
                    name: "✨ForgedMart Support",
                    email: "support@forgedmart.com",
                },
            };
            const response = await sender.email.send(emailParams);
            if (response.status === 200) {
                res.status(201).json({ message: "User created" })
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message || "Internal server error" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}








































