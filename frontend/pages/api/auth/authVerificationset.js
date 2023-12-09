import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './[...nextauth]';

const prisma = new PrismaClient();
export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    console.log("Sesh from server::", session);
    try {
        const { email } = req.body;
        const lowercaseEmail = email.toLowerCase();
        console.log(lowercaseEmail);

        if (!email) {
            return res.status(400).json({ message: 'Email is missing' });
        };

        // if (req.method === 'POST') {
        //     // Look for an existing user with verified status
        //     const existingUser = await prisma.user.findFirst({
        //         where: {
        //             email: lowercaseEmail,
        //             VerificationTokens: {
        //                 some: {
        //                     token: verification.trim(),
        //                 },
        //             },
        //         },
        //         include: {
        //             VerificationTokens: true,
        //         },
        //     });

        //     // Getting User Tokens
        //     const userTokens = existingUser?.VerificationTokens?.map((item) => item.token) || [];

        //     if (!userTokens.includes(verification.trim())) {
        //         return res.status(200).json({
        //             user: existingUser,
        //             message: 'Please enter a valid Verification code',
        //         });
        //     } else {
        //         try {
        //             if (existingUser && existingUser.isVerified === false) {
        //                 const verifiedUser = await prisma.user.update({
        //                     where: {
        //                         email: lowercaseEmail,
        //                     },
        //                     data: {
        //                         isVerified: true,
        //                     },
        //                 });

        //                 return res.status(200).json({
        //                     user: verifiedUser,
        //                     message: 'User is verified',
        //                     redirect: '/dashboard',
        //                 });
        //             } else if (existingUser && existingUser.isVerified === false) {
        //                 // User with Invalid token and NOT Verified
        //                 return res.status(200).json({
        //                     user: existingUser,
        //                     message: "You do not have the correct credentials",
        //                     redirect: '/api/auth/signout',
        //                 });
        //             }
        //         } catch (error) {
        //             console.error('Error updating user verification status:', error);
        //             return res.status(500).json({ message: 'Internal Server Error' });
        //         }
        //     }

        //     return res.status(200).json({
        //         message: 'User is not verified',
        //         redirect: '/api/auth/signin',
        //     });
        // }
        res.status(200).json({ message: 'success' })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'There is an error' });
    } finally {
        await prisma.$disconnect();
    }
}
