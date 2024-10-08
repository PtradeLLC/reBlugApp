import prisma from "../../../lib/db";

// const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { token: verificationToken } = req.query;

    if (!verificationToken) {
        console.log('No token from token');
        return res.status(400).json({ error: 'Invalid parameters. Token is missing.' });
    }
    try {
        // Find the team member with the given token
        const newUser = await prisma.user.findFirst({
            where: {
                verificationTokens: {
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
                                token: verificationToken,  // Change 'token' to 'verificationToken'
                            },
                        ],
                    },
                },
            },
        });
        if (!newUser) {
            console.log('Token not found or expired.'); // Add this line for debugging
            return res.status(400).json({ error: 'Team member does not exist.' });
        }

        // Check if the team member is already verified
        if (newUser.isVerified !== false && !newUser.isVerified) {
            await prisma.user.update({
                where: {
                    id: newUser.id,
                },
                data: {
                    isVerified: true,
                    isActive: true,
                    name: newUser.firstName + " " + newUser.lastName,
                },
            });
        }

        if (
            newUser.verificationTokens !== undefined &&
            newUser.verificationTokens.some((t) => t.token === token && t.activatedAt === null)
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
            newUserId: newUser.id,
            password: newUser.password, // Assuming the password is stored in the 'team' table
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
