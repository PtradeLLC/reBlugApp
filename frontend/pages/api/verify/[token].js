import { PrismaClient } from '@prisma/client';
import { resolve } from 'url';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { token } = req.query;
    console.log('Token from token:', token);

    if (!token) {
        console.log('No tokenfrom token');
        return res.status(400).json({ error: 'Invalid parameters. Token is missing.' });
    }

    try {
        // Find the team member with the given token
        const teamMember = await prisma.team.findFirst({
            where: {
                VerificationTokens: {
                    some: {
                        AND: [
                            {
                                activatedAt: null,
                            },
                            {
                                createdAt: {
                                    gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
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
            console.log('Token not found or expired.'); // Add this line for debugging
            return res.status(400).json({ error: 'Team member does not exist.' });
        }

        // Check if the team member is already verified
        if (teamMember.isVerified !== false && !teamMember.isVerified) {
            await prisma.team.update({
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
            teamMember.VerificationTokens !== undefined &&
            teamMember.VerificationTokens.some((t) => t.token === token && t.activatedAt === null)
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

        // Return the relevant information for the login, including the generated password
        const loginResponse = {
            teamMemberId: teamMember.id,
            password: teamMember.password, // Assuming the password is stored in the 'team' table
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
