import prisma from "../../../lib/db";
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

// const prisma = new PrismaClient();

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        const { email } = session?.user;

        try {
            // Check if email is defined before making the findUnique call
            if (email) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                        provider: true,
                        profileImage: true,
                        brandLogo: true,
                        brandName: true,
                        role: true,
                        isActive: true,
                        image: true,
                        userType: true,
                    },
                });

                if (user) {
                    let first_name, last_name;
                    if (user.provider !== 'Email') {
                        [first_name, last_name] = session.user.name.split(' ');

                        await prisma.user.upsert({
                            where: {
                                email,
                            },
                            update: {
                                firstName: first_name,
                                lastName: last_name,
                                provider: 'OAuth',
                                isActive: true,
                                profileImage: user.image,
                                userType: 'Blogger',
                            },
                            create: {
                                email,
                                firstName: first_name,
                                lastName: last_name,
                                provider: 'OAuth',
                                isActive: true,
                                profileImage: user.image,
                                userType: 'Blogger',
                            },
                        });

                        res.status(200).json({
                            firstName: first_name,
                            lastName: last_name,
                            email: email,
                            profileImage: user.profileImage,
                            provider: user.provider,
                            brandLogo: user.brandLogo,
                            brandName: user.brandName,
                            role: user.role,
                            isActive: user.isActive,
                            social: user.social,
                            userType: user.userType
                        });

                        return;
                    } else {
                        res.status(200).json({
                            firstName: user.firstName,
                            lastName: user.lastName,
                            profileImage: user.profileImage,
                            email: email,
                            provider: user.provider,
                            brandLogo: user.brandLogo,
                            brandName: user.brandName,
                            role: user.role,
                            isActive: user.isActive,
                            social: user.social,
                            userType: user.userType
                        });

                        return;
                    }
                } else {
                    console.log('User not found in the database');
                    res.status(404).json({ message: 'User not found in the database' });
                }
            } else {
                // Handle the case when email is undefined
                console.error('Email is undefined');
                res.status(400).json({ message: 'Email is undefined' });
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
