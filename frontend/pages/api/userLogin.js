import prisma from "../../lib/db";
import { authOptions } from "./auth/[...nextauth]";


export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    if (req.method === "POST") {
        try {
            const { email } = req.body;

            await prisma.user.create({
                data: {
                    email: email,
                },
            });

            const redirectUrl = "https://reblug.com/dashboard"

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








































