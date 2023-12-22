import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { signOut } from 'next-auth/react';
import { authOptions } from './auth/[...nextauth]';
import { Session } from 'inspector';
import Oauth from 'twilio/lib/rest/Oauth';

const prisma = new PrismaClient();


// TO CLOSE ACCOUNT:
// await prisma.user.update({
//     where: {
//         email: trimmedEmail,
//     },
//     data: {
//         isActive: false,
//     },
// });

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        const { email } = session?.user;
        const trimmedEmail = email.trim();

        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: trimmedEmail,
                },
                select: {
                    firstName: true,
                    lastName: true,
                    provider: true,
                    profileImage: true,
                    brandLogo: true,
                    brandName: true,
                    role: true,
                    isActive: true,
                    image: true,
                    social: true,
                    userType: true,
                },
            });

            console.log(user, 'from fetchUser');
            console.log(session, 'from fetchUser');

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
                            userType: 'creator',
                        },
                        create: {
                            email,
                            firstName: first_name,
                            lastName: last_name,
                            provider: 'OAuth',
                            isActive: true,
                            profileImage: user.image,
                            userType: 'creator',
                        },
                    });

                    console.log(user, 'from fetchUser');
                    console.log(session, 'from fetchUser');

                    res.status(200).json({
                        firstName: first_name,
                        lastName: last_name,
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
                // Clear the session cookie
                res.setHeader('Set-Cookie', 'next-auth.session-token=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; HttpOnly');

                // Sign out the user
                if (!user || !session) {
                    await signOut({ callbackUrl: '/' });
                } else {
                    req.session = null;
                }
                console.log('User not found in the database');
                res.status(404).json({ message: 'User not found in the database' });
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
