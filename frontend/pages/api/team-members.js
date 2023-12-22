
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import SendMemberInvite from './email/membersInvite';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]"


const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const session = await getServerSession(req, res, authOptions);
        const managerEmail = session.user.email;
        const managerName = session.user.name;

        if (req.method !== "POST") {
            throw new Error('Invalid HTTP method');
        };

        if (req.method === "POST") {
            try {
                const usersData = req.body;
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

                const emails = usersData.emails.map((email) => email.trim());

                for (const email of emails) {
                    try {
                        if (!email) {
                            console.error('Email is required for user:', email);
                            return res.status(400).json({ message: "email is required" });
                        }

                        const existingUser = await prisma.user.findUnique({
                            where: {
                                email: email,
                            },
                        });

                        if (!existingUser) {
                            const existingTeamEntry = await prisma.team.findUnique({
                                where: {
                                    email: email,
                                },
                            });

                            if (existingTeamEntry) {
                                res.status(200).json({
                                    message: `User found. Already exists on this team. ${existingTeamEntry.email}`,
                                    existingTeamEntry,
                                });
                            } else {
                                const emailData = await prisma.team.create({
                                    data: {
                                        email: email,
                                        isVerified: false,
                                        member: {
                                            connect: { email: managerEmail },
                                        },
                                    },
                                });

                                createdUsers.push(emailData);
                            }
                        } else {
                            const userOnTeam = await prisma.team.findFirst({
                                where: {
                                    member: {
                                        id: existingUser.id,
                                    },
                                },
                            });

                            if (!userOnTeam) {
                                // Create a new record in the team table associated with the user
                                const emailData = await prisma.team.create({
                                    data: {
                                        email: email,
                                        isVerified: false,
                                        member: {
                                            connect: { email: managerEmail },
                                        },
                                    },
                                });

                                createdUsers.push(emailData);
                            }
                        }

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
                            const expires = new Date();
                            expires.setHours(expires.getHours() + 1);
                            const token = await prisma.verificationToken.create({
                                data: {
                                    token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
                                    email: email,
                                    userId: manager.id,
                                    expires: expires,
                                },
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

                return res.status(200).json({ success: true, createdUsers });
            } catch (error) {
                console.error('Error processing request:', error);
                res.status(400).json({ success: false, error: 'Invalid request data' });
            }
        } else {
            res.status(405).json({ success: false, error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}