import prisma from "../../lib/db";
import { randomUUID } from 'crypto';
import SendMemberInvite from './email/membersInvite';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    try {
        const session = await getServerSession(req, res, authOptions);
        const managerEmail = session.user.email;
        const managerName = session.user.name;

        if (req.method !== "POST") {
            return res.status(405).json({ success: false, error: 'Method not allowed' });
        }

        if (!req.body || !Array.isArray(req.body.emails) || req.body.emails.length === 0) {
            return res.status(400).json({ error: 'Invalid input: emails must be an array with at least one email address.' });
        }

        const createdUsers = [];

        const manager = await prisma.user.findUnique({
            where: {
                email: managerEmail,
            },
            include: {
                team: {
                    select: {
                        id: true,
                        name: true,
                        firstName: true,
                        lastName: true,
                        password: true,
                    },
                },
            },
        });

        const firstName = manager.firstName;
        const lastName = manager.lastName;

        for (const emailObj of req.body.emails) {

            try {
                if (!emailObj || !emailObj.email) {
                    console.error('Invalid email object:', emailObj);
                    continue; // Skip to the next email
                }

                // Generate a unique password for each team member
                const password = generateRandomString(9);

                // Check if the user already exists
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: emailObj.email,
                    },
                });

                if (!existingUser) {
                    // Create a new user entry
                    const emailData = await prisma.team.create({
                        data: {
                            email: emailObj.email,
                            isVerified: false,
                            password: password,
                            member: {
                                connect: { email: managerEmail },
                            },
                        },
                    });
                    createdUsers.push({ ...emailData, password });
                } else {
                    console.log(`User with email ${emailObj.email} already exists.`);
                }

                // Generate a unique token for the user
                const token = randomUUID();

                // Update user's verification tokens by creating a new token entry
                await prisma.user.update({
                    where: {
                        email: emailObj.email,
                    },
                    data: {
                        verificationTokens: {
                            create: {
                                token: token,
                                expires: new Date(),
                            },
                        },
                    },
                });

                // Send verification email
                await SendMemberInvite({ emailObj, token, manager, firstName, lastName, password });

            } catch (error) {
                console.error('Error processing email:', emailObj.email, 'Error:', error);
            }
        }
        return res.status(200).json({ success: true, createdUsers });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

function generateRandomString(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset.charAt(randomIndex);
    }

    return result;
}
