import prisma from "../../lib/db";
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    try {
        const { email, verification } = req.body;
        const lowercaseEmail = email.toLowerCase();

        if (!email || !verification.trim()) {
            return res.status(400).json({ message: 'An entry is missing' });
        };

        if (req.method === 'POST') {
            // Look for an existing user with verified status
            const existingUser = await prisma.user.findFirst({
                where: {
                    email: lowercaseEmail,
                    verificationTokens: {
                        some: {
                            token: verification.trim(),
                        },
                    },
                },
                include: {
                    verificationTokens: true,
                },
            });

            // Getting User Tokens
            const userTokens = existingUser?.verificationTokens?.map((item) => item.token) || [];

            if (!userTokens.includes(verification.trim())) {
                return res.status(200).json({
                    user: existingUser,
                    message: 'Please enter a valid Verification code',
                });
            } else {
                try {
                    if (existingUser && existingUser.isVerified === false) {
                        const verifiedUser = await prisma.user.update({
                            where: {
                                email: lowercaseEmail,
                            },
                            data: {
                                isVerified: true,
                            },
                        });

                        return res.status(200).json({
                            user: verifiedUser,
                            message: 'User is verified',
                            redirect: '/dashboard',
                        });
                    } else if (existingUser && existingUser.isVerified === false) {
                        // User with Invalid token and NOT Verified
                        return res.status(200).json({
                            user: existingUser,
                            message: "You do not have the correct credentials",
                            redirect: '/api/auth/signout',
                        });
                    }
                } catch (error) {
                    console.error('Error updating user verification status:', error);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
            }

            return res.status(200).json({
                message: 'User is not verified',
                redirect: '/api/auth/signin',
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'There is an error' });
    } finally {
        await prisma.$disconnect();
    }
}
