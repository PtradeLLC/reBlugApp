import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './[...nextauth]';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    try {
        const { email, question } = req.body;
        const lowercaseEmail = email.toLowerCase();

        if (!email) {
            return res.status(400).json({ message: 'Email is missing' });
        };

        if (req.method === 'POST') {
            // Look for an existing user with verified status
            const existingUser = await prisma.user.findFirst({
                where: {
                    email: lowercaseEmail,
                    Accounts: {
                        some: {
                            access_token: { not: null }
                        },
                    },
                },
                include: {
                    Accounts: true,
                },
            });

            const first_name = existingUser.name.split(' ')[0];
            const last_name = existingUser.name.split(' ')[1];

            // Getting User Tokens
            const userAccessTokens = existingUser?.Accounts?.map((item) => item.access_token) || [];

            if (existingUser && userAccessTokens) {
                const verifiedUser = await prisma.user.update({
                    where: {
                        email: lowercaseEmail,
                    },
                    data: {
                        isVerified: true,
                        firstName: first_name,
                        lastName: last_name
                    },
                });

                return res.status(200).json({
                    user: verifiedUser,
                    message: 'User is verified',
                });
            };

            return res.status(200).json({
                message: 'User is not verified',
            });
        }
        res.status(200).json({ message: 'success' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'There is an error' });
    } finally {
        await prisma.$disconnect();
    }
}
