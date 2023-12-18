import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        const { email } = session?.user;

        let first_name, last_name;

        try {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
                select: {
                    firstName: true,
                    lastName: true,
                    provider: true,
                    brandName: true,
                    brandLogo: true,
                    profileImage: true,
                    role: true,
                },
            });

            if (user.provider !== 'Email') {
                [first_name, last_name] = session.user.name.split(' ');

                res.status(200).json({
                    first_name,
                    last_name,
                    profileImage,
                    provider: 'OAuth',  // Assuming you want to set the provider as 'OAuth'
                    brandLogo: null,    // Adjust based on your data structure
                    brandName: null,    // Adjust based on your data structure
                    role: null,         // Adjust based on your data structure
                });

                return;
            } else if (user.provider === "Email") {
                res.status(200).json({
                    // firstName,
                    // lastName,
                    profileImage,
                    provider,  // Assuming you want to set the provider as 'OAuth'
                    brandLogo: null,    // Adjust based on your data structure
                    brandName: null,    // Adjust based on your data structure
                    role: null,         // Adjust based on your data structure
                });
                return;
            }

            if (user.firstName === null && user.lastName === null) {
                const updatedUser = await prisma.user.upsert({
                    where: { email },
                    update: {
                        firstName: user.firstName || first_name,
                        lastName: user.lastName || last_name,
                        provider: `${user.firstName || user.lastName ? "Email" : first_name || last_name ? 'OAuth' : null}`,
                    },
                    create: {
                        email,
                        firstName: user.firstName || first_name,
                        lastName: user.lastName || last_name,
                        provider: `${user.firstName || user.lastName ? "Email" : first_name || last_name ? 'OAuth' : null}`,
                    },
                    select: {
                        firstName: true,
                        lastName: true,
                        provider: true,
                        brandLogo: true,
                        brandName: true,
                        profileImage: true,
                        role: true,
                    },
                });

                console.log("UpdateUser", updatedUser);

                res.status(200).json(updatedUser);
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            res.status(500).json({ message: `There is an error: ${error.message || 'unknown'}`, error });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        console.log('Session not found on the server side');
        res.status(404).json({ message: 'Session not found on the server side' });
    }
}
