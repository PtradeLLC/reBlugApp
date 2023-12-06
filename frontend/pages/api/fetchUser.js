import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();
export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)

    if (session) {
        const { email } = session?.user;
        try {
            const user = await prisma.user.findUnique({
                where: { email },
            });
            res.status(200).json({ message: `${user}` });
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ message: `There is an error ${error.message || 'unknown'}` });
        }
    } else {
        console.log("Session not found on the server side");
    }
}
