import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();
export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)

    if (session) {
        const { email } = session?.user;
        const name = session.user.name;
        const full_name = name.split(' ');
        const first_name = full_name[0];
        const last_name = full_name[1];

        try {
            // Directly create the user using the email from the session
            const user = await prisma.user.upsert({
                where: { email },
                update: {
                    firstName: first_name,
                    lastName: last_name,
                },
                create: {
                    email,
                    firstName: first_name,
                    lastName: last_name,
                },
            });

            res.status(200).json(user);
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ message: `There is an error ${error.message || 'unknown'}` });
        }
    } else {
        console.log("Session not found on the server side");
    }
}
