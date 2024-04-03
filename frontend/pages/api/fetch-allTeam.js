import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default async function handler(req, res) {
    try {
        const session = await getServerSession(req, res, authOptions);

        if (!session || !session.user?.email) {
            // Return a 401 Unauthorized response if the user is not authenticated
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const managerEmail = session.user.email;

        if (req.method === 'GET') {
            const user = await prisma.user.findUnique({
                where: {
                    email: managerEmail,
                },
                include: {
                    team: {
                        select: {
                            id: true,
                            email: true,
                            isVerified: true,
                        },
                    }
                },
            });

            if (user) {
                if (user.team) {
                    console.log("User hasteams");
                } else {
                    console.log("User does not have a team");
                }
                return res.status(200).json({ message: 'Successful', team: user.team });
            } else {
                console.log("User not found");
                return res.status(404).json({ message: 'Team not found for the manager' });
            }
        } else {
            console.log("Request not valid");
            return res.status(400).json({ message: 'Invalid request method' });
        }
    } catch (error) {
        console.error('Error in API route:', error);

        // Log Prisma error details
        console.error('Prisma error details:', {
            error: error,
            clientVersion: prisma.$clientVersion,
        });

        return res.status(500).json({ message: `There is an error: ${error.message || error}` });
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma Client after the query
    }
}
