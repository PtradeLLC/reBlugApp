import { PrismaClient } from '@prisma/client';
import { resolve } from 'url';

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
        // Find the team member with the given token
        const teamMember = await prisma.teamMember.findFirst({
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

        if (!teamMember) {
            return res.status(400).json({ error: 'Token is invalid or expired.' });
        }

        // Check if the team member is already verified
        if (teamMember.isVerified !== null && !teamMember.isVerified) {
            await prisma.teamMember.update({
                where: {
                    id: teamMember.id,
                },
                data: {
                    isVerified: true,
                },
            });
        }

        // Check if verificationTokens is defined and activatedAt is not set
        if (
            teamMember.verificationTokens !== undefined &&
            teamMember.verificationTokens.some((t) => t.token === token && t.activatedAt === null)
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

        // Return the relevant information for the login
        const loginResponse = {
            teamMemberId: teamMember.id,
            // Include any other relevant information you want to return
        };

        return res.status(200).json({ user: loginResponse, message: 'Login successful.' });
    } catch (error) {
        console.error('Error during verification:', error);
        return res.status(500).json({
            error: `An error occurred during verification: ${error.message || error}`,
        });
    } finally {
        await prisma.$disconnect();
    }
}
