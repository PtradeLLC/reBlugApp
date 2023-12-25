import { PrismaClient } from '@prisma/client';
import { resolve } from 'url';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ error: 'Invalid parameters. Token is missing.' });
    }

    try {
        // if User already exists (including unverified emails)
        const existingUser = await prisma.user.findFirst({
            where: {
                id: user.email,
                OR: [
                    { isVerified: true },
                    { VerificationTokens: { some: { activatedAt: null } } },
                ],
            },
            select: {
                password: true,
            }
        });

        if (existingUser) {
            // User already exists, log them in
            if (!existingUser.isVerified && existingUser.verificationToken) {
                // If the user is not verified but has a verification token, update the isVerified field
                await prisma.user.update({
                    where: { id: existingUser.id },
                    data: { isVerified: true },
                });
            }
            return res.status(200).json({ user: existingUser, message: "User already exists, please login." });
        };

        if (user.isVerified !== null && !user.isVerified) {
            const temporaryPassword = '';


        }


        const user = await prisma.user.findFirst({
            where: {
                VerificationTokens: {
                    some: {
                        AND: [
                            {
                                activatedAt: null,
                            },
                            {
                                createdAt: {
                                    gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
                                },
                            },
                            {
                                token,
                            },
                        ],
                    },
                },
            },
        });

        if (!user) {
            return res.status(400).json({ error: 'Token is invalid or expired.' });
        }

        // Check if the user is already verified
        if (user.isVerified !== null && !user.isVerified) {
            await prisma.user.update({
                where: {
                    id: user.email,
                },
                data: {
                    isVerified: true,
                    isActive: true,
                    password: true,
                },
            });
        }

        // Check if verificationTokens is defined and activatedAt is not set
        if (
            user.verificationTokens !== undefined &&
            user.verificationTokens.some((t) => t.token === token && t.activatedAt === null)
        ) {
            await prisma.verificationToken.update({
                where: {
                    token,
                },
                data: {
                    activatedAt: new Date(),
                },
            });
        }

        const absoluteRedirectUrl = resolve(req.headers.host, '/api/auth/signin');
        res.redirect(absoluteRedirectUrl);
    } catch (error) {
        console.error('Error during verification:', error);
        return res.status(500).json({ error: `An error occurred during verification: ${error.message || error}` });
    } finally {
        await prisma.$disconnect();
    }
}