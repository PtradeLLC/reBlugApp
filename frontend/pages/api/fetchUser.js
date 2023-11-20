import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { error } from 'console';


const prisma = new PrismaClient().$extends(withAccelerate());

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)

    if (session) {
        const { email } = session?.user;
        try {
            const user = await prisma.user.findUnique({
                where: { email },
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
