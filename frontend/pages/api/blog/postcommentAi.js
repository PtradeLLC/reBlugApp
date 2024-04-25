import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


export default async function handler(req, res) {
    try {
        const { email } = req.query; // Retrieve email from request query parameters

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email.toString(),
            },
            select: {
                id: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const posts = await prisma.post.findMany({
            where: {
                userId: user.id
            },
            include: {
                comments: true,
                aiResponses: true
            },
        })
        res.status(200).json(posts);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
