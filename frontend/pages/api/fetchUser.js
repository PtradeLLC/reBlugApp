import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { Session } from 'inspector';
import Oauth from 'twilio/lib/rest/Oauth';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        const { email } = session?.user;

        try {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
                select: {
                    firstName: true,
                    lastName: true,
                    provider: true,
                    profileImage: true,
                    brandLogo: true,
                    brandName: true,
                    role: true,
                    Sessions: true,
                    Accounts: true,
                },
            });

            let first_name, last_name;

            if (user.provider !== 'Email') {
                [first_name, last_name] = session.user.name.split(' ');

                await prisma.user.upsert({
                    where: {
                        email,
                    },
                    update: {
                        provider: 'OAuth',
                    },
                    create: {
                        email,
                        firstName: first_name,
                        lastName: last_name,
                        provider: 'OAuth',
                    },
                });


                res.status(200).json({
                    firstName: first_name,
                    lastName: last_name,
                    profileImage: user.profileImage,
                    provider: user.provider,
                    brandLogo: user.brandLogo,
                    brandName: user.brandName,
                    role: user.role,
                });

                return;
            } else {
                res.status(200).json({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profileImage: user.profileImage,
                    provider: user.provider,
                    brandLogo: user.brandLogo,
                    brandName: user.brandName,
                    role: user.role,
                    Sessions: user.Sessions
                });

                return;
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
