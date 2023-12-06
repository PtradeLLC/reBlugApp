import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const session = await getServerSession(req, res, authOptions);
        const managerEmail = session?.user?.email;

        if (!managerEmail || !session) {
            throw new Error('There is no session or email');
        }

        if (req.method === 'GET') {
            const userPromise = prisma.user.findUnique({
                where: {
                    email: managerEmail,
                },
                include: {
                    Team: true,
                },
            });

            const [user, team] = await Promise.all([userPromise, userPromise.Team]);

            if (user && team) {
                res.status(200).json({ message: 'Successful', user, team });
            } else {
                res.status(404).json({ message: 'Team not found for the manager' });
            }
        } else {
            console.log("Request not valid");
            res.status(400).json({ message: 'Invalid request method' });
        }
    } catch (error) {
        console.error('Error in API route:', error);

        // Additional logging for Prisma promises
        if (error instanceof PrismaClient.Prisma.PrismaClientUnknownRequestError) {
            console.error('Prisma error details:', {
                error: error,
                clientVersion: prisma.$clientVersion,
            });
        }

        res.status(500).json({ message: `There is an error: ${error.message || error}` });
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma Client after the query
    }
}