import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    const managerEmail = session.user.email;

    if (!managerEmail || !session) {
        throw new Error('There is no session or email');
    }

    if (req.method === 'GET') {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: managerEmail,
                },
                include: {
                    Team: true,
                },
            });

            console.log(prisma.$queryRaw`SELECT * FROM "User" WHERE ...`);

            if (user && user.Team) {
                res.status(200).json({ message: 'Successful', user, team: user.Team });
            } else {
                res.status(404).json({ message: 'Team not found for the manager' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: `There is an error: ${error.message || error}` });
        }
    } else {
        console.log("Request not valid");
    }
}
