import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { authOptions } from './auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

const prisma = new PrismaClient().$extends(withAccelerate());

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    try {
        const user = await prisma.user.findUnique({
            where: { email: "fssu@mail.com" },
        });

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `There is an error ${error}` });
    }
}
