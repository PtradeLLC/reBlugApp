import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import SendMemberInvite from './email/membersInvite';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]"

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    const managerEmail = session.user.email;
    const managerName = session.user.name;

    // Check if the request method is POST
    if (req.method !== "POST") {
        throw new Error('Invalid HTTP method');
    };

    if (req.method === "POST") {
        try {
            // Extract the user data from the request body
            const usersData = req.body;
            // Check if user data is provided
            if (!usersData || !Array.isArray(usersData.emails)) {
                return res.status(400).json({ message: "Invalid user data" });
            }

            const createdUsers = [];

            const manager = await prisma.user.findUnique({
                where: {
                    email: managerEmail,
                },
                include: {
                    Team: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });

            const firstName = manager.firstName;
            const lastName = manager.lastName;

            // Extract the array of emails
            const emails = usersData.emails.map((email) => email.trim());

            for (const email of emails) {
                try {
                    // Check if email is provided
                    if (!email) {
                        console.error('Email is required for user:', email);
                        return res.status(400).json({ message: "email is required" });
                    }

                    // Check if member exists
                    const eData = await prisma.user.findMany({
                        where: {
                            email: {
                                contains: email,
                            },
                        },
                    });

                    if (eData.length === 0) {
                        // Check if a team entry with the same email already exists
                        const existingTeamEntry = await prisma.team.findUnique({
                            where: {
                                email: email,
                            },
                        });

                        if (existingTeamEntry) {
                            res.status(200).json({ message: `User found. Already exists on this team. ${existingTeamEntry.email}`, existingTeamEntry },)
                        } else {
                            // Create a new record in the team table associated with the user
                            const emailData = await prisma.team.create({
                                data: {
                                    email: email,
                                    isVerified: false,
                                    member: {
                                        connect: { email: managerEmail }
                                    }
                                }
                            });

                            // Add the created team entry to the list
                            createdUsers.push(emailData);

                        }
                    } else {
                        console.log("User already existed");
                    }

                    // Check if a verification token already exists for the given email
                    const existingToken = await prisma.verificationToken.findFirst({
                        where: {
                            email: email,
                        },
                    });

                    if (existingToken) {
                        const expires = new Date();
                        expires.setHours(expires.getHours() + 1);

                        await prisma.verificationToken.update({
                            where: {
                                id: existingToken.id,
                            },
                            data: {
                                token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
                                expires: expires,
                            },
                        });
                    } else {
                        // Create a new verification token
                        const expires = new Date();
                        expires.setHours(expires.getHours() + 1);
                        const token = await prisma.verificationToken.create({
                            data: {
                                token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
                                email: email,
                                userId: manager.id,
                                expires: expires,
                            }
                        });

                        if (token) {
                            await SendMemberInvite({ email, token: token.token, manager, createdUsers, firstName, lastName });
                        } else {
                            console.log('No token was generated');
                        }
                    }
                } catch (error) {
                    console.error('Error processing email:', email, 'Error:', error);
                    return res.status(500).json({ message: "Failed to process email" });
                };
            }

            // Respond with the created users after processing all emails
            return res.status(200).json({ success: true, createdUsers });
        } catch (error) {
            console.error('Error processing request:', error);
            res.status(400).json({ success: false, error: 'Invalid request data' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}
