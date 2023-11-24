import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { sendNewEmail } from "../email/newUser";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        {
            id: process.env.SENDGRID_ACCOUNT_ID,
            type: 'email',
            async sendVerificationRequest({ identifier: email, url }) {
                // Extract the verificationToken from the URL
                const verificationToken = url.includes("?token=") ? url.split("?token=")[1] : null;

                // Include the verificationToken in the email template
                const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
                    body: JSON.stringify(sendNewEmail({ firstName: 'John', verificationToken })),
                    headers: {
                        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                });

                if (!response.ok) {
                    const { errors } = await response.json();
                    throw new Error(JSON.stringify(errors));
                }
            },
        },
    ],
};