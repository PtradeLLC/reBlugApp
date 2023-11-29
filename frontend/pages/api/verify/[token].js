import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

export default async function handler(req, { query }) {
    const { token } = req.query;

    if (!token) {
        throw new Error('Invalid parameters. Token is missing.');
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
        throw new Error('Token is invalid or expired');
    }

    // Check if the user is already verified
    if (user.isVerified !== undefined && !user.isVerified) {
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                isVerified: true,
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

    const absoluteRedirectUrl = resolve(req.headers.host, 'https://forgedmart.com/api/auth/signin');

    return NextResponse.redirect(absoluteRedirectUrl);
}
